import SearchForm from './components/SearchForm';
import CreditCardList from './components/CreditCardList';
import { Header } from './components/Header';
import { useState } from 'react';
import { CardsDetails } from './components/CardsDetails';

// Configuração de cores baseada no documento
const COLORS = {
  PRIMARY: '#1F3B4D',      // Azul-marinho profundo
  SECUNDARY: '#d1d5db',    // Cinza-300
  HIGHLIGHT: '#FFD700',    // Dourado
  BACKGROUND: '#F5F5F5',   // Cinza-claro
  TEXT_PRIMARY: '#333333', // Cinza-escuro
  TEXT_SECONDARY: '#666666' // Cinza-médio
};

const App: React.FC = () => {
  const [segment, setSegment] = useState<string | null>(null);
  const [issuer, setIssuer] = useState<string | null>(null);

  const handleSearch = (selectedSegment: string, selectedIssuer: string) => {
    setSegment(selectedSegment);
    setIssuer(selectedIssuer);
  };

  return (
    <div>
      <div 
        className="credit-card-blog p-6 max-w-6xl mx-auto"
        style={{ backgroundColor: COLORS.BACKGROUND }}
      >
        <Header />
        <SearchForm onSearch={handleSearch} />
        {segment && issuer && <CreditCardList segment={segment} issuer={issuer} />}
        
      </div> 
    </div>
  );
};

export default App;