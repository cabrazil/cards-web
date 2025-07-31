import React, { useState } from "react";
import { Gift } from "lucide-react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";


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

const CardBenefits: React.FC<CardProps> = ({ cardDetail }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className="rounded-lg border overflow-hidden shadow-md w-full min-w-[600px] max-w-[700px]" style={{ backgroundColor: '#163D57', borderColor: '#FF9F1C' }}>
      {/* Header com título e ícone */}
      <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Gift className="text-white w-5 h-5" />
            <h3 className="text-white font-semibold text-base">Benefícios Exclusivos</h3>
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
          {/* Tag de Pedágios - sempre visível */}
          {cardDetail.exclusives?.tag_name && (
            <div className="ml-2 flex justify-between items-center py-0.5">
              <div className="flex items-center">
                <FaCheck className="text-green-500 mr-2 w-3 h-3" />
                <span className="text-sm text-white">Tag de Pedágios:</span>
              </div>
              <span className="text-white font-semibold text-sm">{cardDetail.exclusives.tag_name}</span>
            </div>
          )}

          {/* Detalhes expandidos */}
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2 pt-2 border-t border-gray-200 space-y-0"
            >
              {/* Quantidade de Tags */}
              {cardDetail.exclusives?.tag_amount && cardDetail.exclusives.tag_amount > 2 && (
                <CardFeature 
                  label="Quantidade de Tags:" 
                  value={`Até ${cardDetail.exclusives.tag_amount}`} 
                  icon={true} 
                />
              )}

              {/* Ofertas Exclusivas */}
              {cardDetail.exclusives?.exclusive_offers && cardDetail.exclusives.exclusive_offers.length > 0 && (
                <div className="mb-3">
                  <div className="ml-2 flex justify-between items-center py-0.5">
                    <div className="flex items-center">
                      <span className="text-sm text-white font-medium">Ofertas Exclusivas:</span>
                    </div>
                  </div>
                  <ul className="ml-4 space-y-0">
                    {cardDetail.exclusives.exclusive_offers.map((offer, index) => (
                      <li key={index} className="text-sm text-white py-0.5">
                        • {offer}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Informações Adicionais */}
              {cardDetail.exclusives?.additional_info && cardDetail.exclusives.additional_info.length > 0 && (
                <div className="mb-3">
                  <div className="ml-2 flex justify-between items-center py-0.5">
                    <div className="flex items-center">
                      <span className="text-sm text-white font-medium">Informações Adicionais:</span>
                    </div>
                  </div>
                  <ul className="ml-4 space-y-0">
                    {cardDetail.exclusives.additional_info.map((info, index) => (
                      <li key={index} className="text-sm text-white py-0.5">
                        • {info}
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

export default CardBenefits;
