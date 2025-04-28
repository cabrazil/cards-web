import React from 'react';
import { Plane } from 'lucide-react';
import CardDetailSection from './CardDetailSection';


export const NoMilesProgram: React.FC = () => {
  const COLORS = {
    PRIMARY: '#1F3B4D',
    TEXT_PRIMARY: '#4b5563',
    HIGHLIGHT: '#4169e1',
  };

  return (
    <CardDetailSection
      title="Programa de Milhas"
      icon={<Plane color={COLORS.HIGHLIGHT} />}
      className='text-md font-semibold flex justify-between'
    >
      <span className='text-gray-950 font-semibold text-right'>Não oferece</span>
    </CardDetailSection>
  );
};

export default NoMilesProgram;

