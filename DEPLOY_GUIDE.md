# 📋 Guia de Deploy - Cards Web System

Este documento contém todos os procedimentos necessários para fazer deploy do sistema Cards Web na Vercel.

## 🌐 Informações do Projeto

**Frontend:** [cards-web-liart.vercel.app](https://cards-web-liart.vercel.app)  
**Backend:** [api-card-backend.vercel.app](https://api-card-backend.vercel.app)  
**Database:** MongoDB Atlas  
**ORM:** Prisma com joins automáticos  

---

## 🛠️ DEPLOY BACKEND (api-card-backend.vercel.app)

### Passos para Deploy:

```bash
# 1. Navegar para o diretório do backend
cd /home/cabrazil/credit_card/backend

# 2. Fazer suas alterações no código (server.ts, api/index.ts, etc.)

# 3. Adicionar arquivos ao Git
git add .

# 4. Fazer commit com descrição clara
git commit -m "feat: descrição das mudanças realizadas"

# 5. Enviar para GitHub (deploy automático)
git push

# 6. Aguardar 2-3 minutos para propagação na Vercel
```

### Environment Variables Necessárias:
- ✅ `DATABASE_URL` → MongoDB Atlas connection string
- ✅ `NODE_ENV` → production (opcional)

### Verificar Deploy:
```bash
# Testar API diretamente
curl https://api-card-backend.vercel.app/teste

# Resposta esperada:
# {"ok":true,"message":"Test endpoint working"}
```

---

## 🌐 DEPLOY FRONTEND (cards-web-liart.vercel.app)

### Passos para Deploy:

```bash
# 1. Navegar para o diretório do frontend
cd /home/cabrazil/credit_card/frontend_new

# 2. Verificar .env local (apenas para referência)
# VITE_API_URL=http://localhost:3333  # desenvolvimento local
# VITE_API_URL=https://api-card-backend.vercel.app  # produção

# 3. Fazer suas alterações no código (src/, components/, etc.)

# 4. Adicionar arquivos ao Git
git add .

# 5. Fazer commit com descrição clara
git commit -m "feat: descrição das mudanças realizadas"

# 6. Enviar para GitHub (deploy automático)
git push

# 7. Aguardar 2-3 minutos para propagação na Vercel
```

### Environment Variables Necessárias:
- ✅ `VITE_API_URL` → `https://api-card-backend.vercel.app`
- ✅ `NODE_ENV` → production (opcional)

### Verificar Deploy:
1. Acessar [cards-web-liart.vercel.app](https://cards-web-liart.vercel.app)
2. Fazer busca de cartões
3. Verificar detalhes dos cartões
4. Abrir DevTools (F12) → Console para verificar erros

---

## 🔍 TESTE PÓS-DEPLOY

### 1. Testar Backend Isoladamente:
```bash
# Health check
curl https://api-card-backend.vercel.app/teste

# Listar instituições
curl https://api-card-backend.vercel.app/issuers

# Buscar cartões
curl "https://api-card-backend.vercel.app/cardexpense?expense=5&issuer=BRB"

# Detalhes de um cartão (usar ID real)
curl "https://api-card-backend.vercel.app/cards/{CARD_ID}"
```

### 2. Testar Frontend Completo:
- ✅ **Busca de cartões** → Selecionar faixa de renda e instituição
- ✅ **Lista de resultados** → Verificar se mostra cartões corretos
- ✅ **Detalhes do cartão** → Clicar em um cartão
- ✅ **Componentes preenchidos** → AboutCard, Requirements, BrandBenefits, etc.

### 3. Verificar Console do Navegador:
- Abrir DevTools (F12)
- Verificar tab Console
- Procurar por erros (linhas vermelhas)
- Verificar tab Network para requisições falhas

---

## 🚨 PLANO DE ROLLBACK

### Se algo der errado no deploy:

1. **Acessar Vercel Dashboard:**
   - Backend: [vercel.com/cabrazil/cards-backend](https://vercel.com/cabrazil/cards-backend)
   - Frontend: [vercel.com/cabrazil/cards-web](https://vercel.com/cabrazil/cards-web)

2. **Ir para Deployments:**
   - Clicar em "Deployments" no menu lateral

3. **Encontrar deployment anterior:**
   - Procurar por deployment que funcionava (status "Ready")
   - Geralmente o penúltimo da lista

4. **Fazer rollback:**
   - Clicar no deployment anterior
   - Clicar em "Promote to Production"
   - Confirmar a ação

5. **Verificar:**
   - O deployment anterior ficará ativo
   - Testar se voltou a funcionar

---

## ⚡ DICAS IMPORTANTES

### Deploy Automático:
- Ambos projetos têm **deploy automático** configurado
- Qualquer `git push` na branch `master` dispara novo deploy
- Não é necessário fazer nada no painel da Vercel

### Logs e Debug:
- **Vercel Dashboard** → Projeto → Functions → View Logs
- **Backend logs** aparecem em tempo real
- **Erro 500** geralmente indica problema no backend

### Cache e Propagação:
- Deploy pode levar **2-3 minutos** para propagar
- Se não funcionar imediatamente, aguardar um pouco
- Cache do navegador pode interferir (Ctrl+F5 para reload completo)

### Environment Variables:
- Configuradas no **Vercel Dashboard** → Settings → Environment Variables
- Mudanças nas env vars exigem **redeploy** manual ou novo push

---

## 📝 CHECKLIST DE DEPLOY

### Antes do Deploy:
- [ ] Código testado localmente
- [ ] Commit com mensagem descritiva
- [ ] Environment variables corretas

### Durante o Deploy:
- [ ] `git push` executado com sucesso
- [ ] Aguardar 2-3 minutos
- [ ] Verificar status no Vercel Dashboard

### Após o Deploy:
- [ ] Testar API com `curl`
- [ ] Testar frontend completo
- [ ] Verificar console do navegador
- [ ] Testar em device/navegador diferente

---

## 🆘 CONTATOS DE EMERGÊNCIA

- **GitHub Repo Backend:** [github.com/cabrazil/cards-backend](https://github.com/cabrazil/cards-backend)
- **GitHub Repo Frontend:** [github.com/cabrazil/cards-web](https://github.com/cabrazil/cards-web)
- **Vercel Dashboard:** [vercel.com/dashboard](https://vercel.com/dashboard)
- **MongoDB Atlas:** [cloud.mongodb.com](https://cloud.mongodb.com)

---

## 📚 COMANDOS ÚTEIS

```bash
# Status do Git
git status

# Ver últimos commits
git log --oneline -5

# Forçar push (cuidado!)
git push --force

# Verificar branches
git branch -a

# Mudança de branch
git checkout main
git checkout master

# Reset suave (manter mudanças)
git reset --soft HEAD~1

# Reset completo (perder mudanças)
git reset --hard HEAD~1
```

---

**Última atualização:** $(date)  
**Versão do documento:** 1.0