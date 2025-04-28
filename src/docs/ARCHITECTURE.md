# Arquitetura do Projeto

## Visão Geral
O projeto segue uma arquitetura baseada em componentes React com TypeScript, utilizando Vite como bundler. A estrutura é organizada para promover reusabilidade, manutenibilidade e escalabilidade.

## Estrutura de Diretórios
```
src/
├── assets/           # Recursos estáticos
├── components/       # Componentes React
│   ├── common/      # Componentes reutilizáveis
│   ├── layout/      # Componentes de layout
│   └── features/    # Componentes específicos de features
├── services/        # Serviços e integrações
├── styles/          # Estilos globais
├── types/           # Definições de tipos
├── utils/           # Funções utilitárias
└── docs/            # Documentação
```

## Padrões de Arquitetura

### 1. Componentes
- **Componentes Presentacionais**: Focados na UI, sem lógica de negócio
- **Componentes de Container**: Gerenciam estado e lógica de negócio
- **Componentes de Layout**: Responsáveis pela estrutura da página

### 2. Gerenciamento de Estado
- **Context API**: Para estado global da aplicação
- **Hooks Personalizados**: Para lógica reutilizável
- **Estado Local**: Para estado específico de componentes

### 3. Integração com API
- **Serviços**: Camada de abstração para chamadas à API
- **Hooks de Dados**: Para gerenciamento de estado de requisições
- **Cache**: Implementação de cache para otimização

## Fluxo de Dados

### Busca de Cartões
1. Usuário interage com `SearchForm`
2. Formulário dispara `onSubmit` com parâmetros
3. `useCardSearch` hook gerencia a requisição
4. Serviço de API faz a chamada ao backend
5. Resultados são exibidos em `CreditCardList`

### Detalhes do Cartão
1. Usuário seleciona cartão em `CreditCardList`
2. `onSelectCard` dispara com ID do cartão
3. `useCardDetails` hook busca informações
4. Serviço de API faz a chamada ao backend
5. Detalhes são exibidos em `CreditCardDetails`

## Padrões de Código

### 1. Nomenclatura
- Componentes: PascalCase (`CreditCardList`)
- Funções: camelCase (`handleSearch`)
- Tipos/Interfaces: PascalCase (`SearchParams`)
- Constantes: UPPER_SNAKE_CASE (`MAX_RESULTS`)

### 2. Organização de Arquivos
- Um componente por arquivo
- Arquivos de teste junto ao componente
- Tipos em arquivos separados
- Estilos com módulos CSS

### 3. Tipagem
- Uso extensivo de TypeScript
- Interfaces para props de componentes
- Tipos para respostas da API
- Generics para reutilização

## Boas Práticas

### 1. Performance
- Lazy loading de componentes
- Memoização quando necessário
- Otimização de re-renders
- Code splitting

### 2. Acessibilidade
- ARIA labels
- Keyboard navigation
- Contraste adequado
- Semântica HTML

### 3. Testes
- Testes unitários
- Testes de integração
- Testes de snapshot
- Testes de acessibilidade

## Próximos Passos Arquiteturais

### 1. Melhorias Planejadas
- Implementação de cache local
- Otimização de bundle
- Melhor gerenciamento de estado
- Testes automatizados

### 2. Escalabilidade
- Micro-frontends
- Lazy loading de rotas
- Otimização de assets
- CDN para recursos estáticos

### 3. Manutenibilidade
- Documentação de componentes
- Padrões de código
- Ferramentas de análise
- CI/CD pipeline 