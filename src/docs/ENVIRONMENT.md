# Configuração de Ambiente

## Variáveis de Ambiente

### Desenvolvimento Local

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# API Configuration
VITE_API_URL=http://localhost:3333

# Environment
NODE_ENV=development
```

### Produção (Vercel)

Para o deploy na Vercel, configure as seguintes variáveis de ambiente:

```env
# API Configuration
VITE_API_URL=https://cards-backend-beta.vercel.app

# Environment
NODE_ENV=production
```

## Configuração da Vercel

### 1. Variáveis de Ambiente no Dashboard da Vercel

1. Acesse o dashboard da Vercel
2. Vá para o projeto `cards-web`
3. Clique em "Settings" → "Environment Variables"
4. Adicione as seguintes variáveis:

| Nome | Valor | Ambiente |
|------|-------|----------|
| `VITE_API_URL` | `https://cards-backend-beta.vercel.app` | Production |
| `NODE_ENV` | `production` | Production |

### 2. Configuração via CLI (opcional)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Configurar variáveis de ambiente
vercel env add VITE_API_URL production
vercel env add NODE_ENV production
```

## Endpoints da API

### Backend Local (Desenvolvimento)
- **URL Base:** `http://localhost:3333`
- **Busca de Cartões:** `GET /api/search`
- **Detalhes do Cartão:** `GET /cardid?id={cardId}`
- **Instituições:** `GET /issuers`

### Backend na Vercel (Produção)
- **URL Base:** `https://cards-backend-beta.vercel.app`
- **Busca de Cartões:** `GET /api/search`
- **Detalhes do Cartão:** `GET /cardid?id={cardId}`
- **Instituições:** `GET /issuers`

## Troubleshooting

### Problemas Comuns

1. **Erro de CORS**
   - Verifique se o backend está configurado para aceitar requisições do domínio do frontend
   - Adicione o domínio do frontend na configuração de CORS do backend

2. **API não encontrada**
   - Verifique se a URL da API está correta
   - Confirme se o backend está rodando

3. **Variáveis de ambiente não carregadas**
   - Reinicie o servidor de desenvolvimento
   - Verifique se o arquivo `.env` está na raiz do projeto

### Logs de Debug

Para debug, adicione logs na configuração da API:

```typescript
// src/core/api/api.ts
console.log('API URL:', import.meta.env.VITE_API_URL);
console.log('Environment:', import.meta.env.NODE_ENV);
``` 