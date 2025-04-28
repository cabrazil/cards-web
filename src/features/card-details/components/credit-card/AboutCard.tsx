import React, { useState } from "react";
import { CreditCard, MessageCircleWarning, NotebookText } from "lucide-react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import DateFormatedBr from "./DateFormatedBr";
import CardDetailSection2 from "./CardDetailSection2";
import { TooltipIcon } from "./TooltipIcon";

// Interfaces
interface CardProps {
  cardDetail: {
    updated_at: string;
    international_card: boolean;
    card_modality: string;
    card_brand: string;
    category: string;
    card_material: string;
    ranking_benefits: number;
    virtual_wallets: string[];
    contactless: boolean;
    iof_rate: number;
    spread_rate: number;
    ranking_vip_lounges: number;
    spread_on: string;
    src_card_picture: string;
    virtual_cards: boolean;
    obs_summary: string[];
    additional_info: string[];
    is_debit: boolean;
  };
}

// Componente reutilizável para exibir detalhes com ícone FaCheck
const CardFeature: React.FC<{ label: string; value: React.ReactNode; icon?: boolean }> = ({
  label,
  value,
  icon = false,
}) => (
  <div className="ml-2 flex justify-between">
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

const AboutCard: React.FC<CardProps> = ({ cardDetail }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <CardDetailSection2
      title="Sobre o Cartão"
      icon={<CreditCard className="text-white" />}
      className="text-md font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg"
      icon2={<TooltipIcon text={cardDetail.obs_summary.join("\n")} icon={<MessageCircleWarning />} />}
      title2=""
    >
      {/* Destacando a imagem do cartão */}
      <motion.div
        className="relative flex flex-col items-center p-4 bg-white shadow-lg rounded-xl border border-gray-200"
        whileHover={{ scale: 1.05 }}
      >
        <motion.img
          src={cardDetail.src_card_picture}
          alt="Cartão de Crédito"
          className="w-64 h-40 rounded-lg shadow-md"
          whileHover={{ rotateY: 10 }}
        />

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          {expanded ? "Ocultar Detalhes" : "Ver Detalhes"}
        </button>

        {/* Expansão de detalhes */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 text-gray-700 w-full text-sm"
          >
            <CardFeature label="Informações atualizadas em:" value={<DateFormatedBr data={cardDetail.updated_at} />} />
            <CardFeature label="Modalidade:" value={cardDetail.card_modality} icon={cardDetail.card_modality.length > 10} />
            <CardFeature
              label="Bandeira e Categoria:"
              value={`${cardDetail.card_brand} ${cardDetail.category}`}
              icon={cardDetail.category === "Black" || cardDetail.category === "Infinite"}
            />
            <CardFeature label="Material:" value={cardDetail.card_material} icon={cardDetail.card_material === "Metal"} />
            <CardFeature label="Cartão Internacional:" value={cardDetail.international_card} />
            <CardFeature label="Pagamentos por Aproximação:" value={cardDetail.contactless} />
            <CardFeature label="IOF:" value={`${cardDetail.iof_rate}%`} icon={cardDetail.iof_rate === 0} />
            <CardFeature label="Spread:" value={`${cardDetail.spread_rate}%`} icon={cardDetail.spread_rate < 5} />
            <CardFeature label="Aceito no Débito:" value={cardDetail.is_debit} icon={cardDetail.is_debit} />

            {cardDetail.virtual_cards && (
              <CardFeature label="Aceita cartões virtuais:" value="Sim" icon={true} />
            )}

            {cardDetail.virtual_wallets.length > 0 && (
              <div className="ml-2 flex justify-between">
                <div className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  <span>Aceito nas carteiras digitais:</span>
                </div>
                <ul className="text-gray-950 font-semibold display: inline-flex gap-2">
                  {cardDetail.virtual_wallets.map((wallet, index) => (
                    <li key={index} className="first:ml-2">{wallet}</li>
                  ))}
                </ul>
              </div>
            )}

            {cardDetail.additional_info.length > 0 && (
              <div className="flex justify-between">
                <div>
                  <span className="ml-4">Obs:</span>
                </div>
                <ul className="text-gray-950 font-semibold text-right">
                  {cardDetail.additional_info.map((info, index) => (
                    <li key={index} className="first:ml-2">{info}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </CardDetailSection2>
  );
};

export default AboutCard;