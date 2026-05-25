import fs from 'node:fs';
import path from 'node:path';

import { createBrowserDetector, detectUrl } from '../engines/browser/detect-url.mjs';
import { detectHtml } from '../engines/static-html/detect-html.mjs';
import { detectText } from '../engines/regex/detect-text.mjs';
import {
  HTML_EXTENSIONS,
  buildImportGraph,
  detectFrameworkConfig,
  isPortListening,
  walkDir,
} from '../node/file-system.mjs';

// ---------------------------------------------------------------------------
// Output formatting
// ---------------------------------------------------------------------------

function formatFindings(findings, jsonMode) {
  if (jsonMode) return JSON.stringify(findings, null, 2);

  const grouped = {};
  for (const f of findings) {
    if (!grouped[f.file]) grouped[f.file] = [];
    grouped[f.file].push(f);
  }
  const out = [];
  for (const [file, items] of Object.entries(grouped)) {
    const importNote = items[0]?.importedBy?.length ? ` (importado por ${items[0].importedBy.join(', ')})` : '';
    out.push(`\n${file}${importNote}`);
    for (const item of items) {
      out.push(`  ${item.line ? `linha ${item.line}: ` : ''}[${item.antipattern}] ${item.snippet}`);
      out.push(`    → ${item.description}`);
    }
  }
  out.push(`\n${findings.length} anti-pattern${findings.length === 1 ? ' encontrado' : 's encontrados'}.`);
  return out.join('\n');
}

// ---------------------------------------------------------------------------
// Stdin handling
// ---------------------------------------------------------------------------

async function handleStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const input = Buffer.concat(chunks).toString('utf-8');
  try {
    const parsed = JSON.parse(input);
    const fp = parsed?.tool_input?.file_path;
    if (fp && fs.existsSync(fp)) {
      return HTML_EXTENSIONS.has(path.extname(fp).toLowerCase())
        ? detectHtml(fp) : detectText(fs.readFileSync(fp, 'utf-8'), fp);
    }
  } catch { /* not JSON */ }
  return detectText(input, '<stdin>');
}


// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

async function confirm(question) {
  const rl = (await import('node:readline')).default.createInterface({
    input: process.stdin, output: process.stderr,
  });
  return new Promise((resolve) => {
    rl.question(`${question} [Y/n] `, (answer) => {
      rl.close();
      resolve(!answer || /^y(es)?$/i.test(answer.trim()));
    });
  });
}

function printUsage() {
  console.log(`Uso: impeccable detect [opções] [arquivo-ou-diretório-ou-url...]

Escanear arquivos ou URLs em busca de anti-patterns de UI e problemas de qualidade de design.

Opções:
  --fast    Modo somente regex (ignora análise HTML/CSS estática, mais rápido mas não detecta stylesheets linkados)
  --json    Emitir resultados como JSON
  --help    Exibir esta mensagem de ajuda

Modos de detecção:
  Arquivos HTML     Análise HTML/CSS estática (padrão, detecta CSS linkado)
  Arquivos não-HTML Correspondência por padrões regex (CSS, JSX, TSX, etc.)
  URLs              Renderização completa via Puppeteer (detectado automaticamente)
  --fast            Força regex para todos os arquivos

Exemplos:
  impeccable detect src/
  impeccable detect index.html
  impeccable detect https://example.com
  impeccable detect --fast --json .`);
}

async function detectCli() {
  let args = process.argv.slice(2).map(arg => {
    if (arg === '-json') return '--json';
    if (arg === '-fast') return '--fast';
    return arg;
  });
  if (args[0] === 'detect') args = args.slice(1);
  const jsonMode = args.includes('--json');
  const helpMode = args.includes('--help');
  const fastMode = args.includes('--fast');
  const targets = args.filter(a => !a.startsWith('--'));

  if (helpMode) { printUsage(); process.exit(0); }

  let allFindings = [];

  if (!process.stdin.isTTY && targets.length === 0) {
    allFindings = await handleStdin();
  } else {
    const paths = targets.length > 0 ? targets : [process.cwd()];
    const urlTargetCount = paths.filter(target => /^https?:\/\//i.test(target)).length;
    const browserDetector = urlTargetCount > 1 ? await createBrowserDetector() : null;

    try {
      for (const target of paths) {
        if (/^https?:\/\//i.test(target)) {
          try {
            const scanner = browserDetector
              ? (url) => browserDetector.detectUrl(url)
              : (url) => detectUrl(url);
            allFindings.push(...await scanner(target));
          } catch (e) { process.stderr.write(`Erro: ${e.message}\n`); }
          continue;
        }

        const resolved = path.resolve(target);
        let stat;
        try { stat = fs.statSync(resolved); }
        catch { process.stderr.write(`Aviso: não foi possível acessar ${target}\n`); continue; }

        if (stat.isDirectory()) {
          // Check for framework dev server config (skip in JSON mode to avoid polluting output)
          if (!jsonMode) {
            const fwConfig = detectFrameworkConfig(resolved);
            if (fwConfig) {
              const probe = await isPortListening(fwConfig.port, fwConfig.fingerprint);
              if (probe.listening && probe.matched) {
                process.stderr.write(
                  `\n${fwConfig.name} dev server detectado em localhost:${fwConfig.port}.\n` +
                  `Para resultados mais precisos, escaneie o site em execução:\n` +
                  `  npx impeccable detect http://localhost:${fwConfig.port}\n\n`
                );
              } else if (probe.listening && !probe.matched) {
                process.stderr.write(
                  `\nProjeto ${fwConfig.name} detectado (${path.basename(fwConfig.configPath)}).\n` +
                  `A porta ${fwConfig.port} está em uso por outro serviço. Inicie o dev server do ${fwConfig.name} e escaneie via URL para melhores resultados.\n\n`
                );
              } else {
                process.stderr.write(
                  `\nProjeto ${fwConfig.name} detectado (${path.basename(fwConfig.configPath)}).\n` +
                  `Inicie o dev server e escaneie via URL para melhores resultados:\n` +
                  `  npx impeccable detect http://localhost:${fwConfig.port}\n\n`
                );
              }
            }
          }

          const files = walkDir(resolved);
          const htmlCount = files.filter(f => HTML_EXTENSIONS.has(path.extname(f).toLowerCase())).length;

          // Warn and confirm if scanning many files (static HTML/CSS processes each HTML file)
          if (files.length > 50 && process.stdin.isTTY && !jsonMode) {
            process.stderr.write(
              `\nEncontrados ${files.length} arquivos (${htmlCount} HTML) em ${target}.\n` +
              `O escaneamento pode demorar${htmlCount > 10 ? ' (a análise HTML/CSS estática processa cada arquivo HTML individualmente)' : ''}.\n` +
              `Use --fast para pular a análise HTML/CSS estática, ou direcione um subdiretório específico.\n`
            );
            const ok = await confirm('Continuar?');
            if (!ok) { process.stderr.write('Abortado.\n'); process.exit(0); }
          }

          // Build import graph for multi-file awareness
          const graph = buildImportGraph(files);
          // Build reverse map: file -> set of files that import it
          const importedByMap = new Map();
          for (const [importer, imports] of graph) {
            for (const imported of imports) {
              if (!importedByMap.has(imported)) importedByMap.set(imported, new Set());
              importedByMap.get(imported).add(importer);
            }
          }

          for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            let fileFindings;
            if (!fastMode && HTML_EXTENSIONS.has(ext)) {
              fileFindings = await detectHtml(file);
            } else {
              fileFindings = detectText(fs.readFileSync(file, 'utf-8'), file);
            }
            // Annotate findings with import context
            const importers = importedByMap.get(file);
            if (importers && importers.size > 0) {
              const importerNames = [...importers].map(f => path.basename(f));
              for (const f of fileFindings) {
                f.importedBy = importerNames;
              }
            }
            allFindings.push(...fileFindings);
          }
        } else if (stat.isFile()) {
          const ext = path.extname(resolved).toLowerCase();
          if (!fastMode && HTML_EXTENSIONS.has(ext)) {
            allFindings.push(...await detectHtml(resolved));
          } else {
            allFindings.push(...detectText(fs.readFileSync(resolved, 'utf-8'), resolved));
          }
        }
      }
    } finally {
      if (browserDetector) await browserDetector.close();
    }
  }

  if (allFindings.length > 0) {
    if (jsonMode) process.stdout.write(formatFindings(allFindings, true) + '\n');
    else process.stderr.write(formatFindings(allFindings, false) + '\n');
    process.exit(2);
  }
  if (jsonMode) process.stdout.write('[]\n');
  process.exit(0);
}

export { formatFindings, handleStdin, confirm, printUsage, detectCli };
