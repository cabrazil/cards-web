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
  <div className="flex justify-between items-center">
    <div className="flex items-center">
      {icon && <FaCheck className="text-green-500 mr-2" />}
      <span>{label}</span>
    </div>
    <div>
      <span className="text-gray-950 font-semibold">
        {typeof value === "boolean" ? (value ? "Sim" : "Não") : value}
      </span>
    </div>
  </div>
);

const MilesProgram: React.FC<CardProps> = ({ cardDetail }) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <CardDetailSection
      title="Programa de Milhas"
      icon={<Plane className="text-blue-500" />}
      className="text-md font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg"
    >
      <motion.div
        className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl border border-gray-200"
        whileHover={{ scale: 1.05 }}
      >
        <button
          onClick={() => setExpanded(expanded ? null : "all")}
          className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          {expanded ? "Ocultar Detalhes" : "Ver Programas de Milhas"}
        </button>

        {/* Expansão de detalhes */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 text-gray-700 w-full text-center text-sm space-y-2"
          >
            {cardDetail?.mileages.map((item) => (
              <motion.div
                key={item.id}
                className="bg-gray-50 p-4 rounded-lg shadow-md mb-3 w-full"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-lg font-semibold text-blue-600">{item.program_name}</p>

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
                  <CardFeature label="Hotéis Parceiros:" value={item.hotels.join(", ")} />
                )}

                <CardFeature
                  label="Pontos Convertidos em Cashback:"
                  value={item.pay_cashback}
                  icon={item.pay_cashback}
                />

                <CardFeature label="Pontos na Fatura:" value={item.pay_bills} icon={item.pay_bills} />

                {item.other_options.length > 0 && (
                  <CardFeature label="Outras Opções:" value={item.other_options.join(", ")} />
                )}

                <Separator_thin />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </CardDetailSection>
  );
};

export default MilesProgram;
