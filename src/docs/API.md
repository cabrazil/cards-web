# Documentação da API

## Endpoints

### Busca de Cartões
```
GET /api/cards/search
```

#### Parâmetros de Query
- `query`: string (opcional) - Termo de busca
- `category`: string (opcional) - Categoria do cartão
- `limit`: number (opcional) - Limite de resultados
- `offset`: number (opcional) - Paginação

#### Resposta
```typescript
interface CardSearchResponse {
  cards: Array<{
    id: string;
    name: string;
    image: string;
    annualFee: number;
    benefits: string[];
    category: string;
  }>;
  total: number;
  limit: number;
  offset: number;
}
```

### Detalhes do Cartão
```
GET /api/cards/:id
```

#### Parâmetros
- `id`: string (obrigatório) - ID do cartão

#### Resposta
```typescript
interface CardDetailsResponse {
  id: string;
  name: string;
  image: string;
  annualFee: number;
  benefits: string[];
  category: string;
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

## Autenticação
A API utiliza autenticação via JWT (JSON Web Token).

### Headers Necessários
```
Authorization: Bearer <token>
Content-Type: application/json
```

## Tratamento de Erros
A API retorna códigos de status HTTP apropriados e mensagens de erro detalhadas.

### Códigos de Status Comuns
- 200: Sucesso
- 400: Requisição inválida
- 401: Não autorizado
- 404: Recurso não encontrado
- 500: Erro interno do servidor

### Formato do Erro
```typescript
interface ErrorResponse {
  status: number;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
```

## Rate Limiting
A API implementa rate limiting para prevenir abusos:
- 100 requisições por minuto por IP
- 1000 requisições por hora por IP

## Exemplos de Uso

### Busca de Cartões
```typescript
const searchCards = async (query: string) => {
  const response = await fetch(`/api/cards/search?query=${query}`);
  const data = await response.json();
  return data;
};
```

### Obter Detalhes do Cartão
```typescript
const getCardDetails = async (id: string) => {
  const response = await fetch(`/api/cards/${id}`);
  const data = await response.json();
  return data;
};
``` 