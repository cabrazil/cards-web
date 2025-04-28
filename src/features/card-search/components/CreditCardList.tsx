import { useState, useEffect, useRef } from 'react';
import { api } from '../../../core/api/api';

const COLORS = {
  PRIMARY: '#1F3B4D',      // Azul-marinho profundo
  SECUNDARY: '#d1d5db',    // Cinza-300
  HIGHLIGHT: '#4169e1',    // Azul royal
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

      <div className="credit-cards grid md:grid-cols-3 gap-4">
        {(creditCards.length > 0)
        ?
        (
          creditCards.map(card => (
            <div 
              key={card.id} 
              className="credit-card-card bg-white p-4 rounded-lg shadow-md"
              onClick={() => handleCardClick(card)}
              style={{
                border: selectedCardId === card.id ? '2px solid #4169e1' : 'none',
                cursor: 'pointer',
              }}
              
            >
              <h3 className="text-lg font-semibold" style={{ color: COLORS.TEXT_PRIMARY }}>
                {card.card_name}
              </h3>
              <p style={{ color: COLORS.TEXT_SECONDARY }}>
                Instituição: {card.issuer_name}
              </p>
            </div>
          ))
        ) : (
        !firstRender.current && <p>Nenhum cartão de crédito foi selecionado.</p>
      )}
      </div>
    </div>
  );
};

export default CreditCardList;