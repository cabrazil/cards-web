import { useState } from 'react';
import { Header } from '../shared/components/layout/Header';
import SearchForm from '../features/card-search/components/SearchForm';
import CreditCardList from '../features/card-search/components/CreditCardList';
import { getThemeClasses } from '../shared/theme/theme';

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

  const handleSearch = (selectedExpense: string | null, selectedIssuer: string | null) => {
    setExpense(selectedExpense);
    setIssuer(selectedIssuer);
  };

  const handleCardSelect = (card: CreditCard) => {
    // Armazenar estado para a nova página
    const cardDetailsState = {
      cardId: card.id,
      selectedFilters: {
        expense: expense!,
        issuer: issuer!
      }
    };
    
    // Salvar no localStorage
    localStorage.setItem('cardDetailsState', JSON.stringify(cardDetailsState));
    
    // Navegar para a página de detalhes
    window.history.pushState({}, '', `/card-details/${card.id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleNoResults = () => {
    // Não é mais necessário resetar selectedCardId
  };

  return (
    <div className="font-roboto min-h-screen flex flex-col" style={{ backgroundColor: '#011627' }}>
      <div 
        className="credit-card-blog p-20 max-w-7xl mx-auto flex-1"
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
      </div>

      {/* Footer com botão voltar à Home */}
      <div className="bg-slate-800 border-t border-slate-700 px-6 py-6">
        <div className="max-w-7xl mx-auto text-center">
          <button
            onClick={() => {
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className={`${getThemeClasses.button.primary} px-6 py-3 rounded-md text-base font-medium transition-all duration-200`}
          >
            ← Voltar à Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default App; 