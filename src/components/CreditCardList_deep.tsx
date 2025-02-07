import { useState, useEffect } from 'react';
import { api } from '../services/api';

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
}

const CreditCardList: React.FC<{ 
  segment: string; 
  issuer: string; 
  onCardSelect: (card: CreditCard) => void;
  onNoResults: () => void;
}> = ({ segment, issuer, onCardSelect, onNoResults }) => {
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  useEffect(() => {
    // Função para carregar os cartões da API
    async function loadCards() {
      try {
        const response = await api.get(`/cardsegment?segment=${segment}&issuer=${issuer}`);
        setCreditCards(response.data); // Atualiza o estado com os cartões retornados

        // Se não houver cartões, chama a função onNoResults
        if (response.data.length === 0) {
          onNoResults();
        }
      } catch (error) {
        console.error('Erro ao carregar cartões:', error);
      }
    }

    // Chama a função loadCards apenas se segment e issuer estiverem definidos
    if (segment && issuer) {
      loadCards();
    }
  }, [segment, issuer, onNoResults]); // Dependências do useEffect

  const handleCardClick = (card: CreditCard) => {
    setSelectedCardId(card.id); // Atualiza o ID do cartão selecionado
    onCardSelect(card); // Passa o cartão selecionado para o componente pai
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
          <p>Nenhum cartão de crédito foi encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default CreditCardList;