import React, { useState } from "react";
import { Plane } from "lucide-react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import CardDetailSection from "./CardDetailSection";
import { Separator_thin } from "./Separator_thin";

// Interfaces
interface CardProps {
  cardDetail: {
    id: string;
    card_name: string;
    mileages: {
      id: string;
      program_name: string;
      transfer_program: string[];
      airlines: string[];
      hotels: string[];
      rate_points_miles: number;
      min_transfer: number;
      exchange_store: string[];
      pay_bills: boolean;
      pay_cashback: boolean;
      other_options: string[];
    }[];
  };
}

// Componente reutilizável para exibir detalhes com ícone FaCheck
const CardFeature: React.FC<{ label: string; value: string | string[] | number | boolean; icon?: boolean }> = ({
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

const MilesProgram: React.FC<CardProps> = ({ cardDetail }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className="rounded-lg border overflow-hidden shadow-md" style={{ backgroundColor: '#163D57', borderColor: '#FF9F1C' }}>
      {/* Header com título e ícone */}
      <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Plane className="text-white w-5 h-5" />
            <h3 className="text-white font-semibold text-base">Programa de Milhas</h3>
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
          {/* Ranking do programa de milhas - sempre visível */}
          <div className="ml-2 flex justify-between items-center py-0.5">
            <div className="flex items-center">
              <FaCheck className="text-green-500 mr-2 w-3 h-3" />
              <span className="text-sm text-white">Ranking do programa:</span>
            </div>
            <span className="text-white font-semibold text-sm">{cardDetail.ranking_miles_program}</span>
          </div>

          {/* Detalhes expandidos */}
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2 pt-2 border-t border-gray-200 space-y-0"
            >
              {/* Programas de milhas */}
              {cardDetail?.mileages.map((item) => (
                <div key={item.id} className="mb-3">
                  <div className="ml-2 flex justify-between items-center py-0.5">
                    <div className="flex items-center">
                      <span className="text-sm text-purple-600 font-bold bg-purple-50 px-2 py-1 rounded-md border border-purple-200">{item.program_name}</span>
                    </div>
                  </div>
                  
                  <CardFeature
                    label="Transferência para Programas Parceiros:"
                    value={item.transfer_program.join(", ")}
                    icon={item.transfer_program.includes("Livelo") || item.transfer_program.includes("Esfera")}
                  />

                  <CardFeature
                    label="Companhias Aéreas Parceiras:"
                    value={item.airlines.join(", ")}
                    icon={item.airlines.length > 3}
                  />

                  {item.hotels.length > 0 && (
                    <CardFeature 
                      label="Hotéis Parceiros:" 
                      value={item.hotels.join(", ")} 
                    />
                  )}

                  <CardFeature
                    label="Pontos Convertidos em Cashback:"
                    value={item.pay_cashback}
                    icon={item.pay_cashback}
                  />

                  <CardFeature 
                    label="Pontos na Fatura:" 
                    value={item.pay_bills} 
                    icon={item.pay_bills} 
                  />

                  {item.other_options.length > 0 && (
                    <CardFeature 
                      label="Outras Opções:" 
                      value={item.other_options.join(", ")} 
                    />
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

export default MilesProgram;
