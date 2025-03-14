import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

// Importando os componentes auxiliares
import AboutCard from './credit-card/AboutCard';
import CardRequirements from './credit-card/Requirements';
import Rewards from './credit-card/Rewards';
import NoRewards from './credit-card/NoRewards';
import Cashback from './credit-card/Cashback';
import VipLounges from './credit-card/VipLounges';
import MilesProgram from './credit-card/MilesProgram';
import Zerofee from './credit-card/ZeroFee';
import CardBenefits from './credit-card/CardBenefits';
import BrandBenefits from './credit-card/BrandBenefits';
import NoCashback from './credit-card/NoCashback';
import NoMilesProgram from './credit-card/NoMilesProgram';


// Tipos
interface CardProps {
  // ... (manter a definição de tipos existente)
  id:                    string;
  created_at:            string;
  updated_at:            string;
  card_name:             string;
  annual_fee:            number;
  card_brand:            string;
  category:              string;
  card_limit:            string;
  ranking_points:        number;
  ranking_benefits:      number;
  ranking_annuity:       number;
  ranking_miles_program: number;
  virtual_wallets:       string[];
  add_cards_amount:      number;
  add_cards_charge:      number;
  card_material:         string;
  contactless:           boolean;
  get_conditions:        string[];
  spread_on:             string;
  cashback:              string;
  obs_add_cards:         string;
  obs_cashback:          string[];
  account_holder:        boolean;
  international_card:    boolean;
  card_modality:         string;
  vip_lounge_app:        string;
  spread_rate:           number;
  iof_rate:              number;
  ranking_vip_lounges:   number;
  src_card_picture:      string;
  segment:               string;
  issuer_name:           string;
  points_expire:         boolean;
  obs_system_points:     string[];
  virtual_cards:         boolean;
  points_accelerator:    boolean;
  zerofees: {
    id:             string;
    expenses:       string;
    investments:    string;
    fee_discount:   number;
    notes:          string;
    get_conditions: string[];
  }[];

  cashbacks: {
    id:           string;
    pct_cashback: number;
    txt_cashback: string;
    obs_cashback: string[];
    cash_tips:    string[];
  }[];

  rewards: {
    id:                 string;
    expenses:           string;
    points_per_dollar:  number;
    points_per_real:    number;
    rules:              string;
    points_limit:       number;
    expiration:         boolean;
    notes:              string;
  }[];

  mileages: {
    id:                string;
    program_name:      string;
    transfer_program:  string[];
    airlines:          string[];
    hotels:            string[];
    rate_points_miles: number;
    min_transfer:      number;
    exchange_store:    string[];
    pay_bills:         boolean;
    pay_cashback:      boolean;
    other_options:     string[];
  }[];

  lounges: {
    id:           string;
    lounge_name:  string;
    br_airport:   string[];
    int_airport:  string;
    access_limit: string;
    conditions:   string;
    ispaid:       boolean;
  }[];

  exclusives: {
    id:               string;
    tag_name:         string;
    tag_amount:       number;
    exclusive_offers: string[];
    additional_info:  string[];
  };

  brand: {
    id:           string;
    brand_name:   string;
    variant_name: string;
    general_benefits: string[];
    isActive:     boolean;
    site_info:    string;
  };
  
  issuer: {
    id:          string;
    issuer_name: string;
    issuer_type: string;
    created_at:  string;
  };
  brandId:               string;
  issuerId:              string;
  
};

export const CreditCardDetails: React.FC<{ cardId: string }> = ({ cardId }) => {
  const [cardDetail, setCardDetail] = useState<CardProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <div className="grid md:grid-cols-2 gap-3">
      {/* Coluna da esquerda - Informações principais */}
      <section className="credit-card-details gap-4">
        <div>
          <AboutCard cardDetail={cardDetail} />
          
          {cardDetail.ranking_points > 0
          ? 
          <Rewards cardDetail={cardDetail} />
          :
          <NoRewards />}
          
          {cardDetail.ranking_miles_program > 0
          ?
          <MilesProgram cardDetail={cardDetail} />
          :
          <NoMilesProgram />}

          <BrandBenefits cardDetail={cardDetail} />
        </div>
      </section>

      {/* Coluna da direita - Informações secundárias */}
      <section className="credit-card-details gap-4">
        <div>
          
          
          <CardRequirements cardDetail={cardDetail} />
          <Zerofee cardDetail={cardDetail} />
          
          {cardDetail.cashback.length
          ?
          <Cashback cardDetail={cardDetail} />
          :
          <NoCashback />}
          <VipLounges cardDetail={cardDetail} />
          <CardBenefits cardDetail={cardDetail} />
          
        </div>
      </section>
    </div>
  );
};

export default CreditCardDetails;