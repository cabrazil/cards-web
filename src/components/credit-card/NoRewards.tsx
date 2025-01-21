import React from 'react';
import { TicketPlus } from 'lucide-react';
import CardDetailSection from './CardDetailSection';


export const NoRewards: React.FC = () => {
  const COLORS = {
    PRIMARY: '#1F3B4D',
    TEXT_PRIMARY: '#4b5563',
  };

  return (
    <CardDetailSection
      title="Pontuação do Cartão"
      icon={<TicketPlus color={COLORS.PRIMARY} />}
      className='text-md font-semibold flex justify-between'
    >
      <span className='text-gray-950 font-semibold text-right'>Não oferece</span>
    </CardDetailSection>
  );
};

export default NoRewards;

