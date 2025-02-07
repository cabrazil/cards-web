import React from 'react';
import { Medal } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
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
  <div className={`ml-2 flex justify-between ${className}`}>
    <div className="flex">
      {icon && (
        <span className={typeof value === 'boolean' ? (value ? 'text-green-500' : 'text-yellow-500') : 'text-green-500'}>
          <FaCheck />
        </span>
      )}
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
  const COLORS = {
    PRIMARY: '#1F3B4D',
    TEXT_PRIMARY: '#4b5563',
    HIGHLIGHT: '#4169e1',
  };

  return (
    <CardDetailSection
      title="Benefícios da bandeira"
      icon={<Medal color={COLORS.HIGHLIGHT} />}
      className='text-md font-semibold'
    >
      <div style={{ color: COLORS.TEXT_PRIMARY }}>
        {/* Nome da Bandeira e variante */}
        {(cardDetail.category === 'Black' || cardDetail.category === 'Infinite')
        ?      
        <div className='ml-2 flex justify-between'>
          <div>
            <span className='inline-flex text-green-500'><FaCheck /></span>
            <span>Benefícios da bandeira:</span>
          </div>
          <div>
              <span className='text-gray-950 font-semibold'>{cardDetail.card_brand} {cardDetail.category}</span>
          </div>
        </div>
        :
        <div className='ml-2 flex justify-between'>
          <div>
            <span>Benefícios da bandeira:</span>
          </div>
          <div>
              <span className='text-gray-950 font-semibold'>{cardDetail.card_brand} {cardDetail.category}</span>
          </div>
        </div>}

        {/* Benefícios da Bandeira */}
        {cardDetail.brand.general_benefits?.length &&
          <div className='ml-2 flex justify-between'>
           <div>
             <span>Principais:</span>
           </div>
           <div>
             <span>                    
               <ul className='text-gray-950 font-semibold'>
                 {cardDetail.brand.general_benefits.map((item) => (
                   <li className='ml-4 text-right'>{item}</li>
                 ))}
               </ul>
             </span>
           </div>
         </div>}

        <CardFeature label="Mais detalhes no site:" value={cardDetail.brand.site_info} />
      </div>
    </CardDetailSection>
  );
};

export default BrandBenefits;