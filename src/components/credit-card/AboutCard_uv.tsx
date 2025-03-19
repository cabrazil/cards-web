import React, { useState } from "react";
import { CreditCard, NotebookText } from "lucide-react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import DateFormated from "../DateFormatedBr";
import CardDetailSection2 from "./CardDetailSection2";
import { TooltipIcon } from "../TooltipIcon";

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

const AboutCard: React.FC<CardProps> = ({ cardDetail }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <CardDetailSection2
      title="Sobre o Cartão"
      icon={<CreditCard className="text-blue-500" />}
      className="text-md font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg"
      icon2={<TooltipIcon text={cardDetail.obs_summary.join("\n")} icon={<NotebookText />} />}
    >
      {/* Destacando a imagem do cartão */}
      <motion.div
        className="relative flex flex-col items-center p-6 bg-white shadow-lg rounded-xl border border-gray-200"
        whileHover={{ scale: 1.05 }}
      >
        {/* Ícone no canto superior direito */}
        <div className="absolute top-2 right-2 text-gray-600">
          <TooltipIcon text="Informações adicionais" icon={<NotebookText size={20} />} />
        </div>

        <motion.img
          src={cardDetail.src_card_picture}
          alt="Cartão de crédito"
          className="w-64 h-40 rounded-lg shadow-md mb-4"
          whileHover={{ rotateY: 10 }}
        />

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          {expanded ? "Ocultar Detalhes" : "Ver Detalhes"}
        </button>

        {/* Expansão de detalhes */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 text-gray-700 w-full text-center text-sm space-y-2"
          >
            <p className="font-semibold flex justify-center items-center">
              <FaCheck className="text-green-500 mr-2" />
              Atualizado em: <DateFormated data={cardDetail.updated_at} />
            </p>
            <p className="flex justify-center items-center">
              <FaCheck className="text-green-500 mr-2" />
              <strong>Modalidade:</strong> {cardDetail.card_modality}
            </p>
            <p className="flex justify-center items-center">
              <FaCheck className="text-green-500 mr-2" />
              <strong>Bandeira e Categoria:</strong> {cardDetail.card_brand} {cardDetail.category}
            </p>
            <p className="flex justify-center items-center">
              <FaCheck className="text-green-500 mr-2" />
              <strong>Material:</strong> {cardDetail.card_material}
            </p>
            <p className="flex justify-center items-center">
              <FaCheck className="text-green-500 mr-2" />
              <strong>Cartão Internacional:</strong> {cardDetail.international_card ? "Sim" : "Não"}
            </p>
            <p className="flex justify-center items-center">
              <FaCheck className="text-green-500 mr-2" />
              <strong>Pagamentos por Aproximação:</strong> {cardDetail.contactless ? "Sim" : "Não"}
            </p>
            <p className="flex justify-center items-center">
              <FaCheck className="text-green-500 mr-2" />
              <strong>Carteiras Digitais:</strong> {cardDetail.virtual_wallets.join(", ")}
            </p>
            <p className="flex justify-center items-center">
              <FaCheck className="text-green-500 mr-2" />
              <strong>IOF:</strong> {cardDetail.iof_rate}%
            </p>
            <p className="flex justify-center items-center">
              <FaCheck className="text-green-500 mr-2" />
              <strong>Spread:</strong> {cardDetail.spread_rate}%
            </p>

            {cardDetail.additional_info.length > 0 && (
              <div className="mt-2">
                <p className="font-semibold">Observações:</p>
                <ul className="text-gray-950 font-medium text-center">
                  {cardDetail.additional_info.map((info, index) => (
                    <li key={index} className="mt-1">{info}</li>
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
