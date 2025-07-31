import React, { useState, useEffect } from 'react';
import { api } from '../../../core/api/api';
import { TwoColumnLayout } from './TwoColumnLayout';
import { useCardLayout } from '../hooks/useCardLayout';
import { CardProps } from '../types';



export const CreditCardDetails: React.FC<{ cardId: string }> = ({ cardId }) => {
  const [cardDetail, setCardDetail] = useState<CardProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hook deve ser chamado sempre, mesmo que cardDetail seja null
  const availableCards = useCardLayout(cardDetail);

  const loadCards = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Fazendo requisição para a API com cardId:', cardId);
      const response = await api.get(`/cardid?id=${cardId}`);
      console.log('Resposta da API:', response.data);
      setCardDetail(response.data);
    } catch (error) {
      console.error('Erro ao buscar detalhes do cartão de crédito:', error);
      setError('Não foi possível carregar os detalhes do cartão');
      setCardDetail(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (cardId) {
      loadCards();
    } else {
      setCardDetail(null);
      setIsLoading(false);
    }
  }, [cardId]);

  if (isLoading) {
    return <div className="flex justify-center">Carregando detalhes do cartão de crédito...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!cardDetail) {
    return <div>Nenhum detalhe do cartão encontrado.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <TwoColumnLayout cards={availableCards} />
    </div>
  );
};

export default CreditCardDetails;