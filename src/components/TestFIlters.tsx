import React, { useState } from 'react';
import axios from 'axios';
import Select, { SingleValue } from 'react-select';

// Tipos para as opções de dropdown
type DropdownOption = {
  value: string;
  label: string;
};

// Tipos para os resultados
type ResultItem = {
  title: string;
  description: string;
  value: string;
  date: string;
};

// Componente de Formulário de Busca
const SearchForm: React.FC<{ onSearch: (segment: string, issuer: string) => void }> = ({
  onSearch,
}) => {
  const [selectedSegment, setSelectedSegment] = useState<SingleValue<DropdownOption>>(null);
  const [selectedIssuer, setSelectedIssuer] = useState<SingleValue<DropdownOption>>(null);

  // Opções para os dropdowns
  const segmentOptions: DropdownOption[] = [
    { value: 'alta-renda', label: 'Alta Renda' },
    { value: 'media-renda', label: 'Média Renda' },
    { value: 'baixa-renda', label: 'Baixa Renda' },
  ];

  const issuerOptions: DropdownOption[] = [
    { value: 'agora-investimentos', label: 'Agora Investimentos' },
    { value: 'xp-investimentos', label: 'XP Investimentos' },
    { value: 'itau', label: 'Itaú' },
    { value: 'nubank', label: 'Nubank' },
    { value: 'inter', label: 'Inter' },
    { value: 'c6-bank', label: 'C6 Bank' },
  ];

  const handleSearch = () => {
    // Valida se ambos os campos estão selecionados
    if (selectedSegment && selectedIssuer) {
      onSearch(selectedSegment.value, selectedIssuer.value);
    } else {
      alert('Por favor, selecione Segmento e Emissor');
    }
  };

  return (
    <div className="flex items-center space-x-4 mb-6 p-4 bg-white shadow-md rounded-lg">
      {/* Dropdown de Segmento */}
      <Select<DropdownOption>
        value={selectedSegment}
        onChange={(option) => setSelectedSegment(option as SingleValue<DropdownOption>)}
        options={segmentOptions}
        placeholder="Selecione o Segmento"
        className="w-1/2"
      />

      {/* Dropdown de Emissor */}
      <Select<DropdownOption>
        value={selectedIssuer}
        onChange={(option) => setSelectedIssuer(option as SingleValue<DropdownOption>)}
        options={issuerOptions}
        placeholder="Selecione o Emissor"
        className="w-1/2"
      />

      {/* Botão de Busca */}
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Buscar
      </button>
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
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {results.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-6 border hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-bold mb-2">{item.title}</h3>
          <p className="text-gray-600 mb-4">{item.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-500">{item.value}</span>
            <span className="text-sm text-gray-500">{item.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Componente Principal
const SearchApplication: React.FC = () => {
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (segment: string, issuer: string) => {
    setLoading(true);
    try {
      // Substitua pela URL real da sua API de backend
      const response = await axios.get<ResultItem[]>('/api/search', {
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

export default SearchApplication;