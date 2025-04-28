interface DivideNumberProps {
  value: number;
  divisor?: number;
}

export const DivideNumber = ({ value, divisor = 1 }: DivideNumberProps) => {
  return <span>{(value / divisor).toFixed(2)}</span>;
}; 