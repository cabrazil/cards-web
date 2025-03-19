import React, { useState } from "react";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import CardDetailSection from "./CardDetailSection";
import { Separator_thin } from "../Separator_thin";

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
    }[];
  };
}

const VipLounges: React.FC<CardProps> = ({ cardDetail }) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <CardDetailSection
      title="Acesso às Salas VIP"
      icon={<Globe className="text-blue-500" />}
      className="text-md font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg"
    >
      <div className="text-gray-700">
        {cardDetail?.lounges.map((item) => (
          <motion.div
            key={item.id}
            className="bg-white shadow-lg rounded-lg p-4 mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{item.lounge_name}</h3>
              <button
                className="text-blue-600 text-sm"
                onClick={() =>
                  setExpanded(expanded === item.id ? null : item.id)
                }
              >
                {expanded === item.id ? "Esconder" : "Detalhes"}
              </button>
            </div>

            {expanded === item.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-2 text-sm"
              >
                <p>
                  <strong>Aeroportos nacionais:</strong> {item.br_airport.join(", ")}
                </p>
                <p>
                  <strong>Aeroportos internacionais:</strong> {item.int_airport}
                </p>
                <p>
                  <strong>Limite de acessos:</strong> {item.access_limit}
                </p>
                <p>
                  <strong>Condições:</strong> {item.conditions}
                </p>
                <Separator_thin />
              </motion.div>
            )}
          </motion.div>
        ))}

        {cardDetail.vip_lounge_app && (
          <p className="mt-4">
            <FaCheck className="text-green-500 inline mr-2" />
            Aplicativo disponível:{" "}
            <strong className="text-blue-600">{cardDetail.vip_lounge_app}</strong>
          </p>
        )}
      </div>
    </CardDetailSection>
  );
};

export default VipLounges;
