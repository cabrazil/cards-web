import { CreditCard, MapPin, Award, Globe, Gift } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../services/api'

interface CardProps{
  id: string;
  created_at:            string;
  updated_at:            string;
  card_name:             string;
  issuer_name:           string;
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
  obs_cashback:          string;
  account_holder:        boolean;
  international_card:    boolean;
  card_modality:         string;
  vip_lounge_app:        string;
  spread_rate:           number;
  iof_rate:              number;
  ranking_vip_lounges:   number;
  src_card_picture:      string;
  brandId:               string;
  issuerId:              string;
  zerofees: [{
    id: string
    expenses: string;
    investments: string;
    fee_discount: number;
    notes: string;
    get_conditions: string[];
  }]
  rewards: [{
    id: string;
    expenses: string;
    points_per_dollar: number;
    points_per_real: number;
    rules: string;
    points_limit: number;
    expiration: boolean;
  }]
  mileages: [{
    id: string;
    program_name: string;
    transfer_program:  string[];
    airlines:          string[];
    hotels:            string[]
    rate_points_miles: number;
    min_transfer:      number;
    exchange_store:    string[];
    pay_bills:         boolean;
    pay_cashback:      boolean;
    other_options:     string[];
  }]
  lounges: [{
    id:           string;
    lounge_name:  string;
    br_airport:   string[];
    int_airport:  string;
    access_limit: string;
    conditions:   string;
  }]
  exclusives: {
    id: string;
    tag_name: string;
    tag_amount: number;
    exclusive_offers: string[];
    additional_info: string[];
  }
  brand: {
    id: string;
    brand_name: string;
    variant_name: string;
    general_benefits: [];
    isActive: boolean;
    site_info: string;
  }
  issuer: {
    id:          string;
    issuer_name: string;
    issuer_type: string;
    created_at:  string;
  }
}

interface cardsDetailsProps {
  segment: string;
  issuer: string;
}

const COLORS = {
  PRIMARY: '#1F3B4D',
  SECUNDARY: '#d1d5db',    // Cinza-300
  HIGHLIGHT: '#FFD700',
  BACKGROUND: '#F5F5F5',
  TEXT_PRIMARY: '#333333',
  TEXT_SECONDARY: '#666666'
};

const CardDetailSection = ({ title, icon, children, className = '' }) => (
  <div 
    className={`card-section p-4 rounded-lg mb-4 shadow-sm ${className}`}
    style={{ 
      backgroundColor: 'white', 
      borderTopColor: COLORS.HIGHLIGHT,
      borderTopWidth: '4px'
    }}
  >
    <div className="flex items-center mb-3">
      {icon}
      <h3 
        className="text-lg font-semibold ml-2"
        style={{ color: COLORS.TEXT_PRIMARY }}
      >
        {title}
      </h3>
    </div>
    {children}
  </div>
);

export function CardsDetails() {
  const [creditCards, setCreditCards] = useState<CardProps[]>([]);
    
  useEffect(() => {
    loadCards();
  }, [])

  async function loadCards() {
    const response = await api.get("/cards")
    setCreditCards(response.data);
  }

  return (

    <div className="credit-card-details grid md:grid-cols-1 gap-4">
      
      {creditCards.map(card => (
        
        <div>
          <CardDetailSection 
            title="Como Obter o Cartão" 
            icon={<CreditCard color={COLORS.PRIMARY} />}
          >
            <div style={{ color: COLORS.TEXT_SECONDARY }}>
              <div className="flex justify-between mb-2">
                <span>Restrição de Correntistas:</span>
                <span className="font-semibold">{card.card_brand || 'Não específico'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Exige Investimentos:</span>
                <span className="font-semibold">{card.card_brand || 'Não'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Cartões Adicionais:</span>
                <span className="font-semibold">{card.card_brand || '0'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Valor Mínimo Fatura Adicional:</span>
                <span className="font-semibold">
                  {card.add_cards_amount ? `R$ ${card.add_cards_amount}` : 'Não definido'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Limite do Cartão:</span>
                <span className="font-semibold">
                  {card.add_cards_amount ? `R$ ${card.add_cards_amount}` : 'Variável'}
                </span>
              </div>
            </div>
          </CardDetailSection>

          <CardDetailSection 
            title="Pontuação do Cartão" 
            icon={<MapPin color={COLORS.PRIMARY} />}
          >
            <div style={{ color: COLORS.TEXT_SECONDARY }}>
              <div className="flex justify-between mb-2">
                <span>Pontos Gastos Nacionais:</span>
                <span className="font-semibold">{card.annual_fee || '1 ponto'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Pontos Gastos Internacionais:</span>
                <span className="font-semibold">{card.annual_fee || '2 pontos'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxa de Spread:</span>
                <span className="font-semibold">{card.spread_rate || '3%'}</span>
              </div>
              <div className="flex justify-between">
                <span>IOF:</span>
                <span className="font-semibold">{card.iof_rate || '6.38%'}</span>
              </div>
            </div>
          </CardDetailSection>

          <CardDetailSection 
            title="Programa de Milhas" 
            icon={<Award color={COLORS.PRIMARY} />}
          >
            <div style={{ color: COLORS.TEXT_SECONDARY }}>
              <div className="flex justify-between mb-2">
                <span>Nome do Programa:</span>
                <span className="font-semibold">{card.card_brand || 'Não definido'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Transferência para Companhias Aéreas:</span>
                <span className="font-semibold">{card.card_brand || 'Sim'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Transferência para Hotéis:</span>
                <span className="font-semibold">{card.card_brand || 'Não'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Cashback:</span>
                <span className="font-semibold">
                  {card.annual_fee ? `${card.annual_fee}%` : 'Não oferece'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Observação:</span>
                <span className="font-semibold">
                  {card.obs_cashback || 'Sem observações'}
                </span>
              </div>
            </div>
          </CardDetailSection>

          <CardDetailSection 
            title="Acesso às Salas VIP" 
            icon={<Globe color={COLORS.PRIMARY} />}
          >
            <div style={{ color: COLORS.TEXT_SECONDARY }}>
              <div className="flex justify-between mb-2">
                <span>Salas Disponíveis:</span>
                <span className="font-semibold">{card.card_brand || 'Não especificado'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Limite de Acessos:</span>
                <span className="font-semibold">{card.card_brand || 'Ilimitado'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tipo de Aeroporto:</span>
                <span className="font-semibold">{card.card_brand || 'Nacional e Internacional'}</span>
              </div>
              <div className="flex justify-between">
                <span>Condições Especiais:</span>
                <span className="font-semibold">{card.card_brand || 'Não aplicável'}</span>
              </div>
            </div>
          </CardDetailSection>

          <CardDetailSection 
            title="Benefícios da Bandeira e Exclusivos" 
            icon={<Gift color={COLORS.PRIMARY} />}
          >
            <div style={{ color: COLORS.TEXT_SECONDARY }}>
              <div className="flex justify-between mb-2">
                <span>Descontos em Lojas:</span>
                <span className="font-semibold">{card.card_brand || 'Não oferece'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Descontos em Cinemas:</span>
                <span className="font-semibold">{card.card_brand || 'Não oferece'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Descontos em Restaurantes:</span>
                <span className="font-semibold">{card.card_brand || 'Não oferece'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Seguros:</span>
                <span className="font-semibold">{card.card_brand || 'Não oferece'}</span>
              </div>
              <div className="flex justify-between">
                <span>Outros Benefícios:</span>
                <span className="font-semibold">{card.card_brand || 'Nenhum adicional'}</span>
              </div>
            </div>
          </CardDetailSection>

          {card.card_name && (
            <div className="card-image flex justify-center items-center p-4 bg-white rounded-lg">
              <img 
                src={card.card_brand} 
                alt={`Cartão ${card.card_name}`} 
                className="max-h-48 object-contain"
              />
            </div>            
          )}
        </div>
      ))}
    </div>
  );
};