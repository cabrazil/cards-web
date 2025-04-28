# CI/CD (Integração Contínua e Entrega Contínua)

## Visão Geral
Este documento descreve a configuração e fluxo de CI/CD para o projeto de busca de cartões de crédito, utilizando GitHub Actions para automatizar o processo de build, teste e deploy.

## Workflows

### 1. Pull Request
```yaml
# .github/workflows/pr.yml
name: Pull Request

on:
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run lint
        run: npm run lint
        
      - name: Run tests
        run: npm run test
        
      - name: Run E2E tests
        run: npm run test:e2e
```

### 2. Deploy para Staging
```yaml
# .github/workflows/staging.yml
name: Deploy to Staging

on:
  push:
    branches: [ develop ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build:staging
        env:
          VITE_API_URL: ${{ secrets.STAGING_API_URL }}
          VITE_ENV: staging
          
      - name: Deploy to Staging
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.STAGING_HOST }}
          username: ${{ secrets.STAGING_USERNAME }}
          key: ${{ secrets.STAGING_SSH_KEY }}
          source: "dist/*"
          target: "/var/www/cartoes-staging"
          
      - name: Restart Nginx
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.STAGING_HOST }}
          username: ${{ secrets.STAGING_USERNAME }}
          key: ${{ secrets.STAGING_SSH_KEY }}
          script: "sudo systemctl restart nginx"
```

### 3. Deploy para Produção
```yaml
# .github/workflows/production.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]
    tags:
      - 'v*'

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.PRODUCTION_API_URL }}
          VITE_ENV: production
          
      - name: Deploy to Production
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.PRODUCTION_HOST }}
          username: ${{ secrets.PRODUCTION_USERNAME }}
          key: ${{ secrets.PRODUCTION_SSH_KEY }}
          source: "dist/*"
          target: "/var/www/cartoes"
          
      - name: Restart Nginx
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.PRODUCTION_HOST }}
          username: ${{ secrets.PRODUCTION_USERNAME }}
          key: ${{ secrets.PRODUCTION_SSH_KEY }}
          script: "sudo systemctl restart nginx"
```

## Secrets

### GitHub Secrets
```bash
# Staging
STAGING_HOST=staging.cartoes.com.br
STAGING_USERNAME=deploy
STAGING_SSH_KEY=<chave-ssh>
STAGING_API_URL=https://staging-api.cartoes.com.br

# Production
PRODUCTION_HOST=cartoes.com.br
PRODUCTION_USERNAME=deploy
PRODUCTION_SSH_KEY=<chave-ssh>
PRODUCTION_API_URL=https://api.cartoes.com.br
```

## Scripts de Build

### package.json
```json
{
  "scripts": {
    "build:staging": "vite build --mode staging",
    "build:production": "vite build --mode production",
    "build:verify": "node scripts/verify-build.js"
  }
}
```

### Verificação de Build
```javascript
// scripts/verify-build.js
const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '../dist');

// Verificar se o diretório dist existe
if (!fs.existsSync(distPath)) {
  console.error('Erro: Diretório dist não encontrado');
  process.exit(1);
}

// Verificar arquivos essenciais
const requiredFiles = [
  'index.html',
  'assets/index.js',
  'assets/index.css'
];

for (const file of requiredFiles) {
  const filePath = path.join(distPath, file);
  if (!fs.existsSync(filePath)) {
    console.error(`Erro: Arquivo ${file} não encontrado`);
    process.exit(1);
  }
}

console.log('Build verificado com sucesso');
```

## Rollback

### Script de Rollback
```bash
#!/bin/bash

# Parâmetros
VERSION=$1
SERVER=$2

# Verificar parâmetros
if [ -z "$VERSION" ] || [ -z "$SERVER" ]; then
  echo "Uso: $0 <versão> <servidor>"
  exit 1
fi

# Rollback
ssh $SERVER "cd /var/www/cartoes && tar -xzf backup-$VERSION.tar.gz"

# Reiniciar Nginx
ssh $SERVER "sudo systemctl restart nginx"
```

## Monitoramento

### Status do Deploy
```yaml
# .github/workflows/status.yml
name: Deploy Status

on:
  workflow_run:
    workflows: ["Deploy to Production"]
    types:
      - completed

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Notify Slack
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ github.event.workflow_run.conclusion }}
          fields: repo,message,commit,author,action,eventName,ref,workflow
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

## Próximos Passos

### 1. Melhorias Planejadas
- Implementar blue-green deployment
- Adicionar testes de performance
- Melhorar monitoramento de deploy
- Automatizar rollback

### 2. Ferramentas
- GitHub Actions para CI/CD
- Docker para containerização
- Kubernetes para orquestração
- Prometheus para métricas 