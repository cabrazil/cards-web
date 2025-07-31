import React, { useState } from 'react';
import { motion } from "framer-motion";
import { CalendarOff, MessageCircleWarning } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import { CurrencyFormatter } from "./CurrencyFormatter";
import { TooltipIcon } from "./TooltipIcon";
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

// Componente principal Zerofee
export const Zerofee: React.FC<ZerofeeProps> = ({ cardDetail }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border overflow-hidden shadow-md w-full min-w-[600px] max-w-[700px]" style={{ backgroundColor: '#163D57', borderColor: '#FF9F1C' }}>
      {/* Header com título e ícone */}
      <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CalendarOff className="text-white w-5 h-5" />
            <h3 className="text-white font-semibold text-base">Para isentar anuidade</h3>
          </div>
          {cardDetail.zerofees[0]?.fee_tips && cardDetail.zerofees[0].fee_tips.length > 0 && (
            <TooltipIcon 
              text={cardDetail.zerofees[0].fee_tips.join("\n")} 
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
          {/* Anuidade - sempre visível */}
          {(cardDetail.annual_fee > 0) ? (
            <div className="ml-2 flex justify-between items-center py-0.5">
              <div className="flex items-center">
                <FaCheck className="text-yellow-500 mr-2 w-3 h-3" />
                <span className="text-sm text-white">Anuidade de:</span>
              </div>
              <div className="text-white font-semibold text-sm">
                <CurrencyFormatter amount={cardDetail.annual_fee} />
                <span className="text-white"> (12 x <CurrencyFormatter amount={cardDetail.annual_fee / 12} />)</span>
              </div>
            </div>
          ) : (
            <div className="ml-2 flex justify-between items-center py-0.5">
              <div className="flex items-center">
                <FaCheck className="text-green-500 mr-2 w-3 h-3" />
                <span className="text-sm text-white">Anuidade:</span>
              </div>
              <span className="text-white font-semibold text-sm">Isento</span>
            </div>
          )}

          {/* Detalhes expandidos */}
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2 pt-2 border-t border-gray-200 space-y-0"
            >
              {/* Condições de isenção */}
              {cardDetail.zerofees.map((item) => (
                <div key={item.id}>
                  {(item.fee_discount > 0) && (item.notes !== 'Isento') ? (
                    <>
                      <CardFeature2 label="Concede isenção de:" value={`${item.fee_discount}%`} />
                      
                      {/* Condições necessárias */}
                      {item.get_conditions && item.get_conditions.length > 0 && (
                        <div className="ml-2 py-0.5">
                          <div className="flex items-start">
                            <span className="text-sm text-white">Precisa:</span>
                          </div>
                          <div className="ml-5 mt-1">
                            <ul className="space-y-1">
                              {item.get_conditions.map((condition, index) => (
                                <li key={index} className="text-white font-semibold text-sm">• {condition}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="ml-2 flex justify-between items-center py-0.5">
                      <div className="flex items-center">
                        <FaCheck className="text-green-500 mr-2 w-3 h-3" />
                        <span className="text-sm text-white">Não há exigências</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Zerofee;