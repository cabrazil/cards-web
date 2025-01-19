import { CreditCard, TicketPlus, Award, Globe, Gift, FileText, CircleDollarSign, CalendarOff } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api'
import { FaCheck } from 'react-icons/fa';
import CurrencyFormatter from './CurrencyFormatter';
import DivideNumber from './DivideNumber';

type CreditCardProps = {
  id:                    string;
  created_at:            string;
  updated_at:            string;
  card_name:             string;
  annual_fee:            number;
  card_brand:            string;
  category:              string;
  card_limit:            string;
  ranking_points:        number;
  ranking_benefits:      number;
  ranking_annuity:       number;
  ranking_miles_program: number;
  virtual_wallets:       string[];
  add_cards_amount:      number;
  add_cards_charge:      number;
  card_material:         string;
  contactless:           boolean;
  get_conditions:        string[];
  spread_on:             string;
  cashback:              string;
  obs_add_cards:         string;
  obs_cashback:          string[];
  account_holder:        boolean;
  international_card:    boolean;
  card_modality:         string;
  vip_lounge_app:        string;
  spread_rate:           number;
  iof_rate:              number;
  ranking_vip_lounges:   number;
  src_card_picture:      string;
  segment:               string;
  issuer_name:           string;
  zerofees: {
    id:             string;
    expenses:       string;
    investments:    string;
    fee_discount:   number;
    notes:          string;
    get_conditions: string[];
  }[];
  rewards: {
    id:                 string;
    expenses:           string;
    points_per_dollar:  number;
    points_per_real:    number;
    rules:              string;
    points_limit:       number;
    expiration:         boolean;
    notes:              string;
  }[];
  mileages: {
    id:                string;
    program_name:      string;
    transfer_program:  string[];
    airlines:          string[];
    hotels:            string[];
    rate_points_miles: number;
    min_transfer:      number;
    exchange_store:    string[];
    pay_bills:         boolean;
    pay_cashback:      boolean;
    other_options:     string[];
  }[];
  lounges: {
    id:           string;
    lounge_name:  string;
    br_airport:   string[];
    int_airport:  string;
    access_limit: string;
    conditions:   string;
    ispaid:       boolean;
  }[];
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
  issuer: {
    id:          string;
    issuer_name: string;
    issuer_type: string;
    created_at:  string;
  };
  brandId:               string;
  issuerId:              string;
};

interface CardDetailSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

interface CardDetailSectionProps2 {
  title: string;
  icon: ReactNode;
  img: string;
  children: ReactNode;
  className?: string;
}

const COLORS = {
  PRIMARY: '#1F3B4D',       
  SECUNDARY: '#d1d5db',    // Cinza-300
  HIGHLIGHT: '#4169e1',    // #FF9000
  BACKGROUND: '#F5F5F5',
  TEXT_PRIMARY: '#4b5563',  //#333333
  TEXT_SECONDARY: '#030712' //#666666
};

const CardDetailSection = ({ title, icon, children, className = '' }: CardDetailSectionProps) => (
  <div 
    className={`card-section p-2 rounded-lg mb-4 shadow-sm ${className}`}
    style={{ 
      backgroundColor: 'white', 
      borderLeftColor: COLORS.HIGHLIGHT,
      borderLeftWidth: '2px',
      borderBottomColor: COLORS.HIGHLIGHT,
      borderBottomWidth: '2px'
    }}
  >
    <div className="flex items-center mb-2">
      {icon}
      <h3 
        className="text-lg font-semibold ml-2"
        style={{ color: COLORS.TEXT_PRIMARY }}
      >
        {title}
      </h3>
    </div>
    {children}
  </div>
);

const CardDetailSection2 = ({ title, icon, img, children, className = '' }: CardDetailSectionProps2) => (
  <div 
    className={`card-section p-2 rounded-lg mb-4 shadow-sm ${className}`}
    style={{ 
      backgroundColor: 'white', 
      borderLeftColor: COLORS.HIGHLIGHT,
      borderLeftWidth: '2px',
      borderBottomColor: COLORS.HIGHLIGHT,
      borderBottomWidth: '2px'
    }}
  >
    <div className="flex mb-2 justify-between">
      <div className='flex items-center'>
        {icon}
          <h3 
            className="text-lg font-semibold ml-2"
            style={{ color: COLORS.TEXT_PRIMARY }}
          >
            {title}
          </h3>
      </div>
      <div>
        <img className='w-[10rem] h-[6rem]' src={img} alt="cartão de crédito" />
      </div>
      
    </div>
    {children}
  </div>
);

export const CreditCardDetails: React.FC<{ cardId: string }> = ({ cardId }) => {
  const [cardDetail, setCardDetail] = useState<CreditCardProps | null>(null);

  /* async function loadCards() {
    const response = await api.get(`/cardid?id=${cardId}`);
    setCardDetail(response.data);
  } */
    
  /* useEffect(() => {
    try {
      if (cardId) {
        loadCards();
      } else {
        setCardDetail(null);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes do cartão de crédito:', error);
    }
  }, [cardId]); */

  const loadCards = async () => {
    try {
      console.log('Fazendo requisição para a API com cardId:', cardId);
      const response = await api.get(`/cardid?id=${cardId}`);
      console.log('Resposta da API:', response.data);
      setCardDetail(response.data);
    } catch (error) {
      console.error('Erro ao buscar detalhes do cartão de crédito:', error);
      setCardDetail(null);
    }
  }

  useEffect(() => {
    console.log('CardId recebido:', cardId);
    if (cardId) {
      loadCards();
    } else {
      setCardDetail(null);
    }
  }, [cardId]);
  
  return (
    
    <div className='grid md:grid-cols-2 gap-3'>
      {cardDetail ? (
        <><section className="credit-card-details gap-4">
          
          <div>
            <CardDetailSection2
              title="Sobre o Cartão"
              icon={<FileText color={COLORS.PRIMARY} />}
              className='text-md font-semibold'
              img={cardDetail.src_card_picture}
            >
              <div style={{ color: COLORS.TEXT_PRIMARY }}> 
                <div className='flex justify-between'>
                  {cardDetail.international_card
                  ?
                  <>
                    <div className='flex'>
                      <span className='text-green-500'><FaCheck /></span>
                      <span>Cartão Internacional: </span>
                    </div>
                    <div>
                      <span className="text-gray-950 font-semibold">Sim</span>
                    </div>
                  </>
                  :
                  <>
                    <span className='text-yellow-500'><FaCheck /></span>
                    <span>Cartão Internacional: </span>
                    <span className="text-gray-950 font-semibold">Não</span>
                  </>}
                </div>

                <div className='flex justify-between'>
                {cardDetail.card_modality.length > 6
                  ?
                  <>
                    <div className='flex'>
                      <span className='text-green-500'><FaCheck /></span>
                      <span>Modalidade: </span>
                    </div>
                    <div>
                      <span className="text-gray-950 font-semibold">{cardDetail.card_modality}</span>
                    </div>
                  </>
                  :
                  <>
                    <div className='flex'>
                      <span className='text-yellow-500'><FaCheck /></span>
                      <span>Modalidade: </span>
                    </div>
                    <div className="">
                      <span className="text-gray-950 font-semibold">{cardDetail.card_modality}</span>
                    </div>
                  </>}
                </div>

                <div className="flex justify-between">
                  <span className="ml-4">Bandeira e variante: </span>
                  <span className='text-gray-950 font-semibold'>{cardDetail.card_brand} {cardDetail.category}</span>
                </div>

                <div className="flex justify-between">
                  <span className="ml-4">Material do cartão: </span>
                  <span className='text-gray-950 font-semibold'>{cardDetail.card_material}</span>
                </div>

                <div className='flex justify-between'>
                  <div>
                   <span className="ml-4">Aceito nas Carteiras Digitais:</span>
                  </div>
                  <div>
                    <ul className='text-gray-950 font-semibold display: inline-flex gap-2'>
                     {cardDetail.virtual_wallets.map((item) => (
                       <li className='first:ml-2'>{item}</li>
                     ))}
                    </ul>
                  </div>
                </div>

                <div className='flex justify-between'>
                  {cardDetail.contactless
                   ?
                  <>
                   <div className='flex'>
                     <span className='text-green-500'><FaCheck /></span>
                      <span>Pagar por aproximação: </span>
                    </div>
                    <div>
                      <span className="text-gray-950 font-semibold">Sim</span>
                    </div>
                  </>
                  :
                  <>
                    <div className='flex'>
                     <span className='text-yellow-500'><FaCheck /></span>
                     <span>Pagar por aproximação: </span>
                    </div>
                    <div>
                      <span className="text-gray-950 font-semibold">Não</span>
                    </div>
                  </>}
                </div>

                <div className='flex justify-between'>
                  {cardDetail.iof_rate > 0 &&
                  <>
                   <div>
                      <span className='ml-4'>IOF: </span>
                    </div>
                    <div>
                      <span className="text-gray-950 font-semibold">{cardDetail.iof_rate}%</span>
                    </div>
                  </>}
                </div>

                <div className='flex justify-between'>
                  {cardDetail.spread_rate > 0 &&
                  <>
                   <div>
                      <span className='ml-4'>Spread: </span>
                    </div>
                    <div>
                      <span className="text-gray-950 font-semibold">{cardDetail.spread_on}</span>
                    </div>
                  </>}
                </div>

                {(cardDetail.exclusives?.additional_info?.length) &&
                <div className='flex justify-between'>                   
                  <div>
                    <span className="ml-4">Obs: </span>
                  </div>
                  <div>
                    <ul className='text-gray-950 font-semibold text-right'>
                      {cardDetail.exclusives.additional_info.map((item) => (
                        <li className='first:ml-2'>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                </div>}
              </div>
            </CardDetailSection2>

            {(cardDetail.ranking_points > 0)
            ?
            <CardDetailSection
              title="Pontuação do Cartão"
              icon={<TicketPlus color={COLORS.PRIMARY} />}
              className='text-md font-semibold'
            >
              <div style={{ color: COLORS.TEXT_PRIMARY }}>
                {cardDetail.rewards.map((item) => (
                  <ul><li>
                      {item.points_per_dollar > 0  &&
                      <><div className='flex justify-between'>
                          <span className='ml-4'>{item.expenses}:</span>
                          <span className='text-gray-950 font-semibold text-right'>{item.rules} {item.points_per_dollar} pontos por dólar</span>
                      </div></>}

                      {item.points_per_real > 0  &&
                      <><div className='flex justify-between'>
                          <span className='ml-4'>{item.expenses}:</span>
                          <span className='text-gray-950 font-semibold text-right'>{item.rules} {item.points_per_real} pontos por real</span>
                      </div></>}

                      
                      {(!item.expiration)
                      ?
                      <div className='flex justify-between'>
                        <div>
                          <span className='inline-flex text-green-500'><FaCheck /></span>
                          <span>Pontos expiram: </span>
                        </div>
                        <div>
                            <span className='text-gray-950 font-semibold text-right'>Não</span>
                        </div>
                      </div>
                      :
                      <div className='flex justify-between'>
                        <div>
                          <span className='inline-flex text-yellow-500'><FaCheck /></span>
                          <span>Pontos expiram: </span>
                        </div>
                        <div>
                            <span className='text-gray-950 font-semibold text-right'>Sim</span>
                        </div>
                      </div>}

                      {item.notes &&
                      <div className="flex justify-between">
                        <span className="ml-4">Notas: </span>
                        <span className='text-gray-950 font-semibold'>{item.notes}</span>
                      </div>}
                      
                    </li></ul>
                ))}
              </div>
            </CardDetailSection>
            :
            <CardDetailSection
              title="Pontuação do Cartão"
              icon={<TicketPlus color={COLORS.PRIMARY} />}
              className='text-md font-semibold flex justify-between'
            >
              <span className='text-gray-950 font-semibold text-right'>Não oferece</span>
            </CardDetailSection>}

            {(cardDetail.ranking_miles_program > 0) &&
            <CardDetailSection
              title="Programa de Milhas"
              icon={<Award color={COLORS.PRIMARY} />}
              className='text-md font-semibold'
            >
              <div style={{ color: COLORS.TEXT_PRIMARY }}>

                {cardDetail.mileages.map((item) => (

                  <ul>
                    <li>
                    {(item.transfer_program[0] == 'Livelo')
                      ?
                      <div className="flex justify-between">
                        <div>
                          <span className='inline-flex text-green-500'><FaCheck /></span>
                          <span>Programa:</span>
                        </div>
                        <span className=" text-gray-950 font-semibold">{item.program_name || 'Não especificado'}</span>
                      </div>
                      :
                      <div className="flex justify-between">
                        <span className='ml-4'>Programa:</span>
                        <span className=" text-gray-950 font-semibold">{item.program_name || 'Não especificado'}</span>
                      </div>}

                      <div className='flex justify-between'>
                        <span className="ml-4">Pontos podem ser transferidos para: </span>
                        <span className=" text-gray-950 font-semibold">{item.transfer_program || 'Não especificado'}</span>
                      </div>

                      {item.airlines[0] &&
                      <div className="flex justify-between">
                        <span className='ml-4'>Para companhias aéreas:</span>
                        <span className="text-gray-950 font-semibold">{item.airlines}</span>
                      </div>}

                      {item.hotels[0] &&
                      <div className="flex justify-between">
                        <span className='ml-4'>Para hotéis:</span>
                        <span className="text-gray-950 font-semibold">{item.hotels || 'Não transfere'}</span>
                      </div>}

                      {item.pay_bills &&
                      <div className='flex justify-between'>
                        <span className="ml-4">Pontos(cashback) para a fatura: </span>
                        <span className='text-gray-950 font-semibold ml-4'>Sim</span>
                      </div>}

                      {item.pay_cashback &&
                      <div className='flex justify-between'>
                        <span className="ml-4">Pontos(cashback) para a conta corrente: </span>
                        <span className='text-gray-950 font-semibold ml-4'>Sim</span>
                      </div>}

                      {item.other_options &&
                      <div className='flex justify-between'>
                        <span className="ml-4">Outros: </span>
                        <span className='ml-4 text-gray-950 font-semibold text-right'>{item.other_options}</span>
                    </div>}

                    </li>
                  </ul>
                ))}
              </div>
            </CardDetailSection>}

            <CardDetailSection
              title="Benefícios da Bandeira e Exclusivos"
              icon={<Gift color={COLORS.PRIMARY} />}
              className='text-md font-semibold'
            >
              <div style={{ color: COLORS.TEXT_PRIMARY }}>
                {cardDetail.exclusives?.tag_name &&
                <div className='flex justify-between'>
                <div>
                  <span className='inline-flex text-green-500'><FaCheck /></span>
                  <span>Tag pedágios: </span>
                </div>
                <div>
                    <span className='text-gray-950 font-semibold ml-4'>{cardDetail.exclusives.tag_name}</span>
                </div>
               </div>}

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

                  <div className='flex justify-between'>
                <div>
                  <span className='inline-flex text-green-500'><FaCheck /></span>
                  <span>Benefícios da bandeira: </span>
                </div>
                <div>
                    <span className='text-gray-950 font-semibold ml-4'>{cardDetail.card_brand} {cardDetail.category}</span>
                </div>
               </div>

                <div className="flex justify-between">
                  <span className='ml-4'>Site:</span>
                  <a href='test.com' className="text-gray-950 font-semibold">{cardDetail.brand.site_info}</a>
                </div>
              </div>
            </CardDetailSection>
          </div>
        </section>

        <section className="credit-card-details gap-4">
          <div>
            <CardDetailSection
              title="Para obter o Cartão"
              icon={<CreditCard color={COLORS.PRIMARY} />}
              className='text-md font-semibold'
            >
              <div style={{ color: COLORS.TEXT_PRIMARY }}>
                <div className='flex justify-between'>
                  {cardDetail.account_holder
                    ?
                    <>
                      <div>
                        <span className='ml-4'>Somente correntistas: </span>
                      </div>
                      <div>
                        <span className="text-gray-950 font-semibold">Sim</span>
                      </div>
                    </>
                    :
                    <>
                      <span className='ml-4'>Somente correntistas: </span>
                      <span className="text-gray-950 font-semibold">Não</span>
                    </>}
                </div>

                <div className='flex justify-between'>
                  <p><span className="ml-4">Precisa de:</span></p>
                  <p>
                    <span>                    
                      <ul className='text-gray-950 font-semibold'>
                        {cardDetail.get_conditions.map((item) => (
                          <li className='ml-4 text-right'>{item}</li>
                        ))}
                      </ul>
                    </span>
                  </p>
                </div>

                <div className='flex justify-between'>
                 {(cardDetail?.zerofees[0]?.notes) &&
                  <><p>
                    <span className="ml-4">Obs: </span></p><p>
                      <span>
                        <ul className='text-gray-950 font-semibold'>
                          {cardDetail.zerofees.map((item) => (
                            <li className='ml-4 text-right'>{item.notes}</li>
                          ))}
                      </ul>
                    </span>
                  </p></>}
                </div>

                <div className='flex justify-between'>
                  {cardDetail.add_cards_amount === 0
                    ? <span></span>
                    : cardDetail.add_cards_amount >=4
                      ?
                      <>
                        <div className='flex'>
                         <span className='text-green-500'><FaCheck /></span>
                         <span>Cartões adicionais: </span>
                        </div>
                        <div>
                          <span className="text-gray-950 font-semibold">Até {cardDetail.add_cards_amount}</span>
                        </div>
                      </>
                      :
                      <>
                        <div className='flex'>
                          <span className='text-yellow-500'><FaCheck /></span>
                          <span>Cartões adicionais: </span>
                        </div>
                        <div>
                        <span className="text-gray-950 font-semibold">Até {cardDetail.add_cards_amount}</span>
                        </div>
                    </>}
                </div>

                {cardDetail?.obs_add_cards &&
                <div className='flex justify-between'>
                  <span className="ml-4">Obs.: </span>
                  <span className="text-gray-950 font-semibold text-right">{cardDetail.obs_add_cards}</span>
                </div>}
                  
                <div className='flex justify-between'>
                  {cardDetail.add_cards_charge > 0 &&
                    <>
                      <div>
                        <span className="ml-4">Valor mínimo de fatura por adicional: </span>
                      </div>
                      <div>
                        <span className="text-gray-950 font-semibold">{cardDetail.add_cards_charge}</span>
                      </div>
                    </>} 
                </div>

                <div className="flex justify-between">
                  <span className='ml-4'>Limite do cartão:</span>
                  <span className="text-gray-950 font-semibold">{cardDetail.card_limit || 'Não oferece'}</span>
                </div>

              </div>
            </CardDetailSection>

            <CardDetailSection
              title="Para isentar Anuidade"
              icon={<CalendarOff color={COLORS.PRIMARY} />}
              className='text-md font-semibold'
            >
              <div style={{ color: COLORS.TEXT_PRIMARY }}>
                
                {(cardDetail.annual_fee > 0)
                  ?
                  <div className='flex justify-between'>
                    <><div>
                      <span className='inline-flex text-yellow-500'><FaCheck /></span>
                      <span>Anuidade de: </span>
                      
                    </div>
                    <div>
                      <span className='text-gray-950 font-semibold'><CurrencyFormatter amount={cardDetail.annual_fee} /></span>
                      <span className='text-gray-950 font-semibold'> (12 x <DivideNumber amount={cardDetail.annual_fee} divisor={12} />)</span>
                    </div></> 
                  </div>
                  :
                  <div className='flex justify-between'>
                    <div>
                      <span className='inline-flex text-green-500'><FaCheck /></span>
                      <span>Anuidade: </span>
                    </div>
                    <span className='text-gray-950 font-semibold'>Isento</span>
                  </div>}

                <ul> 
                  {cardDetail.zerofees.map((item) => (
                    <div>
                      {(item.fee_discount > 0) && (item.notes != 'Isento')
                        ?
                        <div>
                          <li>
                            <div className='flex justify-between'>
                              <span className='ml-4'>Isenção de: </span>
                              <span className='text-gray-950 font-semibold'>{item.fee_discount}%</span>
                            </div>

                            <div className='flex justify-between'>
                              <p><span className="ml-4">Precisa de:</span></p>
                              <p>
                                <span>                    
                                  <ul className='text-gray-950 font-semibold'>
                                    {item.get_conditions.map((item) => (
                                      <li className='ml-4 text-right'>{item}</li>
                                    ))}
                                  </ul>
                                </span>
                              </p>
                            </div>

                          </li>
                        </div>
                        : 
                        <div>
                            <li>
                              <p>
                                <span className='inline-flex text-green-500'><FaCheck /></span>
                                <span className='text-gray-950 font-semibold ml-4'>Não há exigências.</span>
                              </p>
                            </li>
                        </div>}
                      </div>    
                      ))}
                </ul>

              </div>
            </CardDetailSection>

            {cardDetail.cashback &&
            <CardDetailSection
              title="Cashback"
              icon={<CircleDollarSign color={COLORS.PRIMARY} />}
              className='text-md font-semibold'
            >
              <div style={{ color: COLORS.TEXT_PRIMARY }}>
                
                {cardDetail?.obs_cashback.length
                  ?
                  <div className='flex justify-between'>
                    <div>
                      <span className='inline-flex text-green-500'><FaCheck /></span>
                      <span>Percentual de: </span>
                    </div>
                    <div>
                      <span className='text-gray-950 font-semibold text-right'>{cardDetail.cashback}</span>
                    </div>
                  </div>
                  :
                  <div className='flex justify-between'>
                    <span className="ml-4">Percentual de: </span>
                    <span className='text-gray-950 font-semibold text-right'>{cardDetail.cashback}</span>
                  </div>}

                  {cardDetail?.obs_cashback &&
                  <div className='flex justify-between'>
                    <p><span className="ml-4">Obs: </span></p>
                      <p>
                        <span>                    
                          <ul className='text-gray-950 font-semibold'>
                            {cardDetail.obs_cashback.map((item) => (
                              <li className='ml-4 text-right'>{item}</li>
                            ))}
                          </ul>
                        </span>
                      </p>
                  </div>}
              </div>
            </CardDetailSection>}

            {(cardDetail.ranking_vip_lounges > 0) &&
            <CardDetailSection
              title="Acesso às Salas VIP"
              icon={<Globe color={COLORS.PRIMARY} />}
              className='text-md font-semibold'
            >
              <div style={{ color: COLORS.TEXT_PRIMARY }}>

              {cardDetail.vip_lounge_app &&
              <div className="flex justify-between">
                <span className='ml-4'>Aplicativo:</span>
                <span className="text-gray-950 font-semibold">{cardDetail.vip_lounge_app}</span>
              </div>}

              {cardDetail.lounges.map((item) => (

                <ul>
                  <li>
                  {!item.ispaid
                    ?
                    <div className="flex justify-between">
                      <div>    
                        <span className='ml-4'>Sala:</span>
                      </div>
                      <span className="text-gray-950 font-semibold">{item.lounge_name}</span>
                    </div>
                    :
                    <div className="flex justify-between">
                      <div>
                        <span className='inline-flex text-red-600'><FaCheck /></span>
                        <span>Sala:</span>
                      </div>
                      <span className="text-gray-950 font-semibold">{item.lounge_name}</span>
                    </div>}

                  {item?.br_airport[0] &&
                  <div className='flex justify-between'>
                    
                      <span className='ml-4'>Aeroportos nacionais:</span>
                      <span className="ml-4 text-gray-950 font-semibold text-right">{item.br_airport}</span>
                    
                  </div>}

                  {item?.int_airport[0] &&
                  <div className="flex justify-between">
                    <span className='ml-4'>Aeroportos internacionais:</span>
                    <span className="text-gray-950 font-semibold">{item.int_airport}</span>
                  </div>}

                  {item.access_limit &&
                  <div className='flex justify-between'>
                    <span className="ml-4">Limite de acessos: </span>
                    <span className='text-gray-950 font-semibold ml-4'>{item.access_limit}</span>
                  </div>}

                  {(item.conditions.length) &&
                  
                  <div className='flex justify-between'>
                    <span className="ml-4">Condições: </span>
                    <span className='ml-4 text-gray-950 font-semibold text-right'>{item.conditions}</span>
                  </div>}
                  </li>
                </ul>
                ))}
              </div>
            </CardDetailSection>}

          </div>

        </section></>
      ) : (
        <p>Carregando detalhes do cartão de crédito...</p>
      )}
  </div>
  );
};