import React from 'react';
import { TicketPlus } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import CardDetailSection from './CardDetailSection';

interface CardProps {
  cardDetail: {
    id:             string;
    ranking_points: number;
    rewards: {
      id:                string;
      expenses:          string;
      points_per_dollar: number;
      points_per_real:   number;
      rules:             string;
      points_limit:      number;
      expiration:        boolean;
      notes:             string;
    }[]
  }
}

interface CardFeatureProps {
  label: string;
  value: string | number | boolean;
  icon?: boolean;
  className?: string;
}

const CardFeature: React.FC<CardFeatureProps> = ({ 
  label, 
  value, 
  icon = false, 
  className = ''
}) => (
  <div className={`flex justify-between ${className}`}>
    <div className="flex">
      {icon && (
        <span className={typeof value === 'boolean' && value ? 'text-yellow-500' : 'text-green-500'}>
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

export const Rewards: React.FC<CardProps> = ({ cardDetail }) => {
  const COLORS = {
    PRIMARY: '#1F3B4D',
    TEXT_PRIMARY: '#4b5563',
  };

  return (
    <CardDetailSection
      title="Pontuação do Cartão"
      icon={<TicketPlus color={COLORS.PRIMARY} />}
      className='text-md font-semibold'
    >
      <div style={{ color: COLORS.TEXT_PRIMARY }}>
        {cardDetail?.rewards.map((item) => (
          <ul>
            <li>
              {item.points_per_dollar > 0  &&
              <><div className='flex justify-between'>
                  <span className='ml-4'>{item.expenses}:</span>
                  <span className='text-gray-950 font-semibold text-right'>{item.rules} {item.points_per_dollar} pontos por dólar</span>
              </div></>}

              {item.points_per_real > 0  &&
              <><div className='flex justify-between'>
                  <span className='ml-4'>{item.expenses}:</span>
                  <span className='text-gray-950 font-semibold text-right'>{item.rules} {item.points_per_real} pontos por real</span>
              </div></>}
              
              {(!item.expiration)
              ?
              <CardFeature label="Pontos expiram:" value="Não" icon={true} />
              :
              <CardFeature label="Pontos expiram:" value="Sim" icon={false} />}

              {item.notes &&
              <CardFeature label="Pontos expiram:" value="Sim" icon={false} />}
            </li>
          </ul>
        ))}
      </div>
    </CardDetailSection>
  );
};

export default Rewards;

