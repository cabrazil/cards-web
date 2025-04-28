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
  <div className={`flex justify-between items-center ${className}`}>
    <div className="flex items-center">
      {icon && <FaCheck className="text-green-500 mr-2" />}
      <span>{label}</span>
    </div>
    <div>
      <span className="text-gray-950 font-semibold">
        {typeof value === 'boolean' ? (value ? 'Sim' : 'Não') : value}
      </span>
    </div>
  </div>
);

export const BrandBenefits: React.FC<CardProps> = ({ cardDetail }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <CardDetailSection
      title="Benefícios da bandeira"
      icon={<Medal className="text-blue-500" />}
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
            {/* Nome da Bandeira e variante */}
            <CardFeature 
              label="Bandeira:" 
              value={`${cardDetail.card_brand} ${cardDetail.category}`} 
              icon={cardDetail.category === 'Black' || cardDetail.category === 'Infinite'}
            />

            {/* Benefícios da Bandeira */}
            {cardDetail.brand.general_benefits?.length > 0 && (
              <div className="mt-2">
                <p className="font-semibold">Benefícios Gerais:</p>
                <ul className="text-gray-950 font-medium text-center">
                  {cardDetail.brand.general_benefits.map((benefit, index) => (
                    <li key={index} className="mt-1">{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Site da Bandeira */}
            {cardDetail.brand.site_info && (
              <div className="mt-2">
                <p className="font-semibold">Site Oficial:</p>
                <a 
                  href={cardDetail.brand.site_info} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  {cardDetail.brand.site_info}
                </a>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </CardDetailSection>
  );
};

export default BrandBenefits;