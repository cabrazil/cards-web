import React from 'react';
import { CalendarOff, MessageCircleWarning } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import CurrencyFormatter from '../CurrencyFormatter';
import DivideNumber from '../DivideNumber';
import CardDetailSection3 from './CardDetailSection3';
import { TooltipIcon } from '../TooltipIcon';

// Interfaces
interface ZerofeeProps {
  cardDetail: {
    id:               string;
    annual_fee:       number;
    card_name:        string;
    zerofees: {
      id:             string;
      expenses:       string;
      investments:    string;
      fee_discount:   number;
      notes:          string;
      get_conditions: string[];
      fee_tips:       string[];
    }[];
  }
}

interface CardFeatureProps {
  label: string;
  value: string | number | boolean;
  icon?: boolean;
  className?: string;
}

// Componente de Feature reutilizável
/* const CardFeature: React.FC<CardFeatureProps> = ({ 
  label, 
  value, 
  icon = false, 
  className = ''
}) => (
  <div className={`ml-2 flex justify-between ${className}`}>
    <div className="flex">
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
); */

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

// Componente principal Zerofee
export const Zerofee: React.FC<ZerofeeProps> = ({ cardDetail }) => {
  const COLORS = {
    PRIMARY: '#1F3B4D',
    TEXT_PRIMARY: '#4b5563',
    HIGHLIGHT: '#4169e1',
  };

  return (
    <CardDetailSection3
      title="Para isentar anuidade"
      icon={<CalendarOff color={COLORS.HIGHLIGHT} />}
      className='text-md font-semibold'
      icon2={cardDetail.zerofees[0]?.fee_tips[0]?.length > 0 
        ? <TooltipIcon text={cardDetail.zerofees[0].fee_tips.join("\n")} icon={<MessageCircleWarning />} /> 
        : <span></span> }
    >
      <div style={{ color: COLORS.TEXT_PRIMARY }}>
        {/* Anuidade */}
        {(cardDetail.annual_fee > 0)
          ?
          <div className='ml-2 flex justify-between'>
            <><div>
              <span className='inline-flex text-yellow-500'><FaCheck /></span>
              <span>Anuidade de: </span>
            </div>
            <div>
              <span className='text-gray-950 font-semibold'><CurrencyFormatter amount={cardDetail.annual_fee} /></span>
              <span className='text-gray-950 font-semibold'> (12 x <DivideNumber amount={cardDetail.annual_fee} divisor={12} />)</span>
            </div></> 
          </div>
          :
          <div className='flex justify-between'>
            <div>
              <span className='inline-flex text-green-500'><FaCheck /></span>
              <span>Anuidade: </span>
            </div>
            <span className='text-gray-950 font-semibold'>Isento</span>
          </div>}
        
        {/* Condições */}
        {cardDetail.zerofees.map((item) => (
          <ul key={item.id}>
            {(item.fee_discount > 0) && (item.notes != 'Isento')
            ?
            <div>
              <CardFeature2 label="Concede isenção de:" value={`${item.fee_discount}%`} />
              <li>
                <div className='flex justify-between'>
                  <span className="ml-2">Precisa:</span>
                  
                    <span>                    
                      <ul className='text-gray-950 font-semibold'>
                        {item.get_conditions.map((item, index) => (
                          <li key={index} className='text-right'>{item}</li>
                        ))}
                      </ul>
                    </span>
                  
                </div>
              </li>
            </div>
            : 
            <div>
                <li>
                  <p>
                    <span className='inline-flex text-green-500'><FaCheck /></span>
                    <span className='text-gray-950 font-semibold ml-4'>Não há exigências.</span>
                  </p>
                </li>
            </div>} 
          </ul>
        ))}  
      </div>
    </CardDetailSection3>
  );
};

export default Zerofee;