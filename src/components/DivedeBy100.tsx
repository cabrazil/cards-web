import React from 'react';

interface DivideBy100Props {
  amount: number | string;
  divisor: number;
}

const DivideBy100: React.FC<DivideBy100Props> = ({ amount, divisor }) => {
  const parsedAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(parsedAmount) || divisor === 0) {
    console.error('Invalid amount or divisor:', amount, divisor);
    return <span>Invalid input</span>;
  }

  const dividedAmount = (parsedAmount / divisor) - 1;

  const roundedValue = parseFloat(dividedAmount.toFixed(2));

  return <span>{(roundedValue)}</span>;
};

export default DivideBy100;
