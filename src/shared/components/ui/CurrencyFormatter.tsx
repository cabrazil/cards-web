import React from 'react';

interface CurrencyFormatterProps {
  amount: number | string; // Allow string input for flexibility
}

const CurrencyFormatter: React.FC<CurrencyFormatterProps> = ({ amount }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const parsedAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(parsedAmount)) {
    console.error('Invalid amount:', amount);
    return <span>Invalid amount</span>;
  }

  return <span>{formatCurrency(parsedAmount)}</span>;
};

export default CurrencyFormatter;