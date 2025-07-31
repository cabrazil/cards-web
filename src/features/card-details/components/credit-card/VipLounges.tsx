import React, { useState } from "react";
import { Globe, MessageCircleWarning } from "lucide-react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { TooltipIcon } from "./TooltipIcon";

// Interfaces
interface CardProps {
  cardDetail: {
    id: string;
    ranking_vip_lounges: number;
    vip_lounge_app: string;
    lounges: {
      id: string;
      lounge_name: string;
      br_airport: string[];
      int_airport: string;
      access_limit: string;
      conditions: string;
      ispaid: boolean;
      vip_tips: string[];
    }[];
  };
}

// Componente reutilizável para exibir detalhes com ícone FaCheck
const CardFeature: React.FC<{ label: string; value: string | number | boolean; icon?: boolean }> = ({
  label,
  value,
  icon = false,
}) => (
  <div className="ml-2 flex justify-between items-center py-0.5">
    <div className="flex items-center">
      {icon && <FaCheck className="text-green-500 mr-2 w-3 h-3" />}
      <span className="text-sm text-white">{label}</span>
    </div>
    <div>
      <span className="text-white font-semibold text-sm">
        {typeof value === "boolean" ? (value ? "Sim" : "Não") : value}
      </span>
    </div>
  </div>
);

const VipLounges: React.FC<CardProps> = ({ cardDetail }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className="rounded-lg border overflow-hidden shadow-md w-full min-w-[600px] max-w-[700px]" style={{ backgroundColor: '#163D57', borderColor: '#FF9F1C' }}>
      {/* Header com título e ícone */}
      <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className="text-white w-5 h-5" />
            <h3 className="text-white font-semibold text-base">Acesso às Salas VIP</h3>
          </div>
          {cardDetail.lounges[0]?.vip_tips[0]?.length > 0 && (
            <TooltipIcon text={cardDetail.lounges[0].vip_tips.join("\n")} icon={<MessageCircleWarning />} />
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
          {/* Ranking das salas VIP - sempre visível */}
          <div className="ml-2 flex justify-between items-center py-0.5">
            <div className="flex items-center">
              <FaCheck className="text-green-500 mr-2 w-3 h-3" />
              <span className="text-sm text-white">Ranking das salas VIP:</span>
            </div>
            <span className="text-white font-semibold text-sm">{cardDetail.ranking_vip_lounges}</span>
          </div>

          {/* Detalhes expandidos */}
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2 pt-2 border-t border-gray-200 space-y-0"
            >
              {/* Salas VIP */}
              {cardDetail?.lounges.map((item) => (
                <div key={item.id} className="mb-3">
                  <div className="ml-2 flex justify-between items-center py-0.5">
                    <div className="flex items-center">
                      <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-200">{item.lounge_name}</span>
                    </div>
                  </div>
                  
                  {item.br_airport.length > 0 && (
                    <CardFeature 
                      label="Aeroportos Nacionais:" 
                      value={item.br_airport.join(", ")} 
                      icon={!!item.br_airport.length} 
                    />
                  )}
                  
                  {item.int_airport && item.int_airport.trim() !== "" && (
                    <CardFeature 
                      label="Aeroportos Internacionais:" 
                      value={item.int_airport} 
                      icon={!!item.int_airport} 
                    />
                  )}
                  
                  <div className="ml-2 py-0.5">
                    <div className="flex items-start">
                      <FaCheck className="text-green-500 mr-2 w-3 h-3 mt-0.5" />
                      <span className="text-sm text-white">Limite de Acessos:</span>
                    </div>
                    <div className="ml-5 mt-1">
                      <span className="text-white font-semibold text-sm">{item.access_limit}</span>
                    </div>
                  </div>

                  {item.conditions && item.conditions.trim() !== "" && (
                    <div className="ml-2 py-0.5">
                      <div className="flex items-start">
                        <span className="text-sm text-white">Condições:</span>
                      </div>
                      <div className="ml-5 mt-1">
                        <span className="text-white font-semibold text-sm">{item.conditions}</span>
                      </div>
                    </div>
                  )}
                  
                  <CardFeature 
                    label="Acesso Gratuito:" 
                    value={!item.ispaid} 
                    icon={!item.ispaid} 
                  />
                </div>
              ))}

              {/* Aplicativo disponível */}
              {cardDetail.vip_lounge_app && (
                <CardFeature 
                  label="Aplicativo Disponível:" 
                  value={cardDetail.vip_lounge_app} 
                  icon={true} 
                />
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default VipLounges;
