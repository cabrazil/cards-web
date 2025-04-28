interface DivideBy100Props {
  value?: number;
  amount?: number;
  divisor?: number;
}

export const DivideBy100 = ({ value, amount, divisor = 100 }: DivideBy100Props) => {
  const numberToDivide = value || amount || 0;
  return <span>{(numberToDivide / divisor).toFixed(2)}</span>;
}; 