import React from 'react';
import { CreditCardDetails } from '../features/card-details/components/CreditCardDetails';
import { getThemeClasses } from '../shared/theme/theme';

interface CardDetailsPageProps {
  cardId: string;
  selectedFilters: {
    expense: string;
    issuer: string;
  };
}

const CardDetailsPage: React.FC<CardDetailsPageProps> = ({ cardId, selectedFilters }) => {
  // Função para obter o label do perfil de gastos
  const getExpenseLabel = (expenseCode: string) => {
    const expenseLabels: { [key: string]: string } = {
      '1': 'Até R$ 1.000',
      '2': 'R$ 1.001 a R$ 3.000',
      '3': 'R$ 3.001 a R$ 6.000',
      '4': 'R$ 6.001 a R$ 12.000',
      '5': 'Acima de R$ 12.000'
    };
    return expenseLabels[expenseCode] || expenseCode;
  };

  // Função para voltar à página anterior
  const handleBack = () => {
    window.history.pushState({}, '', '/app');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen font-roboto flex flex-col" style={{ backgroundColor: '#011627' }}>
      {/* Header com badges */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="max-w-[1400px] mx-auto">
          {/* Título da página centralizado */}
          <div className="text-center mb-6">
            <h1 className="text-white text-h3 font-bold mb-2">
              Detalhes do Cartão
            </h1>
            <p className="text-gray-300 text-h6">
              Informações completas sobre o cartão selecionado
            </p>
          </div>

          {/* Badges dos filtros selecionados centralizados */}
          <div className="flex flex-wrap gap-3 justify-center">
            <div className={`${getThemeClasses.border.input} border-2 rounded-full px-4 py-2`}>
              <span className="text-white text-sm font-medium">
                Perfil: {getExpenseLabel(selectedFilters.expense)}
              </span>
            </div>
            <div className={`${getThemeClasses.border.input} border-2 rounded-full px-4 py-2`}>
              <span className="text-white text-sm font-medium">
                Instituição: {selectedFilters.issuer}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 max-w-[1400px] mx-auto px-6 py-8">
        <div className="w-full">
          <CreditCardDetails cardId={cardId} />
        </div>
      </div>

      {/* Footer com botão voltar centralizado */}
      <div className="bg-slate-800 border-t border-slate-700 px-6 py-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <button
            onClick={handleBack}
            className={`${getThemeClasses.button.primary} px-6 py-3 rounded-md text-base font-medium transition-all duration-200`}
          >
            Voltar à Lista de Cartões
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsPage; 