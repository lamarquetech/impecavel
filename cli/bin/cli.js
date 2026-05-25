#!/usr/bin/env node

/**
 * Impeccable CLI
 *
 * Usage:
 *   npx impeccable detect [file-or-dir-or-url...]
 *   npx impeccable skills help|install|update
 *   npx impeccable --help
 */

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const command = args[0];

if (!command || command === '--help' || command === '-h') {
  console.log(`Uso: impeccable <comando> [opções]

Comandos:
  detect [arquivo-ou-diretório-ou-url...]   Escanear anti-patterns de UI e problemas de qualidade de design
  skills help                               Listar todas as skills e comandos disponíveis
  skills install                            Instalar skills do impeccable no seu projeto
  skills update                             Atualizar skills para a versão mais recente
  skills check                              Verificar se há atualizações disponíveis para as skills

Opções:
  --help       Exibir esta mensagem de ajuda
  --version    Exibir número da versão

Execute 'impeccable <comando> --help' para opções específicas de cada comando.`);
  process.exit(0);
}

if (command === '--version' || command === '-v') {
  const pkg = JSON.parse(readFileSync(join(__dirname, '..', '..', 'package.json'), 'utf8'));
  console.log(pkg.version);
  process.exit(0);
}

if (command === 'detect') {
  process.argv = [process.argv[0], process.argv[1], ...args.slice(1)];
  const { detectCli } = await import('../engine/detect-antipatterns.mjs');
  await detectCli();
} else if (command === 'skills') {
  const { run } = await import('./commands/skills.mjs');
  await run(args.slice(1));
} else {
  // Padrão: tratar como argumentos de detect (permite o atalho `npx impeccable src/`)
  process.argv = [process.argv[0], process.argv[1], ...args];
  const { detectCli } = await import('../engine/detect-antipatterns.mjs');
  await detectCli();
}
