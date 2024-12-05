import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CreditCard {
  name: string;
  issuer: string;
}

const CreditCardList: React.FC<{ segment: string; issuer: string }> = ({ segment, issuer }) => {
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);

  useEffect(() => {
    const fetchCreditCards = async () => {
      try {
        //const response = await axios.get<CreditCard[]>(`/cardsegment?segment=${segment}&issuer=${issuer}`);

        const response = await axios.get<CreditCard[]>('/cardsegment', {
          params: { segment, issuer }
        });

        setCreditCards(response.data);
      } catch (error) {
        console.error('Erro ao buscar cartões de crédito:', error);
      }
    };

    fetchCreditCards();
  }, [segment, issuer]);

  return (
    <div>
      {creditCards.map((card) => (
        <div key={`${card.name}-${card.issuer}`}>
          <h3>{card.name}</h3>
          <p>Instituição: {card.issuer}</p>
        </div>
      ))}
    </div>
  );
};

export default CreditCardList;