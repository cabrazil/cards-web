import React, { useState } from "react";
import { CircleDollarSign, MessageCircleWarning } from "lucide-react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import CardDetailSection3 from "./CardDetailSection3";
import { TooltipIcon } from "../TooltipIcon";
import { Separator_thin } from "../Separator_thin";

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

const Cashback: React.FC<CardProps> = ({ cardDetail }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <CardDetailSection3
      title="Cashback"
      icon={<CircleDollarSign className="text-blue-500" />}
      className="text-md font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg"
      icon2={
        cardDetail?.cashbacks[0]?.cash_tips.length > 0 ? (
          <TooltipIcon text={cardDetail.cashbacks[0].cash_tips.join("\n")} icon={<MessageCircleWarning />} />
        ) : null
      }
    >
      <motion.div
        className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl border border-gray-200"
        whileHover={{ scale: 1.05 }}
      >
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          {expanded ? "Ocultar Detalhes" : "Ver Cashback"}
        </button>

        {/* Expansão de detalhes */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 text-gray-700 w-full text-center text-sm space-y-2"
          >
            {cardDetail?.cashbacks.map((item) => (
              <motion.div
                key={item.id}
                className="bg-gray-50 p-4 rounded-lg shadow-md mb-3 w-full"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-lg font-semibold text-blue-600">Cashback</p>

                {item.pct_cashback > 0 && (
                  <CardFeature label="Percentual de Cashback:" value={`${item.pct_cashback}% ${item.txt_cashback}`} icon={true} />
                )}

                {item.obs_cashback.length > 0 && (
                  <div className="mt-2">
                    <p className="font-semibold">Observações:</p>
                    <ul className="text-gray-950 font-medium text-center">
                      {item.obs_cashback.map((obs, index) => (
                        <li key={index} className="mt-1">{obs}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <Separator_thin />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </CardDetailSection3>
  );
};

export default Cashback;
