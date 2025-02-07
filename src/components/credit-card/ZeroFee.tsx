import React from 'react';
import { CalendarOff } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import  CardDetailSection  from './CardDetailSection';
import CurrencyFormatter from '../CurrencyFormatter';
import DivideNumber from '../DivideNumber';

// Interfaces
interface ZerofeeProps {
  cardDetail: {
    id:               string;
    annual_fee:       number;
    account_holder:   boolean;
    add_cards_amount: number;
    obs_add_cards:    string;
    add_cards_charge: number;
    card_limit:       string;
    zerofees: {
      id:             string;
      expenses:       string;
      investments:    string;
      fee_discount:   number;
      notes:          string;
      get_conditions: string[];
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
const CardFeature: React.FC<CardFeatureProps> = ({ 
  label, 
  value, 
  icon = false, 
  className = ''
}) => (
  <div className={`flex justify-between ${className}`}>
    <div className="flex">
      {icon && (
        <span className={typeof value === 'boolean' && value ? 'text-green-500' : 'text-yellow-500'}>
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

// Componente principal Zerofee
export const Zerofee: React.FC<ZerofeeProps> = ({ cardDetail }) => {
  const COLORS = {
    PRIMARY: '#1F3B4D',
    TEXT_PRIMARY: '#4b5563',
    HIGHLIGHT: '#4169e1',
  };

  return (
    <CardDetailSection
      title="Para isentar anuidade"
      icon={<CalendarOff color={COLORS.HIGHLIGHT} />}
      className='text-md font-semibold'
    >
      <div style={{ color: COLORS.TEXT_PRIMARY }}>
        {/* Anuidade */}
        {(cardDetail.annual_fee > 0)
          ?
          <div className='flex justify-between'>
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
          <ul>
            {(item.fee_discount > 0) && (item.notes != 'Isento')
            ?
            <div>
              <CardFeature label="Isenção de:" value={item.fee_discount} icon={true} />
              <li>
                <div className='flex justify-between'>
                  <p><span className="ml-4">Precisa de:</span></p>
                  <p>
                    <span>                    
                      <ul className='text-gray-950 font-semibold'>
                        {item.get_conditions.map((item) => (
                          <li className='ml-4 text-right'>{item}</li>
                        ))}
                      </ul>
                    </span>
                  </p>
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
    </CardDetailSection>
  );
};

export default Zerofee;