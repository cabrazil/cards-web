import React, { useState } from "react";
import { Globe, MessageCircleWarning } from "lucide-react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { Separator_thin } from "../Separator_thin";
import CardDetailSection2 from "./CardDetailSection2";
import { TooltipIcon } from "../TooltipIcon";

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

const VipLounges: React.FC<CardProps> = ({ cardDetail }) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const COLORS = {
    PRIMARY: '#1F3B4D',
    TEXT_PRIMARY: '#4b5563',
    HIGHLIGHT: '#4169e1',
    TEXT_TITLES: '#FFFFFF',
  };

  return (
    <CardDetailSection2
      title="Acesso às Salas VIP"
      icon={<Globe color={COLORS.TEXT_TITLES} />}
      className="text-md font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg"
      icon2={cardDetail.lounges[0].vip_tips[0]?.length > 0 
        ? <TooltipIcon text={cardDetail.lounges[0].vip_tips.join("\n")} icon={<MessageCircleWarning />} /> 
        : <span></span> }
title2=""
    >
      <motion.div
        className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl border border-gray-200"
        whileHover={{ scale: 1.05 }}
      >
        <button
          onClick={() => setExpanded(expanded ? null : "all")}
          className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          {expanded ? "Ocultar Detalhes" : "Ver Salas VIP"}
        </button>

        {/* Expansão de detalhes */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 text-gray-700 w-full text-center text-sm space-y-2"
          >
            {cardDetail?.lounges.map((item) => (
              <motion.div
                key={item.id}
                className="bg-gray-50 p-4 rounded-lg shadow-md mb-3 w-full"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-lg font-semibold text-blue-600">{item.lounge_name}</p>
                
                <CardFeature label="Aeroportos Nacionais:" value={item.br_airport.join(", ")} icon={!!item.br_airport.length} />
                <CardFeature label="Aeroportos Internacionais:" value={item.int_airport} icon={!!item.int_airport} />
                
                <CardFeature
                  label="Limite de Acessos:"
                  value={item.access_limit}
                  icon={cardDetail.ranking_vip_lounges > 2}
                />

                <CardFeature label="Condições:" value={item.conditions} />
                
                <CardFeature label="Acesso Gratuito:" value={!item.ispaid} icon={!item.ispaid} />
                
                <Separator_thin />
              </motion.div>
            ))}

            {cardDetail.vip_lounge_app && (
              <CardFeature label="Aplicativo Disponível:" value={cardDetail.vip_lounge_app} icon={true} />
            )}
          </motion.div>
        )}
      </motion.div>
    </CardDetailSection2>
  );
};

export default VipLounges;
