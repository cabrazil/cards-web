import { useState, useEffect } from 'react';
import Select, { SingleValue } from 'react-select';
import axios from 'axios';
import { api } from './services/api'
import { Header } from './components/Header';
//import { CardsList } from './components/CardsList';

interface issuerProps {
  id: string;
  issuer_name: string;
}

type DropdownOption = {
  value: string;
  label: string;
};

type ResultItem = {
  id: string;
  card_name: string;
  issuer_name: string;
  title: string;
  description: string;
  value: string;
  date: string;
};

// Configuração de cores baseada no documento
const COLORS = {
  PRIMARY: '#1F3B4D',      // Azul-marinho profundo
  SECUNDARY: '#d1d5db',    // Cinza-300
  HIGHLIGHT: '#FFD700',    // Dourado
  BACKGROUND: '#F5F5F5',   // Cinza-claro
  TEXT_PRIMARY: '#333333', // Cinza-escuro
  TEXT_SECONDARY: '#666666' // Cinza-médio
};

//react-select options
const customStyles = {
  control: (provided: any) => ({...provided,
    borderColor: COLORS.SECUNDARY,
    color: COLORS.TEXT_PRIMARY,
  }),
  option: (provided: any, state: { isSelected: any; }) => ({...provided,
    color: COLORS.TEXT_PRIMARY,
    backgroundColor: state.isSelected ? "lightgrey" : "white"
  }),
}

//This function customize border color 
function customTheme(theme: any) {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary: COLORS.HIGHLIGHT
    },
  };
};

export default function App() { 
  const [issuers, setIssuers] = useState<issuerProps[]>([]);

  useEffect(() => {
    loadIssuers();
  }, [])

  async function loadIssuers() {
    const response = await api.get("/issuers")
    setIssuers(response.data);
  }

  //this function get data from table issuers and transform to react-select format
  function transformIssuers(issuers: { issuer_name: any; }[]) {
    return issuers.map((issuer: { issuer_name: any; }) => ({ 
        value: issuer.issuer_name, 
        label: issuer.issuer_name 
    }));
  };

  
  const SearchForm: React.FC<{ onSearch: (segment: string, issuer: string) => undefined }> = ({ onSearch }) => {

    const [selectedSegment, setSelectedSegment] = useState<SingleValue<DropdownOption>>(null);
    const [selectedIssuer, setSelectedIssuer] = useState<SingleValue<DropdownOption>>(null);
  
    // Opções para os dropdowns
    const segmentOptions = [
      { value: 'ALTARENDA', label: 'Alta Renda' },
      { value: 'ENTRADA', label: 'Entrada' },
      { value: 'INTERMEDIARIO', label: 'Intermediário' },
    ];
  
    const issuerOptions = transformIssuers(issuers);
    console.log(issuerOptions);

    // Componente Principal
  

    const handleSearch = () => {
      // Valida se ambos os campos estão selecionados
      if (selectedSegment && selectedIssuer) {
        onSearch(selectedSegment.value, selectedIssuer.value);
      } else {
        alert('Por favor, selecione Segmento e Emissor');
      }
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

            <Select<DropdownOption>
              theme={customTheme}
              options={segmentOptions}
              styles={customStyles}
              value={selectedSegment}
              onChange={(option) => setSelectedSegment(option as SingleValue<DropdownOption>)}  
              placeholder="Selecione..."
              isClearable
            />

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
              <Select<DropdownOption>
                theme={customTheme}
                options={issuerOptions}
                styles={customStyles}
                value={selectedIssuer}
                onChange={(option) => setSelectedIssuer(option as SingleValue<DropdownOption>)}
                placeholder="Selecione..."
                isClearable
              />
            </div>
          </div>
          <button  
            className="px-4 py-2 rounded-md"
            onClick={handleSearch}
            style={{ 
              backgroundColor: COLORS.HIGHLIGHT, 
              color: COLORS.TEXT_PRIMARY 
            }}
          >
            Buscar
          </button>
        </div>
      </div> 
    );
  };
  
  

  // Componente de Resultados (Cards)
  const ResultCards: React.FC<{ results: ResultItem[] }> = ({ results }) => {
    if (!results || results.length === 0) {
      return (
        <div className="text-center text-gray-500 mt-10">
          Nenhum resultado encontrado
        </div>
      );
    };
  
    return (
      <div className="credit-card-ranking">
        <div className="credit-cards grid md:grid-cols-3 gap-4">
          {results.map((item, index) => (
            <div 
              key={index} 
              className="credit-card-card p-4 rounded-lg shadow-md"
              style={{ 
                backgroundColor: 'white', 
                borderColor: COLORS.HIGHLIGHT 
              }}
            >
              <h3 className="text-lg font-semibold" style={{ color: COLORS.TEXT_PRIMARY }}>
                {item.card_name}
              </h3>
              <p style={{ color: COLORS.TEXT_SECONDARY }}>
                Instituição: {item.issuer_name}
              </p>
              {/* Detalhes adicionais do cartão */}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SearchApplication: React.FC = () => {
    const [results, setResults] = useState<ResultItem[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (segment: string, issuer: string) => {
      setLoading(true);
      try {
        // Substitua pela URL real da sua API de backend
        const response = await axios.get<ResultItem[]>('/cardsegment', {
          params: { segment, issuer }
        });

        setResults(response.data);
      } catch (error) {
        console.error('Erro na busca:', error);
        alert('Erro ao buscar resultados');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="container mx-auto px-4 py-8">
        <SearchForm onSearch={handleSearch} />

        {loading ? (
          <div className="text-center mt-10">
            <p>Carregando...</p>
          </div>
        ) : (
          <ResultCards results={results} />
        )}
      </div>
    );
  };

};