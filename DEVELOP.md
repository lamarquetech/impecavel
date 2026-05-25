# Guia do Desenvolvedor

Documentação para contribuidores do Impeccable.

## Arquitetura

A skill em `skill/` é transformada em formatos específicos de provedor por uma fábrica orientada por configuração. Cada provedor é definido como um objeto de configuração em `scripts/lib/transformers/providers.js` -- adicionar um novo provedor requer apenas uma nova entrada de configuração.

Para capacidades detalhadas dos harnesses (quais campos de frontmatter cada um suporta, sistemas de placeholders, estruturas de diretórios), veja [HARNESSES.md](HARNESSES.md).

## Formato de Origem

### Skill (`skill/SKILL.md`)

```yaml
---
name: skill-name
description: What this skill provides
argument-hint: "[target]"
user-invocable: true
license: License info (optional)
compatibility: Environment requirements (optional)
---

Your skill instructions here...
```

**Campos de Frontmatter** (baseados na [especificação Agent Skills](https://agentskills.io/specification)):
- `name` (obrigatório): Identificador da skill (1-64 caracteres, minúsculas/números/hífens)
- `description` (obrigatório): O que a skill fornece (1-1024 caracteres)
- `user-invocable` (opcional): Booleano -- se `true`, a skill pode ser invocada como comando slash
- `argument-hint` (opcional): Dica exibida durante o autocomplete (ex.: `[target]`, `[area (feature, page...)]`)
- `license` (opcional): Informações de licença/atribuição
- `compatibility` (opcional): Requisitos de ambiente (1-500 caracteres)
- `metadata` (opcional): Pares chave-valor arbitrários
- `allowed-tools` (opcional, experimental): Lista de ferramentas pré-aprovadas

**Placeholders de corpo** (substituídos por provedor durante o build):
- `{{model}}` -- Nome do modelo específico do provedor (ex.: "Claude", "Gemini", "GPT")
- `{{config_file}}` -- Arquivo de configuração específico do provedor (ex.: "CLAUDE.md", ".cursorrules")
- `{{ask_instruction}}` -- Como pedir esclarecimentos ao usuário
- `{{command_prefix}}` -- Prefixo de comando slash (`/` para a maioria, `$` para Codex)
- `{{available_commands}}` -- Lista separada por vírgulas de comandos invocáveis pelo usuário

## Build

### Pré-requisitos
- Bun (runtime e gerenciador de pacotes JavaScript rápido)
- Nenhuma dependência externa necessária

### Comandos

```bash
# Construir todos os formatos de provedor
bun run build

# Limpar pasta dist
bun run clean

# Reconstruir do zero
bun run rebuild
```

### O que é Gerado

```
source/                          -> dist/
  skills/{name}/SKILL.md           {provider}/{configDir}/skills/{name}/SKILL.md
```

Cada provedor obtém seu próprio diretório de saída.

## Detalhes do Sistema de Build

O sistema de build usa um padrão de fábrica em `scripts/`:

```
scripts/
  build.js                        # Orquestrador principal
  lib/
    utils.js                      # Parsing de frontmatter, substituição de placeholders, geração de YAML
    zip.js                        # Geração de pacote ZIP
    transformers/
      factory.js                  # createTransformer() -- gera funções transformer a partir de configuração
      providers.js                # Mapa de configuração PROVIDERS -- uma entrada por provedor
      index.js                    # Re-exporta funções transformer geradas pela fábrica
```

### Adicionando um Novo Provedor

1. Adicione uma configuração de placeholder a `PROVIDER_PLACEHOLDERS` em `scripts/lib/utils.js`:
   ```javascript
   'my-provider': {
     model: 'MyModel',
     config_file: 'CONFIG.md',
     ask_instruction: 'ask the user directly to clarify.',
     command_prefix: '/'
   }
   ```

2. Adicione uma configuração de provedor a `PROVIDERS` em `scripts/lib/transformers/providers.js`:
   ```javascript
   'my-provider': {
     provider: 'my-provider',
     configDir: '.my-provider',
     displayName: 'My Provider',
     frontmatterFields: ['user-invocable', 'argument-hint', 'license'],
   }
   ```

3. Execute `bun run build` -- o provedor é automaticamente detectado pelo loop de build.

4. Atualize `HARNESSES.md` com as capacidades do provedor.

### Opções de Configuração do Provedor

| Campo | Descrição |
|-------|-----------|
| `provider` | Chave para diretório de saída e busca de placeholders |
| `configDir` | Nome do dot-directory (ex.: `.claude`) |
| `displayName` | Nome legível para logs de build |
| `frontmatterFields` | Quais campos opcionais emitir (veja `factory.js` FIELD_SPECS) |
| `bodyTransform` | Função opcional `(body, skill) => body` para pós-processamento |
| `placeholderProvider` | Sobrescreve qual chave PROVIDER_PLACEHOLDERS usar (para variantes que compartilham configuração) |

### Funções Principais

- `createTransformer(config)`: Fábrica que retorna uma função transformer a partir de uma configuração de provedor
- `parseFrontmatter()`: Extrai frontmatter YAML e corpo de arquivos SKILL.md
- `readSourceFiles()`: Lê `skill/SKILL.md` mais seus siblings `reference/` e `scripts/`
- `replacePlaceholders()`: Substitui `{{model}}`, `{{config_file}}`, etc. por provedor
- `generateYamlFrontmatter()`: Serializa objetos para frontmatter YAML (auto-cita valores começando com `[` ou `{`)

## Melhores Práticas

### Escrita de Skills

1. **Escopo focado**: Um domínio claro por skill
2. **Descrições claras**: Torne o propósito óbvio
3. **Instruções claras**: O LLM deve entender exatamente o que fazer
4. **Inclua exemplos**: Onde esclareçam a intenção
5. **Declare restrições**: O que NÃO fazer com a mesma clareza do que fazer
6. **Teste em múltiplos provedores**: Verifique se funciona em vários contextos

## Documentação de Referência

- [Especificação Agent Skills](https://agentskills.io/specification) - Padrão aberto
- [HARNESSES.md](HARNESSES.md) - Matriz de capacidades dos provedores
- [Cursor Skills](https://cursor.com/docs/context/skills)
- [Claude Code Skills](https://code.claude.com/docs/en/skills)
- [Gemini CLI Skills](https://geminicli.com/docs/cli/skills/)
- [Codex CLI Skills](https://developers.openai.com/codex/skills/)
- [VS Code Copilot Skills](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
- [Kiro Skills](https://kiro.dev/docs/skills/)
- [OpenCode Skills](https://opencode.ai/docs/skills/)
- [Pi Skills](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/skills.md)
- [Qoder Skills](https://docs.qoder.com/extensions/skills)

## Estrutura do Repositório

```
impeccable/
  source/                          # Edite estes! Fonte de verdade
    skills/                        # Definições de skills
      frontend-design/
        SKILL.md
        reference/*.md             # Referências por domínio
      audit/SKILL.md
      polish/SKILL.md
      ...
  dist/                            # Saída gerada (gitignored)
  scripts/
    build.js                       # Orquestrador principal
    lib/
      utils.js                     # Utilitários compartilhados
      zip.js                       # Geração de ZIP
      transformers/
        factory.js                 # Fábrica de transformers orientada por configuração
        providers.js               # Mapa de configuração de provedores
        index.js                   # Re-exports
  tests/                           # Suite de testes Bun
  HARNESSES.md                     # Referência de capacidades dos provedores
  DEVELOP.md                       # Este arquivo
  README.md                        # Documentação do usuário
```

## Solução de Problemas

### Build falha com erros de parsing YAML
- Verifique a indentação do frontmatter (YAML é sensível a indentação)
- Certifique-se de que os delimitadores `---` estão em suas próprias linhas
- Valores começando com `[` ou `{` são auto-citados; outros caracteres YAML especiais podem precisar de citação manual

### A saída não corresponde às expectativas
- Verifique a configuração do provedor em `scripts/lib/transformers/providers.js`
- Verifique se o arquivo de origem tem a estrutura de frontmatter correta
- Execute `bun run rebuild` para garantir um build limpo

### O provedor não reconhece os arquivos
- Verifique o caminho de instalação do seu provedor
- Verifique se a nomenclatura dos arquivos corresponde aos requisitos do provedor
- Consulte [HARNESSES.md](HARNESSES.md) para detalhes específicos do provedor

## Dúvidas?

Abra uma issue ou envie um PR!
