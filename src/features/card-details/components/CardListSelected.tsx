import React, { useState, useEffect } from 'react';
import Select, { SingleValue } from 'react-select';
import axios from 'axios';

interface DropdownOption {
  value: string;
  label: string;
}

interface CreditCard {
  id: string;
  name: string;
  issuer: string;
}

interface SearchFormProps {
  onSearch: (segment: string, issuer: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  // ... (código do SearchForm permanece o mesmo)
};

const CreditCardList: React.FC<{ segment: string; issuer: string; onCardSelect: (card: CreditCard) => void }> = ({
  segment,
  issuer,
  onCardSelect,
}) => {
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCreditCards = async () => {
      try {
        const response = await axios.get<{ data: CreditCard[] }>(`/api/credit-cards?segment=${segment}&issuer=${issuer}`);
        setCreditCards(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar cartões de crédito:', error);
      }
    };

    fetchCreditCards();
  }, [segment, issuer]);

  const handleCardClick = (card: CreditCard) => {
    setSelectedCardId(card.id);
    onCardSelect(card);
  };

  return (
    <div>
      {creditCards.length > 0 ? (
        creditCards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            style={{
              border: selectedCardId === card.id ? '2px solid orange' : 'none',
              cursor: 'pointer',
            }}
          >
            <h3>{card.name}</h3>
            <p>Instituição: {card.issuer}</p>
          </div>
        ))
      ) : (
        <p className="text-white text-center">Nenhum cartão de crédito encontrado.</p>
      )}
    </div>
  );
};

const CreditCardDetails: React.FC<{ cardId: string }> = ({ cardId }) => {
  const [creditCard, setCreditCard] = useState<CreditCard | null>(null);

  useEffect(() => {
    const fetchCreditCardDetails = async () => {
      try {
        const response = await axios.get<CreditCard>(`/api/credit-cards/${cardId}`);
        setCreditCard(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do cartão de crédito:', error);
      }
    };

    fetchCreditCardDetails();
  }, [cardId]);

  return (
    <div>
      {creditCard ? (
        <>
          <h2>Detalhes do Cartão de Crédito</h2>
          <p>Nome: {creditCard.name}</p>
          <p>Instituição: {creditCard.issuer}</p>
          {/* Adicione aqui outros detalhes do cartão de crédito */}
        </>
      ) : (
        <p className="text-white text-center">Carregando detalhes do cartão de crédito...</p>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [segment, setSegment] = useState<string | null>(null);
  const [issuer, setIssuer] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const handleSearch = (selectedSegment: string, selectedIssuer: string) => {
    setSegment(selectedSegment);
    setIssuer(selectedIssuer);
  };

  const handleCardSelect = (card: CreditCard) => {
    setSelectedCardId(card.id);
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {segment && issuer && (
        <CreditCardList segment={segment} issuer={issuer} onCardSelect={handleCardSelect} />
      )}
      {selectedCardId && <CreditCardDetails cardId={selectedCardId} />}
    </div>
  );
};

export default App;