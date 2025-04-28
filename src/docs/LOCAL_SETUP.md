# Configuração do Ambiente Local

## Visão Geral
Este documento descreve como configurar o ambiente de desenvolvimento local para o projeto de busca de cartões de crédito.

## Pré-requisitos

### Software Necessário
- Node.js 18 ou superior
- npm ou yarn
- Git
- VS Code (recomendado)
- Docker e Docker Compose (opcional)

### Extensões do VS Code Recomendadas
- ESLint
- Prettier
- TypeScript Vue Plugin
- GitLens
- Error Lens
- Path Intellisense
- Auto Import
- Tailwind CSS IntelliSense

## Configuração Inicial

### 1. Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/cartoes.git
cd cartoes
```

### 2. Instalar Dependências
```bash
npm install
# ou
yarn install
```

### 3. Configurar Variáveis de Ambiente
Criar arquivo `.env` na raiz do projeto:
```bash
VITE_API_URL=http://localhost:3000
VITE_ENV=development
```

### 4. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

## Estrutura do Projeto

### Diretórios Principais
```
src/
├── components/     # Componentes React
├── hooks/         # Custom Hooks
├── services/      # Serviços e API
├── styles/        # Estilos globais
├── utils/         # Funções utilitárias
└── docs/          # Documentação
```

### Arquivos de Configuração
```
.
├── .eslintrc.js   # Configuração ESLint
├── .prettierrc    # Configuração Prettier
├── tsconfig.json  # Configuração TypeScript
├── vite.config.ts # Configuração Vite
└── package.json   # Dependências e scripts
```

## Desenvolvimento

### Hot Reload
O servidor de desenvolvimento suporta hot reload para:
- Componentes React
- Estilos CSS
- Arquivos TypeScript

### Linting e Formatação
```bash
# Verificar erros de lint
npm run lint

# Corrigir erros de lint automaticamente
npm run lint:fix

# Formatar código
npm run format
```

### Testes
```bash
# Executar testes unitários
npm run test

# Executar testes em modo watch
npm run test:watch

# Executar testes E2E
npm run test:e2e
```

## Docker (Opcional)

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

### docker-compose.yml
```yaml
version: '3'
services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - VITE_API_URL=http://localhost:3000
      - VITE_ENV=development
```

## Debugging

### Configuração do VS Code
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Debug Frontend",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

### React Developer Tools
- Instalar extensão do Chrome/Firefox
- Habilitar "Highlight Updates"
- Usar "Components" e "Profiler" tabs

## Git Workflow

### Criar Branch
```bash
git checkout -b feature/nova-funcionalidade
```

### Commits
```bash
git add .
git commit -m "feat: adiciona nova funcionalidade"
```

### Push
```bash
git push origin feature/nova-funcionalidade
```

### Git Hooks
Configurado com Husky para:
- Executar lint antes do commit
- Executar testes antes do push

## Troubleshooting

### Problemas Comuns

#### 1. Porta em Uso
```bash
# Encontrar processo usando a porta
lsof -i :3000

# Matar processo
kill -9 <PID>
```

#### 2. Problemas de Cache
```bash
# Limpar cache do npm
npm cache clean --force

# Remover node_modules
rm -rf node_modules

# Reinstalar dependências
npm install
```

#### 3. Erros TypeScript
```bash
# Verificar tipos
npm run type-check

# Gerar arquivos de declaração
npm run build:types
```

## Próximos Passos

### 1. Melhorias Planejadas
- Implementar Docker para desenvolvimento
- Adicionar scripts de utilidade
- Melhorar configuração de debugging
- Automatizar tarefas com scripts

### 2. Ferramentas
- Docker para containerização
- VS Code para desenvolvimento
- Chrome DevTools para debugging
- Git para controle de versão 