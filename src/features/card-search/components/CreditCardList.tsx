import { useState, useEffect } from 'react';
import { api } from '../../../core/api/api';
import { getThemeClasses } from '../../../shared/theme/theme';

interface CreditCard {
  id: string;
  card_name: string;
  issuer_name: string;
  expense_code: number;
}

const CreditCardList: React.FC<{ 
  expense: string; 
  issuer: string; 
  onCardSelect: (card: CreditCard) => void;
  onNoResults: () => void;
  onSearchResults?: (results: CreditCard[]) => void;
}> = ({ expense, issuer, onCardSelect, onNoResults, onSearchResults }) => {

  async function loadCards() {
    if (isLoading) return; // Evitar múltiplas requisições simultâneas
    
    setIsLoading(true);
    try {
      const response = await api.get(`/cardexpense?expense=${expense}&issuer=${issuer}`);
      setCreditCards(response.data);
      // Notificar componente pai sobre os resultados
      if (onSearchResults) {
        onSearchResults(response.data);
      }
    } catch (error) {
      console.error('Erro ao carregar cartões:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Só executa se temos expense e issuer válidos e não está carregando
    if (expense && issuer && !isLoading) {
      loadCards();
    }
  }, [expense, issuer]); // Removidas dependências problemáticas

  // Verificar se não há resultados após o carregamento
  useEffect(() => {
    if (creditCards.length === 0 && expense && issuer && !isLoading) {
      onNoResults();
    }
  }, [creditCards.length, expense, issuer, isLoading]);

  const handleCardClick = (card: CreditCard) => {
    setSelectedCardId(card.id);
    onCardSelect(card);
  };

  return (
    <div className="credit-card-ranking mb-4">
      {/* Descrição da seção */}
      <div className="mb-6">
        <p className="text-gray-300 text-h6 text-center">
          Clique em um cartão para ver os detalhes completos
        </p>
      </div>

      <div className="credit-cards grid md:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full text-center py-8">
            <p className="text-white text-h6">Carregando cartões...</p>
          </div>
        ) : creditCards.length > 0 ? (
          creditCards.map(card => (
            <div 
              key={card.id} 
              className={`credit-card-card p-4 rounded-lg shadow-md cursor-pointer transition-all duration-200 hover:scale-105 ${
                selectedCardId === card.id ? 'ring-2 ring-[#FF9F1C] ring-opacity-50' : ''
              }`}
              style={{
                backgroundColor: '#163D57',
                border: '2px solid #FF9F1C',
                cursor: 'pointer',
              }}
              onClick={() => handleCardClick(card)}
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {card.card_name}
              </h3>
              <p className="text-gray-300">
                Instituição: {card.issuer_name}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-white text-center">Nenhum cartão de crédito foi encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditCardList;