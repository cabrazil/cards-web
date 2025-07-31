import { useState, useEffect } from 'react';
import Home from '../pages/Home';
import App from '../pages/App';

const MainApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'app'>('home');

  // Verificar rota inicial e mudanças de rota
  useEffect(() => {
    const checkRoute = () => {
      if (window.location.pathname === '/app') {
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
      ) : (
        <App />
      )}
    </div>
  );
};

export default MainApp;