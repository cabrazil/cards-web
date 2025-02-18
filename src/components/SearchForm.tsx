import { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { api } from '../services/api';

const COLORS = {
  PRIMARY: '#1F3B4D',      // Azul-marinho profundo
  SECUNDARY: '#d1d5db',    // Cinza-300
  HIGHLIGHT: '#4169e1',    // Dourado #FF9000
  BACKGROUND: '#F5F5F5',   // Cinza-claro
  TEXT_PRIMARY: '#333333', // Cinza-escuro
  TEXT_SECONDARY: '#666666' // Cinza-médio
};

interface issuerProps {
  id: string;
  issuer_name: string;
}

interface DropdownOption {
  value: string;
  label: string;
}

//react-select options
const customStyles = {
  control: (provided: any) => ({...provided,
    borderColor: COLORS.SECUNDARY,
    color: COLORS.TEXT_PRIMARY,
  }),
  option: (provided: any, state: { isSelected: any; }) => ({...provided,
    color: COLORS.TEXT_PRIMARY,
    backgroundColor: state.isSelected ? "#4169e1" : "white"
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

interface SearchFormProps {
  onSearch: (segment: string, issuer: string) => void;
}

const segmentOptions = [
  { value: 'ALTARENDA', label: 'Alta Renda' },
  { value: 'ENTRADA', label: 'Entrada' },
  { value: 'INTERMEDIARIO', label: 'Intermediário' },
];

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [selectedSegment, setSelectedSegment] = useState<SingleValue<DropdownOption>>(null);
  const [selectedIssuer, setSelectedIssuer] = useState<SingleValue<DropdownOption>>(null);

  const [issuers, setIssuers] = useState<issuerProps[]>([])

  
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

  const issuerOptions = transformIssuers(issuers);
  console.log(issuerOptions);

  const handleSearch = () => {
    if (selectedSegment && selectedIssuer) {
      onSearch(selectedSegment.value, selectedIssuer.value);
    } 
  };

  return (
    <div className="search-filters mb-8 flex space-x-4 ">
      <div className="income-filter flex-1">
        <label 
          htmlFor="income" 
          className="block text-sm font-medium text-muted-foreground mb-2"
          style={{ color: COLORS.TEXT_PRIMARY }}
        >
          Segmento de Renda 
        </label>
        <Select
          theme={customTheme}
          styles={customStyles}
          value={selectedSegment}
          onChange={setSelectedSegment}
          options={segmentOptions}
          placeholder="Selecione..."
          isClearable
        />
      </div>

      <div className="institution-filter flex-1">
        <label 
          htmlFor="institution" 
          className="block text-sm font-medium text-muted-foreground mb-2"
          style={{ color: COLORS.TEXT_PRIMARY }}
        >
          Instituição Emissora
        </label>
        <div className="relative">

          <Select
            theme={customTheme}
            styles={customStyles}
            value={selectedIssuer}
            onChange={setSelectedIssuer}
            options={issuerOptions}
            placeholder="Selecione..."
            isClearable
          />
        </div>
      </div>
      
      <button
        className='px-4 rounded-md font-semibold h-9 mt-7 border-2 border-[#4169e1] text-[#4169e1] hover:bg-[#4169e1] hover:text-white'
        onClick={handleSearch}
      >
        Buscar
      </button>

    </div>
  );
};

export default SearchForm;