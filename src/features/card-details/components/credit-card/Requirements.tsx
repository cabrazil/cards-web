import React, { useState } from 'react';
import { motion } from "framer-motion";
import { MessageCircleWarning, Target } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import CardDetailSection2 from './CardDetailSection2';
import { TooltipIcon } from './TooltipIcon';

// Interfaces
interface CardProps {
  cardDetail: {
    id:                 string;
    card_name:          string;
    requirements: {
      id:               string;
      account_holder:   boolean;
      add_cards_amount: number;
      obs_add_cards:    string;
      add_cards_charge: number;
      card_limit:       string;
      get_conditions:   string[];
      notes:            string[];
      req_tips:         string[];
    }
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

// Componente principal Requirements
export const Requirements: React.FC<CardProps> = ({ cardDetail }) => {
  const [expanded, setExpanded] = useState(false);
  const COLORS = {
    PRIMARY: '#1F3B4D',
    TEXT_PRIMARY: '#4b5563',
    HIGHLIGHT: '#4169e1',
    TEXT_TITLES: '#FFFFFF',
  };

  return (
    <CardDetailSection2
      title="Para obter o Cartão, Adicionais e Limite"
      icon={<Target color={COLORS.TEXT_TITLES} />}
      className="text-md font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg"
      icon2={cardDetail.requirements.req_tips[0]?.length > 0 
              ? <TooltipIcon text={cardDetail.requirements.req_tips.join("\n")} icon={<MessageCircleWarning />} /> 
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
      
          <CardFeature2 label="Somente correntistas:" value={cardDetail.requirements.account_holder} />
          
          {/* Condições - Agora com verificação adicional */}
          {cardDetail.requirements?.get_conditions && cardDetail.requirements.get_conditions.length > 0 && (
            <div className='flex justify-between'>
              <div>
                <span className="ml-2">Precisa de:</span>
              </div>
              <div>            
                <ul className='text-gray-950 font-semibold'>
                  {cardDetail.requirements.get_conditions.map((item, index) => (
                    <li key={index} className='ml-4 text-right'>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {cardDetail.requirements?.notes && 
            <CardFeature2
              label="Nota:" value={cardDetail.requirements.notes[0]} />
          }

          {/* Cartões Adicionais */}
          <div className='ml-2 flex justify-between'>
            {cardDetail.requirements.add_cards_amount === 0
              ? <span></span>
              : cardDetail.requirements.add_cards_amount >= 4
                ?
                <>
                  <div className='flex'>
                    <span className='text-green-500'><FaCheck /></span>
                    <span>Cartões adicionais: </span>
                  </div>
                  <div>
                    <span className="text-gray-950 font-semibold">Até {cardDetail.requirements.add_cards_amount}</span>
                  </div>
                </>
                :
                <>
                  <div className='flex'>
                    <span className='text-yellow-500'><FaCheck /></span>
                    <span>Cartões adicionais: </span>
                  </div>
                  <div>
                    <span className="text-gray-950 font-semibold">Até {cardDetail.requirements.add_cards_amount}</span>
                  </div>
                </>
            }
          </div>

          {/* Obs Correntistas - Com verificação */}
          {cardDetail.requirements?.obs_add_cards && (
            <CardFeature2 label="Obs:" value={cardDetail.requirements.obs_add_cards} />
          )}

          {/* Valor mínimo por fatura */}
          {cardDetail.requirements.add_cards_charge > 0 && (
            <div className='flex justify-between'>
              <div>
                <span className="ml-4">Valor mínimo de fatura por adicional: </span>
              </div>
              <div>
                <span className="text-gray-950 font-semibold">{cardDetail.requirements.add_cards_charge}</span>
              </div>
            </div>
          )}
          <CardFeature2 label="Limite do cartão:" value={cardDetail.requirements.card_limit} />
        </motion.div>
      )}
      </motion.div>
    </CardDetailSection2>
  );
};

export default Requirements;