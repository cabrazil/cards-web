import { useState } from 'react';

import { Header } from './components/Header';
import SearchForm from './components/SearchForm';
import CreditCardList from './components/CreditCardList';
import { CreditCardDetails } from './components/CreditCardDetails';

// Configuração de cores baseada no documento
const COLORS = {
  PRIMARY: '#1F3B4D',      // Azul-marinho profundo
  SECUNDARY: '#d1d5db',    // Cinza-300
  HIGHLIGHT: '#FF9000',    // Dourado
  BACKGROUND: '#F5F5F5',   // Cinza-claro
  TEXT_PRIMARY: '#333333', // Cinza-escuro
  TEXT_SECONDARY: '#666666' // Cinza-médio
};

interface CreditCard {
  id: string;
  card_name: string;
  issuer_name: string;
}

const App: React.FC = () => {
  const [segment, setSegment] = useState<string | null>(null);
  const [issuer, setIssuer] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const handleSearch = (selectedSegment: string, selectedIssuer: string) => {
    setSegment(selectedSegment);
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
    <div>
      <div 
        className="credit-card-blog p-6 max-w-7xl mx-auto"
        style={{ backgroundColor: COLORS.BACKGROUND }}
      >
        <Header />
        <SearchForm onSearch={handleSearch} />
        {segment && issuer && (
          <CreditCardList 
            segment={segment} 
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