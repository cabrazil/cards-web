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

const Rewards: React.FC<CardProps> = ({ cardDetail }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <CardDetailSection
      title="Pontuação do Cartão"
      icon={<Gem className="text-blue-500" />}
      className="text-md font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg"
    >
      <motion.div
        className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl border border-gray-200"
        whileHover={{ scale: 1.05 }}
      >
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          {expanded ? "Ocultar Detalhes" : "Ver Pontuação"}
        </button>

        {/* Expansão de detalhes */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 text-gray-700 w-full text-center text-sm space-y-2"
          >
            {cardDetail?.rewards.map((item) => (
              <motion.div
                key={item.id}
                className="bg-gray-50 p-4 rounded-lg shadow-md mb-3 w-full"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-lg font-semibold text-blue-600">{item.expenses}</p>

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

                {item.expiration && <CardFeature label="Os pontos expiram?" value="Sim" />}

                {item.notes && <CardFeature label="Notas:" value={item.notes} />}

                <Separator_thin />
              </motion.div>
            ))}

            {cardDetail.obs_system_points.length > 0 && (
              <div className="mt-2">
                <p className="font-semibold">Observações:</p>
                <ul className="text-gray-950 font-medium text-center">
                  {cardDetail.obs_system_points.map((item, index) => (
                    <li key={index} className="mt-1">{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <CardFeature label="Os pontos expiram?" value={!cardDetail.points_expire ? "Não" : "Sim"} icon={!cardDetail.points_expire} />
          </motion.div>
        )}
      </motion.div>
    </CardDetailSection>
  );
};

export default Rewards;
