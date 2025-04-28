# Estrutura do Projeto

## Visão Geral
Este documento descreve a nova estrutura do projeto de busca de cartões de crédito, organizada para promover modularidade, escalabilidade e manutenibilidade.

## Nova Estrutura de Diretórios

```
src/
├── app/                    # Configuração e inicialização da aplicação
│   ├── config/            # Configurações globais
│   ├── providers/         # Providers React (Theme, Auth, etc)
│   └── routes/            # Configuração de rotas
│
├── core/                  # Funcionalidades core da aplicação
│   ├── api/              # Integrações com API
│   ├── hooks/            # Hooks personalizados
│   ├── store/            # Gerenciamento de estado
│   └── utils/            # Funções utilitárias
│
├── features/             # Funcionalidades específicas
│   ├── card-search/      # Busca de cartões
│   └── card-details/     # Detalhes do cartão
│
├── shared/               # Componentes e recursos compartilhados
│   ├── components/      # Componentes reutilizáveis
│   │   ├── layout/     # Componentes de layout
│   │   ├── ui/         # Componentes de UI
│   │   └── forms/      # Componentes de formulário
│   │
│   ├── styles/         # Estilos globais e temas
│   │   ├── themes/    # Configurações de tema
│   │   ├── base/      # Estilos base
│   │   └── utils/     # Utilitários de estilo
│   │
│   └── types/          # Tipos compartilhados
│
├── assets/              # Recursos estáticos
│   ├── images/         # Imagens
│   ├── icons/          # Ícones
│   └── fonts/          # Fontes
│
└── docs/               # Documentação
    ├── api/           # Documentação da API
    ├── components/    # Documentação de componentes
    └── guides/        # Guias de desenvolvimento
```

## Descrição dos Diretórios

### 1. `app/`
- **config/**: Configurações globais da aplicação
  - Variáveis de ambiente
  - Constantes
  - Configurações de API
- **providers/**: Providers React para contexto global
  - ThemeProvider
  - AuthProvider
  - ToastProvider
- **routes/**: Configuração de rotas da aplicação

### 2. `core/`
- **api/**: Integrações com API
  - Clientes HTTP
  - Interceptors
  - Tipos de requisição
- **hooks/**: Hooks personalizados globais
  - useAuth
  - useTheme
  - useToast
- **store/**: Gerenciamento de estado global
  - Redux/Context
  - Slices
  - Actions
- **utils/**: Funções utilitárias globais
  - Formatação
  - Validação
  - Helpers

### 3. `features/`
- Organização por domínio de negócio
- Cada feature contém:
  - Componentes específicos
  - Hooks específicos
  - Serviços específicos
  - Tipos específicos

### 4. `shared/`
- **components/**: Componentes reutilizáveis
  - **layout/**: Componentes de layout (Header, Footer, etc)
  - **ui/**: Componentes de UI (Button, Input, etc)
  - **forms/**: Componentes de formulário
- **styles/**: Estilos globais
  - **themes/**: Configurações de tema
  - **base/**: Estilos base
  - **utils/**: Utilitários de estilo
- **types/**: Tipos compartilhados

### 5. `assets/`
- Recursos estáticos
  - Imagens
  - Ícones
  - Fontes

### 6. `docs/`
- Documentação do projeto
  - API
  - Componentes
  - Guias

## Benefícios da Nova Estrutura

1. **Modularidade**
   - Separação clara de responsabilidades
   - Facilita a manutenção
   - Promove reutilização de código

2. **Escalabilidade**
   - Facilita a adição de novas features
   - Permite crescimento do projeto
   - Suporta equipes maiores

3. **Manutenibilidade**
   - Código mais organizado
   - Facilita a localização de arquivos
   - Reduz duplicação de código

4. **Testabilidade**
   - Facilita a criação de testes
   - Melhor isolamento de componentes
   - Testes mais focados

## Próximos Passos

1. **Migração**
   - Criar nova estrutura de diretórios
   - Mover arquivos existentes
   - Atualizar imports

2. **Documentação**
   - Atualizar documentação de componentes
   - Criar guias de estilo
   - Documentar padrões de código

3. **Automação**
   - Criar scripts de migração
   - Automatizar geração de componentes
   - Implementar linting específico

4. **Melhorias**
   - Implementar lazy loading
   - Otimizar bundle size
   - Melhorar performance 