import React from 'react';
import { CircleDollarSign, MessageCircleWarning } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import CardDetailSection3 from './CardDetailSection3';
import { TooltipIcon } from '../TooltipIcon';

interface CardProps {
  cardDetail: {
    id:                 string;
    card_name:          string;
    contactless: boolean;
    cashbacks: {
      id:               string;
      pct_cashback:     number;
      txt_cashback:     string;
      obs_cashback:     string[];
      cash_tips:        string[];
    }[];
  }
}

interface CardFeatureProps {
  label: string;
  value: string | string[] |number | boolean;
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

/* const CardFeature2: React.FC<CardFeatureProps> = ({ 
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
); */

export const Cashback: React.FC<CardProps> = ({ cardDetail }) => {
  const COLORS = {
    PRIMARY: '#1F3B4D',
    TEXT_PRIMARY: '#4b5563',
    HIGHLIGHT: '#4169e1',
  };
  //console.log("Dados recebidos:", Cashback);
  return (
    <CardDetailSection3
      title="Cashback"
      icon={<CircleDollarSign color={COLORS.HIGHLIGHT} />}
      className='text-md font-semibold'
      icon2={cardDetail?.cashbacks[0].cash_tips.length > 0 
        ? <TooltipIcon text={cardDetail.cashbacks[0].cash_tips.join("\n")} icon={<MessageCircleWarning />} /> 
        : <span></span> }
    > 
      <div style={{ color: COLORS.TEXT_PRIMARY }}>
        {cardDetail?.cashbacks.map((item) => 
          <ul key={item.id}>
            <li>
              {item.pct_cashback > 0 &&
              <CardFeature label="Percentual de:" value={`${item.pct_cashback}% ${item.txt_cashback}`} icon={true} />}
            
              {item.obs_cashback &&
                <div className='flex justify-between'>
                  <span className="ml-2">Obs: </span>
                    
                      <span>                    
                        <ul className='text-gray-950 font-semibold'>
                          {item.obs_cashback.map((item, index) => (
                            <li key={index} className='ml-4 text-right'>{item}</li>
                          ))}
                        </ul>
                      </span>
                    
                </div>}
            </li>
          </ul>
        )}
      </div>
    </CardDetailSection3>
  );
};

export default Cashback;

