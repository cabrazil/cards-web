import React from 'react';
import { CircleDollarSign, CircleHelp } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import CardDetailSection3 from './CardDetailSection3';
import { TooltipIcon } from '../TooltipIcon';

interface CardProps {
  cardDetail: {
    id:                    string;
    cashback:              string;
    obs_add_cards:         string;
    obs_cashback:          string[];
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
      {/* {icon && (
        <span className={typeof value === 'boolean' && value ? 'text-yellow-500' : 'text-green-500'}>
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

const CardFeature2: React.FC<CardFeatureProps> = ({ 
  label, 
  value, 
  className = ''
}) => (
  <div className={`ml-2 flex justify-between ${className}`}>
    <div className="flex">
      <span>{label}</span>
    </div>
    <div>
      <span className="text-gray-950 font-semibold">
        {typeof value === 'boolean' ? (value ? 'Sim' : 'Não') : value}
      </span>
    </div>
  </div>
);

export const Cashback: React.FC<CardProps> = ({ cardDetail }) => {
  const COLORS = {
    PRIMARY: '#1F3B4D',
    TEXT_PRIMARY: '#4b5563',
    HIGHLIGHT: '#4169e1',
  };

  return (
    <CardDetailSection3
      title="Cashback"
      icon={<CircleDollarSign color={COLORS.HIGHLIGHT} />}
      className='text-md font-semibold'
      icon2={<TooltipIcon text={cardDetail.obs_add_cards} icon={<CircleHelp /> } /> }
    > 
      <div style={{ color: COLORS.TEXT_PRIMARY }}>
        {cardDetail?.cashback.length
        ?
        <CardFeature label="Percentual de:" value={cardDetail.cashback} icon={true} />
        :
        <CardFeature2 label="Sem percentual nas compras" value={cardDetail.cashback}/>  
        }
        
        {cardDetail?.obs_cashback &&
          <div className='flex justify-between'>
            <p><span className="ml-2">Obs: </span></p>
              <p>
                <span>                    
                  <ul className='text-gray-950 font-semibold'>
                    {cardDetail.obs_cashback.map((item) => (
                      <li className='ml-4 text-right'>{item}</li>
                    ))}
                  </ul>
                </span>
              </p>
          </div>}
      </div>
    </CardDetailSection3>
  );
};

export default Cashback;

