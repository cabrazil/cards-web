import React from 'react';
import { format, toZonedTime } from 'date-fns-tz';
import { ptBR } from 'date-fns/locale';

interface DateFormatedProps {
  data: string; // A data no formato que a API retorna (ex: "2023-10-05T12:34:56Z")
}

const DateFormated: React.FC<DateFormatedProps> = ({ data }) => {
  // Define o fuso horário de São Paulo
  const timeZone = 'America/Sao_Paulo';

  // Converte a data UTC para o fuso horário de São Paulo
  const dataUTC = new Date(data);
  const dataBr = toZonedTime(dataUTC, timeZone);

  // Formata a data no formato "05 de outubro de 2023"
  const dateFormated = format(dataBr, "dd 'de' MMMM 'de' yyyy", {
    locale: ptBR, // Usa o locale pt-BR para exibir o mês por extenso em português
  });

  return (
      <span>{dateFormated}</span>
  );
};

export default DateFormated;