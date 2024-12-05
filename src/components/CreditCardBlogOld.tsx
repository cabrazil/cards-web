import { useState, useEffect } from 'react';
import Select from 'react-select';
import { api } from '../services/api'
import { Header } from './Header';
//import { Search, Filter, CreditCard, IterationCcw } from 'lucide-react';
//import CardDetails from './CardsDetails';

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

interface IssuerProps {
  id: string;
  issuer_name: string;
}


// Configuração de cores baseada no documento
const COLORS = {
  PRIMARY: '#1F3B4D',      // Azul-marinho profundo
  HIGHLIGHT: '#FFD700',    // Dourado
  BACKGROUND: '#F5F5F5',   // Cinza-claro
  TEXT_PRIMARY: '#333333', // Cinza-escuro
  TEXT_SECONDARY: '#666666' // Cinza-médio
};

const optionsSegment = [
  { value: 'alta-renda', label: 'Alta Renda' },
  { value: 'entrada', label: 'Entrada' },
  { value: 'intermediario', label: 'Intermediário' },
];

//react-select options
const customStyles = {
  control: (provided: any) => ({...provided,
    borderColor: COLORS.PRIMARY,
    color: COLORS.TEXT_PRIMARY 
  }),
  option: (provided: any, state: { isSelected: any; }) => ({...provided,
    color: COLORS.TEXT_PRIMARY,
    backgroundColor: state.isSelected ? "lightgrey" : "white"
  }),
}

const CreditCardBlog = () => {
  const [segments, setSegments] = useState('');
  const [creditCards, setCreditCards] = useState<CardProps[]>([]);
  const [issuers, setIssuers] = useState<IssuerProps[]>([])

  
  useEffect(() => {
    loadIssuers();
  }, [])

  async function loadIssuers() {
    const response = await api.get("/issuers")
    setIssuers(response.data);
  }

  useEffect(() => {
    loadCards();
  }, [])

  async function loadCards() {
    const response = await api.get("/cards")
    setCreditCards(response.data);
  }

  /* const BrandFetcher: React.FC<Props> = ({ brand, variant }) => {
    const [data, setData] = useState<DataResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get<DataResponse>(
            `/brandvar`, 
            { params: { brand, variant } }
          );
          setData(response.data || null); // If no record, set to null
        } catch (err) {
          setError('Failed to fetch data');
        }
      };
  
      fetchData();
    }, [brand, variant]); */

  /* useEffect(() => {
    // Simulação de busca no MongoDB
    const fetchCreditCards = async () => {
      // Lógica de busca com filtros de renda e instituição financeira
      // Implementação real seria conectada ao backend
    };

    fetchCreditCards();
  }, [segments, issuers]); */

  //this function get data from table issuers and transform to react-select format
  function transformIssuers(issuers: any[]) {
    return issuers.map((issuer: { issuer_name: any; }) => ({ 
        value: issuer.issuer_name, 
        label: issuer.issuer_name 
    }));
  }

  const optionsIssuer = transformIssuers(issuers);
  //console.log(optionsIssuer);  

  const renderCreditCardRanking = () => {
    return (
      <div className="credit-card-ranking">
        <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.TEXT_PRIMARY }}>
          Ranking de Cartões de Crédito
        </h2>
        
        <div className="ranking-categories flex space-x-4 mb-6">
          {['Milhas', 'Salas VIP', 'Cashback'].map(category => (
            <button 
              key={category}
              className="px-4 py-2 rounded-md"
              style={{ 
                backgroundColor: COLORS.HIGHLIGHT, 
                color: COLORS.TEXT_PRIMARY 
              }}
            >
              Melhores {category}
            </button>
          ))}
        </div>

        <div className="credit-cards grid md:grid-cols-3 gap-4">
          {creditCards.map(card => (
            <div 
              key={card.id} 
              className="credit-card-card p-4 rounded-lg shadow-md"
              style={{ 
                backgroundColor: 'white', 
                borderColor: COLORS.HIGHLIGHT 
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
          ))}
        </div>
      </div>
    );
  };


  return (
    
    <div 
      className="credit-card-blog p-6 max-w-6xl mx-auto"
      style={{ backgroundColor: COLORS.BACKGROUND }}
    >
      <Header />

      <div className="search-filters mb-8 flex space-x-4">
        <div className="income-filter flex-1">
          <label 
            htmlFor="income" 
            className="block mb-2"
            style={{ color: COLORS.TEXT_PRIMARY }}
          >
            Segmento Renda
          </label>
          <Select options={optionsSegment} styles={customStyles}   placeholder="Selecione..."/>
        </div>

        <div className="institution-filter flex-1">
          <label 
            htmlFor="institution" 
            className="block mb-2"
            style={{ color: COLORS.TEXT_PRIMARY }}
          >
            Instituição Financeira
          </label>
          <div className="relative">
          <Select options={optionsIssuer} styles={customStyles} onChange={setIssuers} placeholder="Selecione..."/>
          </div>
        </div>
      </div>

      {renderCreditCardRanking()}
    </div>
  );

  //<CardDetails />
};

export default CreditCardBlog;