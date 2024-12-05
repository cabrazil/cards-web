import { useState, useEffect } from 'react';
import Select from 'react-select';
import { api } from './services/api'
import { Header } from './components/Header';
import { CardsList } from './components/CardsList';

interface issuerProps {
  id: string;
  issuer_name: string;
}

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
}

const segmentOptions = [
  { value: 'ALTARENDA', label: 'Alta Renda' },
  { value: 'ENTRADA', label: 'Entrada' },
  { value: 'INTERMEDIARIO', label: 'Intermediário' },
];

export default function App(){
    const [segments, setSegments] = useState(); 
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
  }

  const issuerOptions = transformIssuers(issuers);
  console.log(issuerOptions);  

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
          <Select 
            theme={customTheme}
            options={segmentOptions}
            styles={customStyles}  
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
          <Select
            theme={customTheme}
            options={issuerOptions}
            styles={customStyles}
            placeholder="Selecione..."
            isClearable
            />
          </div>
          
        </div>
        
        <button 
          type="submit" 
          className="px-4 py-2 rounded-md"
          disabled={!segments || !issuers}
          style={{ 
            backgroundColor: COLORS.HIGHLIGHT, 
            color: COLORS.TEXT_PRIMARY 
          }}
        >
          Buscar
        </button>
      
      </div> 

      <CardsList /> 
          
    </div>
  );
};