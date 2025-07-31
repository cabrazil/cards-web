import React, { useState } from "react";
import { Gem } from "lucide-react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import CardDetailSection from "./CardDetailSection";
import { DivideBy100 } from "./DivideBy100";
import { Separator_thin } from "./Separator_thin";

// Interfaces
interface CardProps {
  cardDetail: {
    id: string;
    card_name: string;
    ranking_points: number;
    points_expire: boolean;
    obs_system_points: string[];
    points_accelerator: boolean;
    rewards: {
      id: string;
      expenses: string;
      points_per_dollar: number;
      points_per_real: number;
      rules: string;
      points_limit: number;
      expiration: boolean;
      notes: string;
    }[];
  };
}

// Componente reutilizável para exibir detalhes com ícone FaCheck
const CardFeature: React.FC<{ label: string; value: React.ReactNode; icon?: boolean }> = ({
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

const Rewards: React.FC<CardProps> = ({ cardDetail }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className="rounded-lg border overflow-hidden shadow-md w-full min-w-[600px] max-w-[700px]" style={{ backgroundColor: '#163D57', borderColor: '#FF9F1C' }}>
      {/* Header com título e ícone */}
      <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Gem className="text-white w-5 h-5" />
            <h3 className="text-white font-semibold text-base">Pontuação do Cartão</h3>
          </div>
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
          {/* Ranking de pontos - sempre visível */}
          <div className="ml-2 flex justify-between items-center py-0.5">
            <div className="flex items-center">
              <FaCheck className="text-green-500 mr-2 w-3 h-3" />
              <span className="text-sm text-white">Ranking de pontos:</span>
            </div>
            <span className="text-white font-semibold text-sm">{cardDetail.ranking_points}</span>
          </div>

          {/* Acelerador de pontos - sempre visível */}
          <div className="ml-2 flex justify-between items-center py-0.5">
            <div className="flex items-center">
              <span className="text-sm text-white">Acelerador de pontos:</span>
            </div>
            <span className="text-white font-semibold text-sm">
              {cardDetail.points_accelerator ? "Sim" : "Não"}
            </span>
          </div>

          {/* Detalhes expandidos */}
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2 pt-2 border-t border-gray-200 space-y-0"
            >
              {/* Regras de pontuação */}
              {cardDetail?.rewards.map((item) => (
                <div key={item.id} className="mb-3">
                  <div className="ml-2 flex justify-between items-center py-0.5">
                    <div className="flex items-center">
                      <span className="text-sm text-white font-medium">{item.expenses}:</span>
                    </div>
                  </div>
                  
                  <CardFeature
                    label="Regra:"
                    value={`${item.rules} ${item.points_per_dollar} pontos por dólar`}
                    icon={item.points_per_dollar > 2.4}
                  />

                  {item.points_per_real > 100 && (
                    <CardFeature
                      label="Pontos por Real:"
                      value={<DivideBy100 amount={item.points_per_real} divisor={100} />}
                    />
                  )}

                  {item.expiration && (
                    <CardFeature 
                      label="Os pontos expiram?" 
                      value="Sim" 
                    />
                  )}

                  {item.notes && (
                    <CardFeature 
                      label="Notas:" 
                      value={item.notes} 
                    />
                  )}
                </div>
              ))}

              {/* Observações do sistema de pontos */}
              {cardDetail.obs_system_points && cardDetail.obs_system_points.length > 0 && (
                <div className="ml-2 flex justify-between items-center py-0.5">
                  <div className="flex items-center">
                    <span className="text-sm text-white">Observações:</span>
                  </div>
                  <div className="text-white font-semibold text-sm text-right max-w-xs">
                    {cardDetail.obs_system_points.map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Expiração geral dos pontos */}
              <CardFeature 
                label="Os pontos expiram?" 
                value={!cardDetail.points_expire ? "Não" : "Sim"} 
                icon={!cardDetail.points_expire} 
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Rewards;
