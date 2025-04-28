# Ambiente de Desenvolvimento

## Visão Geral
Este documento descreve como configurar e manter o ambiente de desenvolvimento para o projeto de busca de cartões de crédito.

## Pré-requisitos

### Software Necessário
- Node.js (versão 18 ou superior)
- npm ou yarn
- Git
- Editor de código (VS Code recomendado)
- Navegador moderno (Chrome, Firefox, Safari)

### Extensões VS Code Recomendadas
- ESLint
- Prettier
- TypeScript Vue Plugin (Volar)
- GitLens
- Error Lens
- Path Intellisense
- Auto Import
- Tailwind CSS IntelliSense

## Configuração Inicial

### 1. Clonar o Repositório
```bash
git clone <url-do-repositorio>
cd frontend_new
```

### 2. Instalar Dependências
```bash
npm install
# ou
yarn install
```

### 3. Configurar Variáveis de Ambiente
Criar arquivo `.env` na raiz do projeto:
```env
VITE_API_URL=http://localhost:3000
VITE_ENV=development
```

### 4. Iniciar Servidor de Desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

## Scripts Disponíveis

### Desenvolvimento
```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para desenvolvimento
npm run build:dev

# Limpar cache
npm run clean
```

### Testes
```bash
# Executar testes unitários
npm run test

# Executar testes com cobertura
npm run test:coverage

# Executar testes E2E
npm run test:e2e
```

### Lint e Formatação
```bash
# Verificar erros de lint
npm run lint

# Corrigir erros de lint
npm run lint:fix

# Formatar código
npm run format
```

## Configuração do Editor

### VS Code
Adicionar ao `settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "typescript",
    "javascriptreact",
    "typescriptreact"
  ],
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

### ESLint
Configuração em `.eslintrc.js`:
```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off'
  }
};
```

### Prettier
Configuração em `.prettierrc`:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

## Git Hooks

### Husky
Configuração em `.husky/pre-commit`:
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint
npm run test
```

## Docker

### Desenvolvimento
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

### Produção
```dockerfile
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

## Troubleshooting

### Problemas Comuns

1. **Erro de Porta em Uso**
```bash
# Encontrar processo usando a porta
lsof -i :3000

# Matar processo
kill -9 <PID>
```

2. **Erro de Cache**
```bash
# Limpar cache do npm
npm cache clean --force

# Remover node_modules
rm -rf node_modules

# Reinstalar dependências
npm install
```

3. **Erro de TypeScript**
```bash
# Verificar tipos
npm run type-check

# Limpar cache do TypeScript
rm -rf node_modules/.cache
```

## Próximos Passos

### 1. Melhorias Planejadas
- Implementar CI/CD
- Adicionar Docker Compose
- Configurar monitoramento
- Implementar logging

### 2. Ferramentas
- Jest para testes
- Cypress para E2E
- Husky para Git Hooks
- Docker para containerização 