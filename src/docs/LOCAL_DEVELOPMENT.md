# Ambiente de Desenvolvimento Local

## Visão Geral
Este documento descreve como configurar e manter um ambiente de desenvolvimento local para o projeto de busca de cartões de crédito.

## Pré-requisitos

### Software Necessário
- Node.js (versão 18 ou superior)
- npm ou yarn
- Git
- VS Code (recomendado)
- Docker (opcional)
- Docker Compose (opcional)

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

## Estrutura do Projeto

### Diretórios Principais
```
src/
├── assets/           # Recursos estáticos
├── components/       # Componentes React
├── services/        # Serviços e integrações
├── styles/          # Estilos globais
├── types/           # Definições de tipos
├── utils/           # Funções utilitárias
└── docs/            # Documentação
```

### Arquivos de Configuração
```
.
├── .eslintrc.js     # Configuração ESLint
├── .prettierrc      # Configuração Prettier
├── jest.config.js   # Configuração Jest
├── tsconfig.json    # Configuração TypeScript
└── vite.config.ts   # Configuração Vite
```

## Desenvolvimento

### Hot Reload
O Vite oferece Hot Module Replacement (HMR) por padrão. Alterações nos arquivos são refletidas instantaneamente no navegador.

### Lint e Formatação
```bash
# Verificar erros de lint
npm run lint

# Corrigir erros de lint
npm run lint:fix

# Formatar código
npm run format
```

### Testes
```bash
# Executar testes
npm run test

# Executar testes em watch mode
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

## Docker (Opcional)

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

### Docker Compose
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
      - NODE_ENV=development
```

## Debugging

### VS Code
Configuração em `.vscode/launch.json`:
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
- Instalar extensão do Chrome
- Habilitar "Highlight Updates"
- Usar Profiler para análise de performance

## Git

### Workflow
1. Criar branch para feature
```bash
git checkout -b feature/nova-feature
```

2. Fazer commits
```bash
git add .
git commit -m "feat: adiciona nova feature"
```

3. Push para remote
```bash
git push origin feature/nova-feature
```

### Hooks
```bash
# Instalar Husky
npm install husky --save-dev

# Configurar hooks
npx husky install
npx husky add .husky/pre-commit "npm run lint && npm run test"
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
- Implementar Docker para desenvolvimento
- Adicionar mais scripts de utilidade
- Melhorar configuração de debug
- Automatizar tarefas com scripts

### 2. Ferramentas
- Docker para containerização
- Husky para Git Hooks
- Jest para testes
- ESLint/Prettier para qualidade de código 