import React from 'react';
import { Gem } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import CardDetailSection from './CardDetailSection';
import DivideBy100 from '../DivedeBy100';

interface CardProps {
  cardDetail: {
    id:                  string;
    card_name:           string;
    ranking_points:      number;
    points_expire:       boolean;
    obs_system_points:   string[];
    points_accelerator:   boolean;
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
  <div className={`ml-2 flex justify-between ${className}`}>
    <div className="flex">
      {/* {icon && (
        <span className={typeof value === 'boolean' ? (value ? 'text-green-500' : 'text-yellow-500') : 'text-green-500'}>
          <FaCheck />
        </span>
      )} */}
      {icon 
        ?
        <span className={typeof value === 'boolean' && value ? 'text-yellow-500' : 'text-green-500'}>
          <FaCheck />
        </span>
        :
        <span className={typeof value === 'boolean' && value ? 'text-green-500' : 'text-yellow-500'}>
          <FaCheck />
        </span>
      }
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
    HIGHLIGHT: '#4169e1',
  };

  return (
    <CardDetailSection
      title="Pontuação do Cartão"
      icon={<Gem color={COLORS.HIGHLIGHT} />}
      className='text-md font-semibold'
    >
      <div style={{ color: COLORS.TEXT_PRIMARY }}>
        {cardDetail?.rewards.map((item) => (
          <ul key={item.id}>
            <li>
              {item.points_per_dollar > 2.4
              ?
              <><div className='ml-2 flex justify-between'>
                <div>
                  <span className='inline-flex text-green-500'><FaCheck /></span>
                  <span>{item.expenses}:</span>
                </div>
                  <span className='text-gray-950 font-semibold text-right'>{item.rules} {item.points_per_dollar} pontos por dólar</span>
              </div></>
              :
              <><div className='flex justify-between'>
                  <span className='ml-2'>{item.expenses}:</span>
                  <span className='text-gray-950 font-semibold text-right'>{item.rules} {item.points_per_dollar} pontos por dólar</span>
              </div></>}

              {item.points_per_real > 100 &&
              <><div className='flex justify-between'>
                  <span className='ml-2'>{item.expenses}:</span>
                  <span className='text-gray-950 font-semibold text-right'>{item.rules} <DivideBy100 amount={item.points_per_real} divisor={100} /> pontos por real</span>
              </div></>}
            </li>
          </ul>
        ))}

        {cardDetail?.obs_system_points &&
          <div className='flex justify-between'>
            <span className="ml-2">Obs: </span>
              
                <span>                    
                  <ul className='text-gray-950 font-semibold'>
                    {cardDetail.obs_system_points.map((item, index) => (
                      <li key={index} className='ml-2 text-right'>{item}</li>
                    ))}
                  </ul>
                </span>
              
          </div>}

        {/* {(cardDetail.points_accelerator && 
          <ul>
            {cardDetail?.obs_system_points.map((item) => (
              <CardFeature label="Acelerador:" value={item} icon={true} />
            ))}
          </ul>
        )} */}

        {(!cardDetail.points_expire)
          ?
          <CardFeature label="Pontos expiram:" value="Não" icon={true} />
          :
          <CardFeature label="Pontos expiram:" value="Sim" icon={false} />}
      </div>
    </CardDetailSection>
  );
};

export default Rewards;

