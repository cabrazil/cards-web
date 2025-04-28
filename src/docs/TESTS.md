# Documentação de Testes

## Visão Geral
O projeto utiliza uma abordagem de testes em camadas, focando em testes unitários, de integração e end-to-end. A documentação abaixo descreve a estratégia de testes e como implementá-los.

## Estrutura de Testes
```
src/
├── __tests__/           # Arquivos de teste
│   ├── unit/           # Testes unitários
│   ├── integration/    # Testes de integração
│   └── e2e/           # Testes end-to-end
├── test-utils/         # Utilitários para testes
└── mocks/             # Dados mockados
```

## Testes Unitários

### Componentes
```typescript
// SearchForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchForm } from '../components/SearchForm';

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

### Hooks
```typescript
// useCardSearch.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useCardSearch } from '../hooks/useCardSearch';

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

## Testes de Integração

### Fluxo de Busca
```typescript
// search-flow.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { SearchForm } from '../components/SearchForm';
import { CreditCardList } from '../components/CreditCardList';

describe('Fluxo de Busca', () => {
  it('deve buscar e exibir resultados', async () => {
    render(
      <>
        <SearchForm />
        <CreditCardList />
      </>
    );
    
    fireEvent.change(screen.getByLabelText('Busca'), {
      target: { value: 'cartão' }
    });
    
    fireEvent.click(screen.getByText('Buscar'));
    
    await waitFor(() => {
      expect(screen.getByText('Cartão XPTO')).toBeInTheDocument();
    });
  });
});
```

## Testes End-to-End

### Cypress
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

## Mocks e Fixtures

### Dados Mockados
```typescript
// mocks/cards.ts
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

// mocks/api.ts
export const mockApi = {
  searchCards: jest.fn().mockResolvedValue({
    cards: mockCards,
    total: 1
  })
};
```

## Configuração de Ambiente

### Jest
```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test-utils/setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  }
};
```

### Cypress
```javascript
// cypress.config.js
module.exports = {
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
```

## Boas Práticas

### 1. Nomenclatura
- Arquivos de teste: `*.test.tsx` ou `*.spec.tsx`
- Testes E2E: `*.cy.ts`
- Mocks: `*.mock.ts`

### 2. Organização
- Testes próximos aos componentes
- Mocks centralizados
- Fixtures reutilizáveis

### 3. Cobertura
- Mínimo de 80% de cobertura
- Foco em lógica de negócio
- Testes críticos primeiro

## Próximos Passos

### 1. Melhorias Planejadas
- Aumentar cobertura de testes
- Implementar testes de performance
- Adicionar testes de acessibilidade
- Automatizar execução de testes

### 2. Ferramentas
- Jest para testes unitários
- React Testing Library para componentes
- Cypress para E2E
- MSW para mocks de API 