# Documentação dos Componentes

## Componentes Principais

### Header
Componente responsável pelo cabeçalho da aplicação.

#### Props
```typescript
interface HeaderProps {
  title?: string;
  logo?: string;
  onSearch?: (query: string) => void;
}
```

#### Uso
```tsx
<Header 
  title="Busca de Cartões" 
  logo="/logo.png" 
  onSearch={handleSearch} 
/>
```

### SearchForm
Formulário de busca de cartões de crédito.

#### Props
```typescript
interface SearchFormProps {
  onSubmit: (searchParams: SearchParams) => void;
  initialValues?: SearchParams;
  isLoading?: boolean;
}

interface SearchParams {
  query: string;
  category?: string;
  minIncome?: number;
  maxAnnualFee?: number;
}
```

#### Uso
```tsx
<SearchForm 
  onSubmit={handleSearch} 
  initialValues={{ query: '' }} 
  isLoading={isLoading} 
/>
```

### CreditCardList
Lista de cartões de crédito encontrados na busca.

#### Props
```typescript
interface CreditCardListProps {
  cards: Card[];
  onSelectCard: (cardId: string) => void;
  isLoading?: boolean;
  error?: string;
}

interface Card {
  id: string;
  name: string;
  image: string;
  annualFee: number;
  benefits: string[];
  category: string;
}
```

#### Uso
```tsx
<CreditCardList 
  cards={searchResults} 
  onSelectCard={handleSelectCard} 
  isLoading={isLoading} 
  error={error} 
/>
```

### CreditCardDetails
Exibe os detalhes completos de um cartão selecionado.

#### Props
```typescript
interface CreditCardDetailsProps {
  card: CardDetails;
  onClose: () => void;
  isLoading?: boolean;
  error?: string;
}

interface CardDetails extends Card {
  requirements: {
    minimumIncome: number;
    creditScore: number;
  };
  features: {
    cashback: number;
    points: number;
    miles: number;
  };
  fees: {
    annual: number;
    latePayment: number;
    foreignTransaction: number;
  };
}
```

#### Uso
```tsx
<CreditCardDetails 
  card={selectedCard} 
  onClose={handleCloseDetails} 
  isLoading={isLoading} 
  error={error} 
/>
```

## Componentes de Layout

### Container
Wrapper responsivo para o conteúdo da página.

#### Props
```typescript
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}
```

#### Uso
```tsx
<Container maxWidth="lg">
  <SearchForm />
  <CreditCardList />
</Container>
```

### Card
Componente base para exibição de cartões.

#### Props
```typescript
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}
```

#### Uso
```tsx
<Card hoverable onClick={handleClick}>
  <CardContent>
    <h3>{card.name}</h3>
    <p>{card.description}</p>
  </CardContent>
</Card>
```

## Hooks Personalizados

### useCardSearch
Hook para gerenciar a busca de cartões.

```typescript
const useCardSearch = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [results, setResults] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (params: SearchParams) => {
    // Implementação da busca
  };

  return {
    searchParams,
    setSearchParams,
    results,
    isLoading,
    error,
    search
  };
};
```

### useCardDetails
Hook para gerenciar os detalhes de um cartão.

```typescript
const useCardDetails = (cardId: string) => {
  const [card, setCard] = useState<CardDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = async () => {
    // Implementação da busca de detalhes
  };

  return {
    card,
    isLoading,
    error,
    fetchDetails
  };
};
``` 