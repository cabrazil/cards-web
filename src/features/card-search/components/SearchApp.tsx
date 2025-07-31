import { useState } from 'react';
import { api } from '../../../core/api/api';

// Definição do tipo para os resultados
interface ResultItem {
  // Adicione aqui as propriedades esperadas do resultado
  id: string;
  name: string;
  // outras propriedades conforme necessário
}

// Definição do tipo para os parâmetros de busca
interface SearchParams {
  segment: string;
  issuer: string;
}

export const useSearch = () => {
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (params: SearchParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<ResultItem[]>('/api/search', {
        params: {
          segment: params.segment,
          issuer: params.issuer
        }
      });

      setResults(response.data);
      return response.data; // Opcional: retorna os dados para uso adicional
    } catch (error) {
      console.error('Erro na busca:', error);
      setError('Erro ao buscar resultados');
      return []; // Retorna array vazio em caso de erro
    } finally {
      setLoading(false);
    }
  };

  // Reseta os resultados se necessário
  const resetSearch = () => {
    setResults([]);
    setError(null);
  };

  return {
    results,
    loading,
    error,
    search,
    resetSearch
  };
};

// Exemplo de componente usando o hook
export const SearchApplication: React.FC = () => {
  // Componente de exemplo - não utilizado

  return (
    <div className="container mx-auto px-4 py-8">
      {/* SearchForm e ResultCards removidos - não utilizados */}
      <div className="text-center mt-10">
        <p className="text-white text-center">Componente de exemplo - não utilizado</p>
      </div>
    </div>
  );
};