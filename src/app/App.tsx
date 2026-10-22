import { useState, useEffect } from 'react';
import { OnboardingPage } from '../pages/OnboardingPage';
import CardDetailsPage from '../pages/CardDetailsPage';
import { AdminCardExtractor } from '../pages/AdminCardExtractor';
import { PwaInstallPrompt } from '../shared/components/PwaInstallPrompt';

interface CardDetailsState {
  cardId: string;
  selectedFilters: {
    expense: string;
    issuer: string;
  };
}

const MainApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'app' | 'card-details' | 'admin'>('app');
  const [cardDetailsState, setCardDetailsState] = useState<CardDetailsState | null>(null);

  // Verificar rota inicial e mudanças de rota
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      
      if (path.startsWith('/card-details/')) {
        setCurrentPage('card-details');
        const cardId = path.split('/')[2];
        const storedState = localStorage.getItem('cardDetailsState');
        if (storedState) {
          const parsedState = JSON.parse(storedState);
          parsedState.cardId = cardId;
          setCardDetailsState(parsedState);
        }
      } else if (path === '/admin') {
        setCurrentPage('admin');
      } else {
        // Rotas '/' e '/app' unificadas diretamente na experiência principal
        setCurrentPage('app');
      }
    };

    checkRoute();

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
      {currentPage === 'admin' ? (
        <AdminCardExtractor />
      ) : currentPage === 'card-details' && cardDetailsState ? (
        <CardDetailsPage 
          cardId={cardDetailsState.cardId}
          selectedFilters={cardDetailsState.selectedFilters}
        />
      ) : (
        <OnboardingPage />
      )}
      <PwaInstallPrompt />
    </div>
  );
};

export default MainApp;