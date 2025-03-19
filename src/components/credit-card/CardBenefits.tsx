import React, { useState } from "react";
import { Gift } from "lucide-react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import CardDetailSection from "./CardDetailSection";
import { Separator_thin } from "../Separator_thin";

// Interfaces
interface CardProps {
  cardDetail: {
    id: string;
    card_name: string;
    card_brand: string;
    category: string;
    exclusives?: {
      id: string;
      tag_name: string;
      tag_amount: number;
      exclusive_offers: string[];
      additional_info: string[];
    };
    brand: {
      id: string;
      brand_name: string;
      variant_name: string;
      general_benefits: string[];
      isActive: boolean;
      site_info: string;
    };
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

const CardBenefits: React.FC<CardProps> = ({ cardDetail }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <CardDetailSection
      title="Benefícios Exclusivos"
      icon={<Gift className="text-blue-500" />}
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
          {expanded ? "Ocultar Benefícios" : "Ver Benefícios"}
        </button>

        {/* Expansão de detalhes */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 text-gray-700 w-full text-center text-sm space-y-2"
          >
            {cardDetail.exclusives?.tag_name && (
              <CardFeature label="Tag de Pedágios:" value={cardDetail.exclusives.tag_name} icon />
            )}

            {cardDetail.exclusives?.tag_amount && cardDetail.exclusives.tag_amount > 2 && (
              <CardFeature label="Quantidade de Tags:" value={`Até ${cardDetail.exclusives.tag_amount}`} icon />
            )}

            {cardDetail.exclusives?.exclusive_offers?.[0]?.length && (
              <div className="mt-2">
                <p className="font-semibold">Ofertas Exclusivas:</p>
                <ul className="text-gray-950 font-medium text-center">
                  {cardDetail.exclusives?.exclusive_offers.map((offer, index) => (
                    <li key={index} className="mt-1">{offer}</li>
                  ))}
                </ul>
              </div>
            )}

            {cardDetail.exclusives?.additional_info[0]?.length && (
              <div className="mt-2">
                <p className="font-semibold">Informações Adicionais:</p>
                <ul className="text-gray-950 font-medium text-center">
                  {cardDetail.exclusives?.additional_info.map((info, index) => (
                    <li key={index} className="mt-1">{info}</li>
                  ))}
                </ul>
              </div>
            )}

            <Separator_thin />
          </motion.div>
        )}
      </motion.div>
    </CardDetailSection>
  );
};

export default CardBenefits;
