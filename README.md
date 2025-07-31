# Cards Web - Sistema de Busca de Cartões de Crédito

## Visão Geral
Este é um sistema frontend desenvolvido em React + TypeScript + Vite para busca e visualização de cartões de crédito. O sistema permite aos usuários buscar cartões de crédito e visualizar seus detalhes de forma intuitiva e responsiva.

## Documentação
Para uma documentação mais detalhada do projeto, consulte a pasta `/src/docs/README.md`.

## Tecnologias
- React 18
- TypeScript
- Vite
- ESLint
- Prettier

## Configuração do Ambiente

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação
1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

### Executando o Projeto
Para desenvolvimento:
```bash
npm run dev
```

Para produção:
```bash
npm run build
```

## Estrutura do Projeto
O projeto segue uma estrutura modular organizada em:
- `/src/components`: Componentes React
- `/src/services`: Integrações com API
- `/src/styles`: Estilos globais
- `/src/docs`: Documentação do projeto

## Contribuição
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença
Este projeto está sob a licença MIT.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
