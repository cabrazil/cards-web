import React, { useState } from "react";
import { CreditCard, MessageCircleWarning, NotebookText } from "lucide-react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import DateFormatedBr from "./DateFormatedBr";
import CardDetailSection2 from "./CardDetailSection2";
import { TooltipIcon } from "./TooltipIcon";
import { theme, getThemeClasses } from "../../../../shared/theme/theme";

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

const AboutCard: React.FC<CardProps> = ({ cardDetail }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border overflow-hidden shadow-md w-full min-w-[600px] max-w-[700px]" style={{ backgroundColor: '#163D57', borderColor: '#FF9F1C' }}>
      {/* Header com título e ícone */}
      <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CreditCard className="text-white w-5 h-5" />
            <h3 className="text-white font-semibold text-base">Sobre o Cartão</h3>
          </div>
          {cardDetail.obs_summary && cardDetail.obs_summary.length > 0 && (
            <TooltipIcon 
              text={cardDetail.obs_summary.join("\n")} 
              icon={<MessageCircleWarning className="text-white w-4 h-4" />} 
            />
          )}
        </div>
      </div>

      {/* Conteúdo do card */}
      <div className="p-4">
        {/* Imagem do cartão centralizada */}
        <div className="flex justify-center mb-4">
          <motion.img
            src={cardDetail.src_card_picture}
            alt="Cartão de Crédito"
            className="w-40 h-24 rounded-md shadow-sm object-cover"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
        </div>

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
          {/* Informações atualizadas */}
          <CardFeature 
            label="Informações atualizadas em:" 
            value={<DateFormatedBr data={cardDetail.updated_at} />} 
          />
          
          {/* Modalidade */}
          <CardFeature 
            label="Modalidade:" 
            value={cardDetail.card_modality} 
            icon={!!(cardDetail.card_modality && cardDetail.card_modality.length > 10)} 
          />
          
          {/* Bandeira e Categoria */}
          <CardFeature
            label="Bandeira e Categoria:"
            value={`${cardDetail.card_brand} ${cardDetail.category}`}
            icon={cardDetail.category === "Black" || cardDetail.category === "Infinite"}
          />
          
          {/* Internacional */}
          <CardFeature 
            label="Cartão Internacional:" 
            value={cardDetail.international_card} 
          />
          
          {/* IOF */}
          <CardFeature 
            label="IOF:" 
            value={`${cardDetail.iof_rate}%`} 
            icon={cardDetail.iof_rate === 0} 
          />
          
          {/* Spread */}
          <CardFeature 
            label="Spread:" 
            value={`${cardDetail.spread_rate}%`} 
            icon={cardDetail.spread_rate < 5} 
          />
          
          {/* Débito */}
          <CardFeature 
            label="Aceito no Débito:" 
            value={cardDetail.is_debit} 
            icon={cardDetail.is_debit} 
          />

          {/* Detalhes expandidos */}
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2 pt-2 border-t border-gray-200 space-y-0"
            >
              {/* Material */}
              <CardFeature 
                label="Material:" 
                value={cardDetail.card_material} 
                icon={cardDetail.card_material === "Metal"} 
              />
              
              {/* Contactless */}
              <CardFeature 
                label="Pagamentos por Aproximação:" 
                value={cardDetail.contactless} 
              />

              {/* Cartões virtuais */}
              {cardDetail.virtual_cards && (
                <CardFeature 
                  label="Aceita cartões virtuais:" 
                  value="Sim" 
                  icon={true} 
                />
              )}

              {/* Carteiras virtuais */}
              {cardDetail.virtual_wallets && cardDetail.virtual_wallets.length > 0 && (
                <div className="ml-2 flex justify-between items-center py-0.5">
                  <div className="flex items-center">
                    <FaCheck className="text-green-500 mr-2 w-3 h-3" />
                    <span className="text-sm text-white">Aceito nas carteiras digitais:</span>
                  </div>
                  <div className="text-white font-semibold text-sm flex gap-1 flex-wrap">
                    {cardDetail.virtual_wallets.map((wallet, index) => (
                      <span key={index}>{wallet}{index < cardDetail.virtual_wallets.length - 1 ? ',' : ''}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Informações adicionais */}
              {cardDetail.additional_info && cardDetail.additional_info.length > 0 && (
                <div className="ml-2 py-0.5">
                  <div className="flex items-start">
                    <span className="text-sm text-white">Obs:</span>
                  </div>
                  <div className="ml-5 mt-1">
                    {cardDetail.additional_info.map((info, index) => (
                      <div key={index} className="text-white font-semibold text-sm mb-1">{info}</div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutCard;