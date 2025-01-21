import React from 'react';
import { FileText } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import  CardDetailSection2  from './CardDetailSection2';

// Interfaces
interface CardProps {
  cardDetail: {
    international_card: boolean;
    card_modality: string;
    card_brand: string;
    category: string;
    card_material: string;
    virtual_wallets: string[];
    contactless: boolean;
    iof_rate: number;
    spread_rate: number;
    spread_on: string;
    src_card_picture: string;
    exclusives?: {
      additional_info?: string[];
    };
  };
}

interface CardFeatureProps {
  label: string;
  value: string | number | boolean;
  icon?: boolean;
  className?: string;
}

// Componente de Feature reutilizável
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

// Componente principal AboutCard
export const AboutCard: React.FC<CardProps> = ({ cardDetail }) => {
  const COLORS = {
    PRIMARY: '#1F3B4D',
    TEXT_PRIMARY: '#4b5563',
  };

  return (
    <CardDetailSection2
      title="Sobre o Cartão"
      icon={<FileText color={COLORS.PRIMARY} />}
      className="text-md font-semibold"
      img={cardDetail.src_card_picture}
    >
      <div style={{ color: COLORS.TEXT_PRIMARY }}> 
        {/* Cartão Internacional */}
        <CardFeature 
          label="Cartão Internacional:"
          value={cardDetail.international_card}
          icon
        />

        {/* Modalidade */}
        <CardFeature 
          label="Modalidade:"
          value={cardDetail.card_modality}
          icon
        />

        {/* Bandeira e variante */}
        <CardFeature 
          label="Bandeira e variante:"
          value={`${cardDetail.card_brand} ${cardDetail.category}`}
          className="ml-4"
        />

        {/* Material do cartão */}
        <CardFeature 
          label="Material do cartão:"
          value={cardDetail.card_material}
          className="ml-4"
        />

        {/* Carteiras Digitais */}
        <div className="flex justify-between">
          <div>
            <span className="ml-4">Aceito nas Carteiras Digitais:</span>
          </div>
          <div>
            <ul className="text-gray-950 font-semibold display: inline-flex gap-2">
              {cardDetail.virtual_wallets.map((wallet, index) => (
                <li key={index} className="first:ml-2">{wallet}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pagamento por aproximação */}
        <CardFeature 
          label="Pagar por aproximação:"
          value={cardDetail.contactless}
          icon
        />

        {/* IOF */}
        {cardDetail.iof_rate > 0 && (
          <CardFeature 
            label="IOF:"
            value={`${cardDetail.iof_rate}%`}
            className="ml-4"
          />
        )}

        {/* Spread */}
        {cardDetail.spread_rate > 0 && (
          <CardFeature 
            label="Spread:"
            value={cardDetail.spread_on}
            className="ml-4"
          />
        )}

        {/* Informações adicionais */}
        {cardDetail.exclusives?.additional_info && cardDetail.exclusives.additional_info.length > 0 && (
          <div className="flex justify-between">
            <div>
              <span className="ml-4">Obs: </span>
            </div>
            <div>
              <ul className="text-gray-950 font-semibold text-right">
                {cardDetail.exclusives.additional_info.map((info, index) => (
                  <li key={index} className="first:ml-2">{info}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </CardDetailSection2>
  );
};

export default AboutCard;