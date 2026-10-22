# 💳 O Cartão Ideal — Cards Web (Frontend PWA)

Aplicação web progressiva (**PWA**) moderna e responsiva desenvolvida em **React 18**, **TypeScript**, **Vite** e **TailwindCSS**, com foco em mobile-first, performance e experiência do usuário fluida para recomendação personalizada e comparação de cartões de crédito.

---

## 🚀 Tecnologias

- **Core:** [React 18](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Build Tool:** [Vite 5](https://vitejs.dev/)
- **Estilização:** [TailwindCSS](https://tailwindcss.com/)
- **Animações & Microinterações:** [Framer Motion](https://www.framer.com/motion/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **PWA (Progressive Web App):** [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) (Service Workers, offline cache, Web App Manifest)
- **Cliente HTTP:** [Axios](https://axios-http.com/)

---

## ✨ Funcionalidades

### 1. Progressive Web App (PWA) Completo
- Instalável nativamente em **iOS**, **Android** e **Desktop**.
- Banner inteligente com instruções personalizadas para instalação (`PwaInstallPrompt`).
- Suporte a cache offline via Workbox e Service Worker registrado.
- Ícones dedicados (192x192, 512x512, maskable e apple-touch-icon).

### 2. Quiz Inteligente de Onboarding & Recomendações
- Apresentação direta com CTA de início rápido.
- Quiz interativo dividido em passos objetivos (objetivo financeiro, faixa de gastos, anuidade, banco atual, etc.).
- Motor de cálculo de match em tempo real, pontuando os cartões do banco de dados por compatibilidade.
- **Justificativas Dinâmicas:** Apresentação clara de *"Por que é indicado para você"* baseada nas escolhas do usuário (ex: foco em aumento de limite, milhas e viagens, isenção de anuidade, cashback).

### 3. Ficha Técnica e Comparador de Benefícios
- Página detalhada de cada cartão (`/card-details/:id`):
  - Isenção de anuidade e regras de gastos mensais ou investimentos.
  - Acesso a salas VIP (LoungeKey, Priority Pass, DragonPass, salas próprias).
  - Pontuação de milhas por dólar e programas de fidelidade.
  - Cashback, spread de compras internacionais e IOF.

### 4. Painel Administrativo de Ingestão com IA (`/admin`)
- Interface para extração automática de dados de novos cartões a partir de texto ou links da web.
- Revisão em tempo real antes de persistir no banco de dados.

---

## 📁 Estrutura do Projeto

```text
frontend_new/
├── public/                    # Favicons, manifesto e ícones PWA
├── src/
│   ├── app/
│   │   ├── App.tsx            # Roteamento e orquestração de páginas
│   │   └── main.tsx           # Ponto de entrada React
│   ├── core/
│   │   └── api/api.ts         # Instância configurada do Axios
│   ├── features/
│   │   ├── card-details/      # Componentes e seções da ficha do cartão
│   │   └── card-search/       # Lista e filtros de busca de cartões
│   ├── pages/
│   │   ├── AdminCardExtractor.tsx # Painel administrativo com IA
│   │   ├── CardDetailsPage.tsx    # Página de detalhes
│   │   ├── Home.tsx               # Apresentação do serviço
│   │   └── OnboardingPage.tsx     # Fluxo do Quiz e Resultados
│   └── shared/
│       ├── components/        # Componentes compartilhados e prompt de PWA
│       └── theme/             # Tokens visuais e cores
├── .env.example               # Exemplo de configuração de variáveis
├── DEPLOY_GUIDE.md            # Guia passo a passo de deploy na Vercel
├── vite.config.ts             # Configuração do Vite e PWA
└── package.json
```

---

## 🛠️ Como Executar Localmente

### Pré-requisitos
- **Node.js** (v18+)
- **npm** ou **yarn** / **pnpm**
- Backend rodando (localmente em `http://localhost:3333` ou via URL remota)

### 1. Clonar o Repositório
```bash
git clone https://github.com/cabrazil/cards-web.git
cd cards-web
```

### 2. Instalar as Dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

Edite o arquivo `.env`:
```env
# Desenvolvimento local
VITE_API_URL=http://localhost:3333

# Ambiente
NODE_ENV=development
```

### 4. Executar em Desenvolvimento
```bash
npm run dev
```
Acesse `http://localhost:5173` no navegador.

### 5. Build de Produção
```bash
npm run build
npm run preview
```

---

## 🚀 Deploy

O frontend está preparado para deploy contínuo na [Vercel](https://vercel.com):
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variable:** `VITE_API_URL` apontando para o backend em produção.

Consulte o arquivo [DEPLOY_GUIDE.md](file:///home/cabrazil/credit_card/frontend_new/DEPLOY_GUIDE.md) para detalhes adicionais.

---

## 📜 Licença

Este projeto é de uso privado para a plataforma de recomendação de cartões de crédito.
