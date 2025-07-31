import React, { useState } from "react";
import { CircleDollarSign, MessageCircleWarning } from "lucide-react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { TooltipIcon } from "./TooltipIcon";

// Interfaces
interface CardProps {
  cardDetail: {
    id: string;
    card_name: string;
    contactless: boolean;
    cashbacks: {
      id: string;
      pct_cashback: number;
      txt_cashback: string;
      obs_cashback: string[];
      cash_tips: string[];
    }[];
  };
}

// Componente reutilizável para exibir detalhes com ícone FaCheck


const Cashback: React.FC<CardProps> = ({ cardDetail }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className="rounded-lg border overflow-hidden shadow-md w-full min-w-[600px] max-w-[700px]" style={{ backgroundColor: '#163D57', borderColor: '#FF9F1C' }}>
      {/* Header com título e ícone */}
      <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CircleDollarSign className="text-white w-5 h-5" />
            <h3 className="text-white font-semibold text-base">Cashback</h3>
          </div>
          {cardDetail?.cashbacks[0]?.cash_tips.length > 0 && (
            <TooltipIcon text={cardDetail.cashbacks[0].cash_tips.join("\n")} icon={<MessageCircleWarning />} />
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
          {/* Percentual de cashback - sempre visível */}
          {cardDetail?.cashbacks[0]?.pct_cashback > 0 && (
            <div className="ml-2 flex justify-between items-center py-0.5">
              <div className="flex items-center">
                <FaCheck className="text-green-500 mr-2 w-3 h-3" />
                <span className="text-sm text-white">Percentual de Cashback:</span>
              </div>
              <span className="text-white font-semibold text-sm">
                {cardDetail.cashbacks[0].pct_cashback}% {cardDetail.cashbacks[0].txt_cashback}
              </span>
            </div>
          )}

          {/* Detalhes expandidos */}
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2 pt-2 border-t border-gray-200 space-y-0"
            >
              {/* Observações do cashback */}
              {cardDetail?.cashbacks[0]?.obs_cashback.length > 0 && (
                <div className="mb-3">
                  <div className="ml-2 flex justify-between items-center py-0.5">
                    <div className="flex items-center">
                      <span className="text-sm text-white font-medium">Observações:</span>
                    </div>
                  </div>
                  <ul className="ml-4 space-y-0">
                    {cardDetail.cashbacks[0].obs_cashback.map((obs, index) => (
                      <li key={index} className="text-sm text-white py-0.5">
                        • {obs}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Cashback;
