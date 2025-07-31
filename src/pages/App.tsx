import { useState } from 'react';
import { Header } from '../shared/components/layout/Header';
import SearchForm from '../features/card-search/components/SearchForm';
import CreditCardList from '../features/card-search/components/CreditCardList';
import { CreditCardDetails } from '../features/card-details/components/CreditCardDetails';

// Configuração de cores baseada no documento
const COLORS = {
  PRIMARY: '#1F3B4D',      // Azul-marinho profundo
  SECUNDARY: '#d1d5db',    // Cinza-300
  HIGHLIGHT: '#4169e1',    // Azul Royal
  BACKGROUND: '#F5F5F5',   // Cinza-claro
  TEXT_PRIMARY: '#333333', // Cinza-escuro
  TEXT_SECONDARY: '#666666' // Cinza-médio
};

interface CreditCard {
  id: string;
  card_name: string;
  issuer_name: string;
  expense_code: number;
}

const App: React.FC = () => {
  const [expense, setExpense] = useState<string | null>(null);
  const [issuer, setIssuer] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const handleSearch = (selectedExpense: string | null, selectedIssuer: string | null) => {
    setExpense(selectedExpense);
    setIssuer(selectedIssuer);
    setSelectedCardId(null);
  };

  const handleCardSelect = (card: CreditCard) => {
    setSelectedCardId(card.id);
  };

  const handleNoResults = () => {
    setSelectedCardId(null);
  };

  return (
    <div className="font-roboto min-h-screen" style={{ backgroundColor: '#011627' }}>
      <div 
        className="credit-card-blog p-20 max-w-7xl mx-auto"
      >
        <Header />
        <SearchForm onSearch={handleSearch} />
        {expense && issuer && (
          <CreditCardList 
            expense={expense} 
            issuer={issuer} 
            onCardSelect={handleCardSelect}
            onNoResults={handleNoResults}
          />
        )}
        {selectedCardId && <CreditCardDetails cardId={selectedCardId} />}
        
      </div> 
    </div>
  );
};

export default App; 