import React, { useState } from 'react';
import Select, { SingleValue } from 'react-select';

interface DropdownOption {
  value: string;
  label: string;
}

interface SearchFormProps {
  onSearch: (segment: string, issuer: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [selectedSegment, setSelectedSegment] = useState<SingleValue<DropdownOption>>(null);
  const [selectedIssuer, setSelectedIssuer] = useState<SingleValue<DropdownOption>>(null);

  const handleSearch = () => {
    if (selectedSegment && selectedIssuer) {
      onSearch(selectedSegment.value, selectedIssuer.value);
    }
  };

  return (
    <div>
      <Select
        value={selectedSegment}
        onChange={setSelectedSegment}
        options={[
          { value: 'ALTARENDA', label: 'Alta Renda' },
          { value: 'ENTRADA', label: 'Baixa Renda' },
          // adicione outras opções de segmentos aqui
        ]}
        placeholder="Selecione o Segmento de Renda"
      />
      <Select
        value={selectedIssuer}
        onChange={setSelectedIssuer}
        options={[
          { value: 'agora-investimentos', label: 'Agora Investimentos' },
          { value: 'nubank', label: 'Nubank' },
          { value: 'itau', label: 'Itaú' },
          { value: 'inter', label: 'Inter' },
          // adicione outras opções de instituições financeiras aqui
        ]}
        placeholder="Selecione a Instituição Financeira"
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchForm;