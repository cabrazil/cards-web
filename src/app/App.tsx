import { useState, useEffect } from 'react';
import Home from '../pages/Home';
import App from '../pages/App';
import CardDetailsPage from '../pages/CardDetailsPage';

interface CardDetailsState {
  cardId: string;
  selectedFilters: {
    expense: string;
    issuer: string;
  };
}

const MainApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'app' | 'card-details'>('home');
  const [cardDetailsState, setCardDetailsState] = useState<CardDetailsState | null>(null);

  // Verificar rota inicial e mudanças de rota
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      
      if (path.startsWith('/card-details/')) {
        setCurrentPage('card-details');
        // Extrair cardId da URL
        const cardId = path.split('/')[2];
        // Extrair dados do localStorage
        const storedState = localStorage.getItem('cardDetailsState');
        if (storedState) {
          const parsedState = JSON.parse(storedState);
          // Atualizar cardId da URL se necessário
          parsedState.cardId = cardId;
          setCardDetailsState(parsedState);
        }
      } else if (path === '/app') {
        setCurrentPage('app');
      } else {
        setCurrentPage('home');
      }
    };

    // Verificar rota inicial
    checkRoute();

    // Listener para mudanças de rota
    const handlePopState = () => {
      checkRoute();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div>
      {currentPage === 'home' ? (
        <Home />
      ) : currentPage === 'card-details' && cardDetailsState ? (
        <CardDetailsPage 
          cardId={cardDetailsState.cardId}
          selectedFilters={cardDetailsState.selectedFilters}
        />
      ) : (
        <App />
      )}
    </div>
  );
};

export default MainApp;