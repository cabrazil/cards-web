import React, { useState } from 'react';
import { motion } from "framer-motion";
import { CalendarOff, MessageCircleWarning } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import CurrencyFormatter from '../CurrencyFormatter';
import DivideNumber from '../DivideNumber';
import { TooltipIcon } from '../TooltipIcon';
import CardDetailSection2 from './CardDetailSection2';

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

// Componente reutilizável para exibir detalhes com ícone FaCheck
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
  const [expanded, setExpanded] = useState(false);

  const COLORS = {
    PRIMARY: '#1F3B4D',
    TEXT_PRIMARY: '#4b5563',
    HIGHLIGHT: '#4169e1',
    TEXT_TITLES: '#FFFFFF',
  };

  return (
    <CardDetailSection2
      title="Para isentar anuidade"
      icon={<CalendarOff color={COLORS.TEXT_TITLES} />}
      className="text-md font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg"
      icon2={cardDetail.zerofees[0]?.fee_tips[0]?.length > 0 
        ? <TooltipIcon text={cardDetail.zerofees[0].fee_tips.join("\n")} icon={<MessageCircleWarning />} /> 
        : <span></span> }
      title2=""
    >
      <motion.div
        className="relative flex flex-col items-center p-4 bg-white shadow-lg rounded-xl border border-gray-200"
        whileHover={{ scale: 1.05 }}
      >
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          {expanded ? "Ocultar Detalhes" : "Ver Detalhes"}
        </button>

        {/* Expansão de detalhes */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 text-gray-700 w-full text-sm"
          >
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
        </motion.div>
        )}
      </motion.div>
    </CardDetailSection2>
  );
};

export default Zerofee;