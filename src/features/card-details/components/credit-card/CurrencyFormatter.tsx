interface CurrencyFormatterProps {
  value?: number;
  amount?: number;
}

export const CurrencyFormatter = ({ value, amount }: CurrencyFormatterProps) => {
  const numberToFormat = value || amount || 0;
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return <span>{formatCurrency(numberToFormat)}</span>;
}; 