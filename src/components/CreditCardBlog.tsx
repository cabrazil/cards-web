import { useState, useEffect } from 'react';
import Select from 'react-select';
import { api } from '../services/api'
import { Search, Filter, CreditCard, IterationCcw } from 'lucide-react';

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
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [financialInstitution, setFinancialInstitution] = useState('');
  const [creditCards, setCreditCards] = useState([]);
  const [issuers, setIssuers] = useState<IssuerProps[]>([])

  
  useEffect(() => {
    loadIssuers();
  }, [])

  async function loadIssuers() {
    const response = await api.get("/issuers")
    setIssuers(response.data);
    
  }

  useEffect(() => {
    // Simulação de busca no MongoDB
    const fetchCreditCards = async () => {
      // Lógica de busca com filtros de renda e instituição financeira
      // Implementação real seria conectada ao backend
    };

    fetchCreditCards();
  }, [monthlyIncome, financialInstitution]);

  function transformIssuers(issuers: any[]) {
    return issuers.map((issuer: { issuer_name: any; }) => ({ 
        value: issuer.issuer_name, 
        label: issuer.issuer_name 
    }));
  }

  const optionsIssuer = transformIssuers(issuers);
  console.log(optionsIssuer);

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
                {card.name}
              </h3>
              <p style={{ color: COLORS.TEXT_SECONDARY }}>
                Instituição: {card.institution}
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
      

      <div className="search-filters mb-8 flex space-x-4">
        <div className="income-filter flex-1">
          <label 
            htmlFor="income" 
            className="block mb-2"
            style={{ color: COLORS.TEXT_PRIMARY }}
          >
            Segmento Renda
          </label>
          <Select options={optionsSegment} styles={customStyles} placeholder="Selecione..."/>
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
          <Select options={optionsIssuer} styles={customStyles} placeholder="Selecione..."/>
          </div>
        </div>
      </div>

      {renderCreditCardRanking()}
    </div>
  );
};

export default CreditCardBlog;