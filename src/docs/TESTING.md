# Ambiente de Testes

## Visão Geral
Este documento descreve a configuração e execução dos diferentes tipos de testes no projeto de busca de cartões de crédito.

## Tipos de Testes

### 1. Testes Unitários
- Testes de componentes React
- Testes de hooks personalizados
- Testes de funções utilitárias

### 2. Testes de Integração
- Testes de fluxos completos
- Testes de integração com API
- Testes de estado global

### 3. Testes End-to-End
- Testes de fluxos de usuário
- Testes de responsividade
- Testes de performance

## Configuração

### Jest
Configuração em `jest.config.js`:
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test-utils/setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/reportWebVitals.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### Cypress
Configuração em `cypress.config.js`:
```javascript
module.exports = {
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts'
  },
  video: false,
  screenshotOnRunFailure: true
};
```

## Execução de Testes

### Testes Unitários
```bash
# Executar todos os testes
npm run test

# Executar testes em watch mode
npm run test:watch

# Executar testes com cobertura
npm run test:coverage

# Executar testes específicos
npm run test -- SearchForm.test.tsx
```

### Testes de Integração
```bash
# Executar testes de integração
npm run test:integration

# Executar testes específicos
npm run test:integration -- search-flow.test.tsx
```

### Testes E2E
```bash
# Executar testes E2E
npm run test:e2e

# Executar testes E2E em modo interativo
npm run test:e2e:open

# Executar testes específicos
npm run test:e2e -- search.cy.ts
```

## Mocks e Fixtures

### Mock de API
```typescript
// src/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/cards/search', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        cards: [
          {
            id: '1',
            name: 'Cartão XPTO',
            image: '/card-xpto.png',
            annualFee: 0,
            benefits: ['Cashback', 'Pontos'],
            category: 'Premium'
          }
        ],
        total: 1
      })
    );
  })
];
```

### Fixtures
```typescript
// src/test-utils/fixtures.ts
export const mockCards = [
  {
    id: '1',
    name: 'Cartão XPTO',
    image: '/card-xpto.png',
    annualFee: 0,
    benefits: ['Cashback', 'Pontos'],
    category: 'Premium'
  }
];

export const mockUser = {
  id: '1',
  name: 'Usuário Teste',
  email: 'teste@exemplo.com'
};
```

## Testes de Componentes

### Exemplo de Teste
```typescript
// SearchForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchForm } from './SearchForm';

describe('SearchForm', () => {
  it('deve chamar onSubmit com os valores corretos', () => {
    const handleSubmit = jest.fn();
    render(<SearchForm onSubmit={handleSubmit} />);
    
    fireEvent.change(screen.getByLabelText('Busca'), {
      target: { value: 'cartão' }
    });
    
    fireEvent.click(screen.getByText('Buscar'));
    
    expect(handleSubmit).toHaveBeenCalledWith({
      query: 'cartão'
    });
  });
});
```

## Testes de Hooks

### Exemplo de Teste
```typescript
// useCardSearch.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useCardSearch } from './useCardSearch';

describe('useCardSearch', () => {
  it('deve buscar cartões com sucesso', async () => {
    const { result } = renderHook(() => useCardSearch());
    
    await act(async () => {
      await result.current.search({ query: 'cartão' });
    });
    
    expect(result.current.results).toHaveLength(1);
    expect(result.current.isLoading).toBe(false);
  });
});
```

## Testes E2E

### Exemplo de Teste
```typescript
// search.cy.ts
describe('Busca de Cartões', () => {
  it('deve buscar e exibir detalhes do cartão', () => {
    cy.visit('/');
    
    cy.get('[data-testid="search-input"]')
      .type('cartão');
    
    cy.get('[data-testid="search-button"]')
      .click();
    
    cy.get('[data-testid="card-list"]')
      .should('be.visible');
    
    cy.get('[data-testid="card-item"]')
      .first()
      .click();
    
    cy.get('[data-testid="card-details"]')
      .should('be.visible');
  });
});
```

## CI/CD

### GitHub Actions
```yaml
# .github/workflows/test.yml
name: Testes

on: [push, pull_request]

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
        
      - name: Run tests
        run: npm run test
        
      - name: Run E2E tests
        run: npm run test:e2e
```

## Próximos Passos

### 1. Melhorias Planejadas
- Aumentar cobertura de testes
- Adicionar testes de performance
- Implementar testes de acessibilidade
- Automatizar execução de testes

### 2. Ferramentas
- Jest para testes unitários
- React Testing Library para componentes
- Cypress para E2E
- MSW para mocks de API 