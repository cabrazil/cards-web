import React from 'react';

interface DivideNumberProps {
  amount: number | string;
  divisor: number;
}

const DivideNumber: React.FC<DivideNumberProps> = ({ amount, divisor }) => {
  const parsedAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(parsedAmount) || divisor === 0) {
    console.error('Invalid amount or divisor:', amount, divisor);
    return <span>Invalid input</span>;
  }

  const dividedAmount = parsedAmount / divisor;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return <span>{formatCurrency(dividedAmount)}</span>;
};

export default DivideNumber;
