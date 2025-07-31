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
    requirements?: {
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
  <div className={`ml-2 flex justify-between items-center py-0.5 ${className}`}>
    <div className="flex items-center">
      <span className="text-sm text-white">{label}</span>
    </div>
    <div>
      <span className="text-white font-semibold text-sm">
        {typeof value === 'boolean' ? (value ? 'Sim' : 'Não') : value}
      </span>
    </div>
  </div>
);

// Componente principal Requirements
export const Requirements: React.FC<CardProps> = ({ cardDetail }) => {
  const [expanded, setExpanded] = useState(false);

  // Verificar se requirements existe
  if (!cardDetail.requirements) {
    return (
      <div className="rounded-lg border overflow-hidden shadow-md" style={{ backgroundColor: '#163D57', borderColor: '#FF9F1C' }}>
        <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Target className="text-white w-5 h-5" />
              <h3 className="text-white font-semibold text-base">Para obter o Cartão, Adicionais e Limite</h3>
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-white text-center">Informações de requisitos não disponíveis</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border overflow-hidden shadow-md w-full min-w-[600px] max-w-[700px]" style={{ backgroundColor: '#163D57', borderColor: '#FF9F1C' }}>
      {/* Header com título e ícone */}
      <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Target className="text-white w-5 h-5" />
            <h3 className="text-white font-semibold text-base">Para obter o Cartão, Adicionais e Limite</h3>
          </div>
          {cardDetail.requirements?.req_tips && cardDetail.requirements.req_tips.length > 0 && (
            <TooltipIcon 
              text={cardDetail.requirements.req_tips.join("\n")} 
              icon={<MessageCircleWarning className="text-white w-4 h-4" />} 
            />
          )}
        </div>
      </div>

      {/* Conteúdo do card */}
      <div className="p-4">
        {/* Botão para expandir/recolher */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full mb-4 px-3 py-2 border border-amber-500 text-white font-medium text-sm rounded-md hover:bg-amber-500/20 transition-colors duration-200"
        >
          {expanded ? "Ocultar Detalhes" : "Ver Detalhes"}
        </button>

        {/* Detalhes - sempre mostrar as informações principais e expandir adicionais */}
        <motion.div
          animate={{ height: expanded ? "auto" : "auto" }}
          className="space-y-0"
        >
          {/* Somente correntistas */}
          {cardDetail.requirements?.account_holder !== undefined && (
            <CardFeature2 label="Somente correntistas:" value={cardDetail.requirements.account_holder} />
          )}
          
          {/* Limite do cartão */}
          {cardDetail.requirements?.card_limit && (
            <CardFeature2 label="Limite do cartão:" value={cardDetail.requirements.card_limit} />
          )}

          {/* Detalhes expandidos */}
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2 pt-2 border-t border-gray-200 space-y-0"
            >
              {/* Condições */}
              {cardDetail.requirements?.get_conditions && cardDetail.requirements.get_conditions.length > 0 && (
                <div className="ml-2 py-0.5">
                  <div className="flex items-start">
                    <span className="text-sm text-white">Precisa de:</span>
                  </div>
                  <div className="ml-5 mt-1">
                    <ul className="space-y-1">
                      {cardDetail.requirements.get_conditions.map((item, index) => (
                        <li key={index} className="text-white font-semibold text-sm">• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Notas */}
              {cardDetail.requirements?.notes && cardDetail.requirements.notes.length > 0 && (
                <CardFeature2 label="Nota:" value={cardDetail.requirements.notes[0]} />
              )}

              {/* Cartões Adicionais */}
              {cardDetail.requirements?.add_cards_amount > 0 && (
                <div className="ml-2 flex justify-between items-center py-0.5">
                  <div className="flex items-center">
                    <FaCheck className={`mr-2 w-3 h-3 ${cardDetail.requirements.add_cards_amount >= 4 ? 'text-green-500' : 'text-yellow-500'}`} />
                    <span className="text-sm text-white">Cartões adicionais:</span>
                  </div>
                  <div>
                    <span className="text-white font-semibold text-sm">Até {cardDetail.requirements.add_cards_amount}</span>
                  </div>
                </div>
              )}

              {/* Obs Correntistas */}
              {cardDetail.requirements?.obs_add_cards && (
                <CardFeature2 label="Obs:" value={cardDetail.requirements.obs_add_cards} />
              )}

              {/* Valor mínimo por fatura */}
              {cardDetail.requirements?.add_cards_charge > 0 && (
                <div className="ml-2 py-0.5">
                  <div className="flex items-start">
                    <span className="text-sm text-white">Valor mínimo de fatura por adicional:</span>
                  </div>
                  <div className="ml-5 mt-1">
                    <span className="text-white font-semibold text-sm">{cardDetail.requirements.add_cards_charge}</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Requirements;