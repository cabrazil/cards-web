import React, { useState } from 'react';
import { Medal } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import CardDetailSection from './CardDetailSection';

// Interfaces
interface CardProps {
  cardDetail: {
    id:               string;
    card_name:        string;
    card_brand:       string;
    category:         string;
    exclusives: {
      id:               string;
      tag_name:         string;
      tag_amount:       number;
      exclusive_offers: string[];
      additional_info:  string[];
    };
    brand: {
      id:           string;
      brand_name:   string;
      variant_name: string;
      general_benefits: string[];
      isActive:     boolean;
      site_info:    string;
    };
  }
}

interface CardFeatureProps {
  label: string;
  value: string | number | boolean;
  icon?: boolean;
  className?: string;
}

const CardFeature: React.FC<CardFeatureProps> = ({ 
  label, 
  value, 
  icon = false, 
  className = ''
}) => (
  <div className={`ml-2 flex justify-between items-center py-0.5 ${className}`}>
    <div className="flex items-center">
      {icon && <FaCheck className="text-green-500 mr-2 w-3 h-3" />}
      <span className="text-sm text-white">{label}</span>
    </div>
    <div>
      <span className="text-white font-semibold text-sm">
        {typeof value === 'boolean' ? (value ? 'Sim' : 'Não') : value}
      </span>
    </div>
  </div>
);

export const BrandBenefits: React.FC<CardProps> = ({ cardDetail }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className="rounded-lg border overflow-hidden shadow-md w-full min-w-[600px] max-w-[700px]" style={{ backgroundColor: '#163D57', borderColor: '#FF9F1C' }}>
      {/* Header com título e ícone */}
      <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Medal className="text-white w-5 h-5" />
            <h3 className="text-white font-semibold text-base">Benefícios da Bandeira</h3>
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
          {/* Bandeira - sempre visível */}
          <div className="ml-2 flex justify-between items-center py-0.5">
            <div className="flex items-center">
              <FaCheck className="text-green-500 mr-2 w-3 h-3" />
              <span className="text-sm text-white">Bandeira:</span>
            </div>
            <span className="text-white font-semibold text-sm">{cardDetail.card_brand} {cardDetail.category}</span>
          </div>

          {/* Detalhes expandidos */}
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2 pt-2 border-t border-gray-200 space-y-0"
            >
              {/* Benefícios da Bandeira */}
              {cardDetail.brand.general_benefits && cardDetail.brand.general_benefits.length > 0 && (
                <div className="mb-3">
                  <div className="ml-2 flex justify-between items-center py-0.5">
                    <div className="flex items-center">
                      <span className="text-sm text-white font-medium">Benefícios Gerais:</span>
                    </div>
                  </div>
                  <ul className="ml-4 space-y-0">
                    {cardDetail.brand.general_benefits.map((benefit, index) => (
                      <li key={index} className="text-sm text-white py-0.5">
                        • {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Site da Bandeira */}
              {cardDetail.brand.site_info && cardDetail.brand.site_info.trim() !== "" && (
                <div className="mb-3">
                  <div className="ml-2 flex justify-between items-center py-0.5">
                    <div className="flex items-center">
                      <span className="text-sm text-white font-medium">Site Oficial:</span>
                    </div>
                  </div>
                  <div className="ml-5 mt-1">
                    <a 
                      href={cardDetail.brand.site_info} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-semibold underline"
                    >
                      {cardDetail.brand.site_info}
                    </a>
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

export default BrandBenefits;