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

const CreditCardList: React.FC<{ segment: string; issuer: string }> = ({ segment, issuer }) => {
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);

  useEffect(() => {
    loadCards();
  }, [segment, issuer])

  async function loadCards() {
    const response = await api.get(`/cardsegment?segment=${segment}&issuer=${issuer}`);
    setCreditCards(response.data);
  }

  return (
    <div className="credit-card-ranking">

    <div className="credit-cards grid md:grid-cols-3 gap-4">
      {creditCards.map(card => (
        <div 
          key={card.id} 
          className="credit-card-card bg-white p-4 rounded-lg shadow-md border-2 border-[#FF9000]"
          
        >
          <h3 className="text-lg font-semibold" style={{ color: COLORS.TEXT_PRIMARY }}>
            {card.card_name}
          </h3>
          <p style={{ color: COLORS.TEXT_SECONDARY }}>
            Instituição: {card.issuer_name}
          </p>
          {/* Detalhes adicionais do cartão */}
        </div>
      ))}
      </div>
    </div>
  );
};

export default CreditCardList;