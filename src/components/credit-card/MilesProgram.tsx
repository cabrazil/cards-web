import React from 'react';
import { Award } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import CardDetailSection from './CardDetailSection';

interface CardProps{
  cardDetail: {
    id: string;
    card_name: string;
    mileages: {
      id: string;
      program_name: string;
      transfer_program:  string[];
      airlines:          string[];
      hotels:            string[]
      rate_points_miles: number;
      min_transfer:      number;
      exchange_store:    string[];
      pay_bills:         boolean;
      pay_cashback:      boolean;
      other_options:     string[];
    }[]
  }
}

interface CardFeatureProps {
  label: string;
  value: string | string[] | number | boolean;
  icon?: boolean;
  className?: string;
}

const CardFeature: React.FC<CardFeatureProps> = ({ 
  label, 
  value, 
  icon = false, 
  className = ''
}) => (
  <div className={`ml-2 flex justify-between ${className}`}>
    <div className="flex">
      {icon && (
        <span className={typeof value === 'boolean' ? (value ? 'text-green-500' : 'text-yellow-500') : 'text-green-500'}>
          <FaCheck />
        </span>
      )}
      <span>{label}</span>
    </div>
    <div>
      <span className="text-gray-950 font-semibold">
        {typeof value === 'boolean' ? (value ? 'Sim' : 'Não') : value}
      </span>
    </div>
  </div>
);

export const MilesProgram: React.FC<CardProps> = ({ cardDetail }) => {
  const COLORS = {
    PRIMARY: '#1F3B4D',
    TEXT_PRIMARY: '#4b5563',
    HIGHLIGHT: '#4169e1',
  };

  return (
    <CardDetailSection
      title="Programa de milhas"
      icon={<Award color={COLORS.HIGHLIGHT} />}
      className='text-md font-semibold'
    >
      <div style={{ color: COLORS.TEXT_PRIMARY }}>
        {cardDetail?.mileages.map((item) => (
          <ul>
            <li>
              <CardFeature label="Nome:" value={item.program_name} />

              {item.transfer_program[0] === 'Livelo'
              ?
              <CardFeature label="Pontos podem ser transferidos para o programa:" value={item.transfer_program} icon={true} />
              :
              <div className='ml-2 flex justify-between'>
                <div>
                  <span>Pontos podem ser transferidos para o programa:</span>
                </div>
                <div>
                  <span className="text-gray-950 font-semibold">Não há</span>
                </div>
              </div>}
              
              {item?.airlines.length > 3 &&
              <CardFeature label="Para companhias aéreas:" value={item.airlines} icon={true} />}
     
              {item?.hotels[0] &&
              <CardFeature label="Para hotéis:" value={item.hotels} />}

              {item.pay_bills &&
              <CardFeature label="Pontos(cashback) para a fatura:" value='Sim'  />}
              
              {item?.other_options &&
              <CardFeature label="Obs:" value={item.other_options} />}
            </li>
          </ul>
        ))}
      </div>
    </CardDetailSection>
  );
};

export default MilesProgram;

