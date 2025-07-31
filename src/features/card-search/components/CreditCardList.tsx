import { useState, useEffect, useRef } from 'react';
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
}> = ({ expense, issuer, onCardSelect, onNoResults }) => {

  console.log('Duplo no início', expense, issuer)
  const expenseNumber = Number(expense);

  async function loadCards() {
    const response = await api.get(`/cardexpense?expense=${expenseNumber}&issuer=${issuer}`);
    setCreditCards(response.data);
  }

  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const firstRender = useRef(true);
  
  useEffect(() => {
    if (firstRender.current) {
      console.log('Effect running... 1a')
      console.log('Tamanho: ', creditCards.length)
      firstRender.current = false;
      return;
    } else {

    loadCards();
      if (creditCards.length === 0) 
        onNoResults();
    }
        
  }, [expenseNumber, issuer, onNoResults, firstRender]);

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
        {(creditCards.length > 0)
        ?
        (
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
        !firstRender.current && <p className="text-white text-center">Nenhum cartão de crédito foi selecionado.</p>
      )}
      </div>
    </div>
  );
};

export default CreditCardList;