import React from 'react';
import { CreditCard, FlagIcon } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import DateFormated from '../DateFormatedBr';
import CardDetailSection2  from './CardDetailSection2';
import { TooltipIcon } from '../TooltipIcon';

// Interfaces
interface CardProps {
  cardDetail: {
    updated_at:         string;
    international_card: boolean;
    card_modality:      string;
    card_brand:         string;
    category:           string;
    card_material:      string;
    ranking_benefits:   number;
    virtual_wallets:    string[];
    contactless:        boolean;
    iof_rate:           number;
    spread_rate:        number;
    ranking_vip_lounges: number;
    spread_on:          string;
    src_card_picture:   string;
    virtual_cards:      boolean;
    obs_summary:        string[];
    additional_info:    string[];
    is_debit:           boolean;
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
  icon=false, 
  className = ''
}) => (
  <div className={`ml-2 flex justify-between ${className}`}>
    <div className="flex">
      {/* {icon && (
        <span className={typeof value === 'boolean' ? (value ? 'text-green-500' : 'text-yellow-500') : 'text-green-500'}>
          <FaCheck />
        </span>
      )} */}
      {icon 
        ?
        <span className={typeof value === 'boolean' && value ? 'text-yellow-500' : 'text-green-500'}>
          <FaCheck />
        </span>
        :
        <span className={typeof value === 'boolean' && value ? 'text-green-500' : 'text-yellow-500'}>
          <FaCheck />
        </span>
      }
      <span>{label}</span>
    </div>
    <div>
      <span className="text-gray-950 font-semibold">
        {typeof value === 'boolean' ? (value ? 'Sim' : 'Não') : value}
      </span>
    </div>
  </div>
);

const CardFeature2: React.FC<CardFeatureProps> = ({ 
  label, 
  value, 
  className = ''
}) => (
  <div className={`ml-2 flex justify-between ${className}`}>
    <div className="flex">
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
    HIGHLIGHT: '#4169e1',
  };

  return (
    <CardDetailSection2
      title="Sobre o Cartão"
      icon={<CreditCard color={COLORS.HIGHLIGHT} />}
      className="text-md font-semibold"
      img={cardDetail.src_card_picture}
      icon2={<TooltipIcon text={cardDetail.obs_summary.join("\n")} icon={<FlagIcon />} />}
    >
      <div style={{ color: COLORS.TEXT_PRIMARY }}>
      {/* data de atualização da informação */}
        <div className='ml-2 flex justify-between'>
          <div>
            <span>Informações atualizadas em: </span>
          </div>
          <div>
            <span className="text-gray-950 font-semibold"><DateFormated data={cardDetail.updated_at} /></span>
          </div>
        </div>

        {/* Cartão Internacional */}
        {cardDetail.international_card
        ?
        <CardFeature label="Cartão Internacional:" value={cardDetail.international_card} />
        :
        <CardFeature label="Cartão Internacional:" value={cardDetail.international_card} icon={false} />}

        {/* Modalidade */}
        {(cardDetail.card_modality.length > 10)
        ?
        <div className='ml-2 flex justify-between'>
          <div>
            <span className='inline-flex text-green-500'><FaCheck /></span>
            <span>Modalidade:</span>
          </div>
          <div>
            <span className="text-gray-950 font-semibold">{cardDetail.card_modality}</span>
          </div>
        </div>
        :
        <CardFeature2 label="Modalidade:" value={cardDetail.card_modality} />}
        
        {/* Bandeira e categoria */}
        {(cardDetail.category === 'Black' || cardDetail.category === 'Infinite')
        ?
        <CardFeature label="Bandeira e categoria:" value={`${cardDetail.card_brand} ${cardDetail.category}`} icon />
        :
        <CardFeature label="Bandeira e categoria:" value={`${cardDetail.card_brand} ${cardDetail.category}`} />}

        {/* Material do cartão */}
        {cardDetail.card_material === 'Metal'
        ?
        <CardFeature label="Material do cartão:" value={cardDetail.card_material} icon />
        :
        <div className='ml-2 flex justify-between'>
          <div>
            <span>Material do cartão:</span>
          </div>
          <div>
            <span className="text-gray-950 font-semibold">{cardDetail.card_material}</span>
          </div>
        </div>}

        {/* Material do cartão */}
        {cardDetail.is_debit
        ?
        <CardFeature label="Aceito no débito:" value={"Sim"} icon />
        :
        <div className='ml-2 flex justify-between'>
          <div>
            <span>Aceito no débito:</span>
          </div>
          <div>
            <span className="text-gray-950 font-semibold">{"Não"}</span>
          </div>
        </div>}
        

        {/* Colocar se possui cartões virtuais */}
        {cardDetail.virtual_cards && (
          <CardFeature label="Aceita cartões virtuais:" value='Sim' className="ml-2" icon={true} />
        )}

        {/* Carteiras Digitais */}
        <div className="flex justify-between">
          <div>
            <span className="ml-2">Aceito nas carteiras digitais:</span>
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
        <CardFeature2 label="Pagar por aproximação:" value={cardDetail.contactless} />

        {/* IOF */}
        {cardDetail.iof_rate > 0
        ?
        <CardFeature label="IOF:" value={`${cardDetail.iof_rate}%`} icon={false} />
        :
        <CardFeature label="IOF:" value={`${cardDetail.iof_rate}%`} icon />}

        {/* Spread */}
        {(cardDetail.spread_rate < 5 )
        ?
        <CardFeature label="Spread:" value={`${cardDetail.spread_rate}%`} icon />
        :
        <CardFeature label="Spread:" value={`${cardDetail.spread_rate}%`} />}

        {/* Informações adicionais */}
        {cardDetail.additional_info && cardDetail.additional_info.length > 0 && (
          <div className="flex justify-between">
            <div>
              <span className="ml-4">Obs: </span>
            </div>
            <div>
              <ul className="text-gray-950 font-semibold text-right">
                {cardDetail.additional_info.map((info, index) => (
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