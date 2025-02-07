import React from 'react';
import { Gift } from 'lucide-react';
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
  <div className={`flex justify-between ${className}`}>
    <div className="flex">
      {icon && (
        <span className={typeof value === 'boolean' && value ? 'text-green-500' : 'text-yellow-500'}>
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

export const CardBenefits: React.FC<CardProps> = ({ cardDetail }) => {
  const COLORS = {
    PRIMARY: '#1F3B4D',
    TEXT_PRIMARY: '#4b5563',
    HIGHLIGHT: '#4169e1',
  };

  return (
    <CardDetailSection
      title="Benefícios Exclusivos"
      icon={<Gift color={COLORS.HIGHLIGHT} />}
      className='text-md font-semibold'
    >
      <div style={{ color: COLORS.TEXT_PRIMARY }}>
      {cardDetail.exclusives?.tag_name &&
        <CardFeature label="Tag pedágios:" value={cardDetail.exclusives.tag_name} icon />}

        {cardDetail.exclusives?.exclusive_offers?.length &&
          <div className='flex justify-between'>
            <p><span className="ml-4">Exclusivos: </span></p>
              <p>
                <span>                    
                  <ul className='text-gray-950 font-semibold'>
                    {cardDetail.exclusives.exclusive_offers.map((item) => (
                      <li className='ml-4 text-right'>{item}</li>
                    ))}
                  </ul>
                </span>
              </p>
          </div>}
        </div>
    </CardDetailSection>
  );
};

export default CardBenefits;