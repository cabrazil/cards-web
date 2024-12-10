import { useState, useEffect } from 'react';
import { api } from '../services/api';

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

const CreditCardList: React.FC<{ segment: string; issuer: string; onCardSelect: 
  (card: CreditCard) => void }> = ({
  segment,
  issuer,
  onCardSelect,
}) => {
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);


  useEffect(() => {
    loadCards();
  }, [segment, issuer])

  async function loadCards() {
    const response = await api.get(`/cardsegment?segment=${segment}&issuer=${issuer}`);
    setCreditCards(response.data);
  }

  const handleCardClick = (card: CreditCard) => {
    setSelectedCardId(card.id);
    onCardSelect(card);
  };

  return (
    <div className="credit-card-ranking mb-4">

    <div className="credit-cards grid md:grid-cols-3 gap-4">
      {creditCards.length > 0 ? (
        creditCards.map(card => (
          <div 
            key={card.id} 
            className="credit-card-card bg-white p-4 rounded-lg shadow-md"
            onClick={() => handleCardClick(card)}
            style={{
              border: selectedCardId === card.id ? '2px solid orange' : 'none',
              cursor: 'pointer',
            }}
            
          >
            <h3 className="text-lg font-semibold" style={{ color: COLORS.TEXT_PRIMARY }}>
              {card.card_name}
            </h3>
            <p style={{ color: COLORS.TEXT_SECONDARY }}>
              Instituição: {card.issuer_name}
            </p>
            {/* Detalhes adicionais do cartão */}
          </div>
        ))

        ) : (
          <p>Nenhum cartão de crédito foi encontrado</p>
        )}
      </div>
    </div>
  );
};

export default CreditCardList;