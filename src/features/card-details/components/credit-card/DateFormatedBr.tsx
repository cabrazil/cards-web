interface DateFormatedBrProps {
  date: string;
  data?: string;
}

const DateFormatedBr = ({ date, data }: DateFormatedBrProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const dateToFormat = date || data || '';
  return <span>{formatDate(dateToFormat)}</span>;
};

export default DateFormatedBr; 