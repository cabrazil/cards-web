import { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { api } from '../../../core/api/api';
import { theme, getThemeClasses } from '../../../shared/theme/theme';

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
    borderColor: theme.colors.secondary,
    color: theme.colors.text.dark,
    '&:hover': {
      borderColor: theme.colors.highlight,
    },
    '&:focus': {
      borderColor: theme.colors.highlight,
      boxShadow: `0 0 0 1px ${theme.colors.highlight}`,
    },
  }),
  option: (provided: any, state: { isSelected: any; isFocused: any; }) => ({...provided,
    className: `py-2 px-4 my-1 ${state.isSelected ? 'bg-[#FF9F1C] text-white' : state.isFocused ? 'bg-[#FF9F1C]/20' : 'bg-white text-gray-800'}`,
    color: theme.colors.text.dark,
  }),
  
  menu: (provided: any) => ({
    ...provided,
    className: 'mt-2 rounded-lg shadow-lg border border-gray-200',
  }),
  menuList: (provided: any) => ({
    ...provided,
    className: 'p-1',
  }),
}

//This function customize border color 
function customTheme(reactSelectTheme: any) {
  return {
    ...reactSelectTheme,
    colors: {
      ...reactSelectTheme.colors,
      primary: theme.colors.highlight
    },
  };
};

interface SearchFormProps {
  onSearch: (expense: string, issuer: string) => void;
}

const expenseOptions: DropdownOption[] = [
  { value: '1', label: '| Até R$ 1.000 |' },
  { value: '2', label: '| R$ 1.001 a R$ 3.000 |' },
  { value: '3', label: '| R$ 3.001 a R$ 6.000 |' },
  { value: '4', label: '| R$ 6.001 a R$ 12.000 |' },
  { value: '5', label: '| Acima de R$ 12.000 |' },
];

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [selectedExpense, setSelectedExpense] = useState<SingleValue<DropdownOption>>(null);
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
    if (selectedExpense && selectedIssuer) {
      onSearch(selectedExpense.value, selectedIssuer.value);
    } 
  };

  return (
    <div className="search-filters mb-8 flex space-x-4 ">
      <div className="income-filter flex-1">
        <label 
          htmlFor="income" 
          className="block text-sm font-medium text-white mb-2"
        >
          Perfil de Gastos 
        </label>
        <Select
          theme={customTheme}
          styles={customStyles}
          value={selectedExpense}
          onChange={setSelectedExpense}
          options={expenseOptions}
          placeholder="Selecione..."
          isClearable
        />
      </div>

      <div className="institution-filter flex-1">
        <label 
          htmlFor="institution" 
          className="block text-sm font-medium text-white mb-2"
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
        className={`px-4 rounded-md font-semibold h-9 mt-7 ${getThemeClasses.button.primary}`}
        onClick={handleSearch}
      >
        Buscar
      </button>

    </div>
  );
};

export default SearchForm;