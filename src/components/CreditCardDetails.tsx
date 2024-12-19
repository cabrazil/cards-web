import { CreditCard, TicketPlus, Award, Globe, Gift, FileText, CircleDollarSign, CalendarOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../services/api'
import { FaCheck } from 'react-icons/fa';

interface CreditCardProps{
  id: string;
  created_at:            string;
  updated_at:            string;
  card_name:             string;
  issuer_name:           string;
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
  obs_cashback:          string;
  account_holder:        boolean;
  international_card:    boolean;
  card_modality:         string;
  vip_lounge_app:        string;
  spread_rate:           number;
  iof_rate:              number;
  ranking_vip_lounges:   number;
  src_card_picture:      string;
  brandId:               string;
  issuerId:              string;
  zerofees: [{
    id: string
    expenses: string;
    investments: string;
    fee_discount: number;
    notes: string;
    get_conditions: string[];
  }]
  rewards: [{
    id: string;
    expenses: string;
    points_per_dollar: number;
    points_per_real: number;
    rules: string;
    points_limit: number;
    expiration: boolean;
    notes: string;
  }]
  mileages: [{
    id: string;
    program_name: string;
    transfer_program:  string[];
    airlines:          string[];
    hotels:            string[]
    rate_points_miles: number;
    min_transfer:      number;
    exchange_store:    string[];
    pay_bills:         boolean;
    pay_cashback:      boolean;
    other_options:     string[];
  }]
  lounges: [{
    id:           string;
    lounge_name:  string;
    br_airport:   string[];
    int_airport:  string;
    access_limit: string;
    conditions:   string;
  }]
  exclusives: {
    id: string;
    tag_name: string;
    tag_amount: number;
    exclusive_offers: string[];
    additional_info: string[];
  }
  brand: {
    id: string;
    brand_name: string;
    variant_name: string;
    general_benefits: [];
    isActive: boolean;
    site_info: string;
  }
  issuer: {
    id:          string;
    issuer_name: string;
    issuer_type: string;
    created_at:  string;
  }
}

const COLORS = {
  PRIMARY: '#1F3B4D',
  SECUNDARY: '#d1d5db',    // Cinza-300
  HIGHLIGHT: '#FF9000',
  BACKGROUND: '#F5F5F5',
  TEXT_PRIMARY: '#4b5563',  //#333333
  TEXT_SECONDARY: '#030712' //#666666
};

const CardDetailSection = ({ title, icon, children, className = '' }) => (
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

export const CreditCardDetails: React.FC<{ cardId: string }> = ({ cardId }) => {
  const [cardDetail, setCardDetail] = useState<CreditCardProps | null>(null);

  async function loadCards() {
    const response = await api.get(`/cardid?id=${cardId}`);
    setCardDetail(response.data);
  }
    
  useEffect(() => {
    try {
      if (cardId) {
        loadCards();
      } else {
        setCardDetail(null);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes do cartão de crédito:', error);
    }
  }, [cardId]);

  return (
    
    <div className='grid md:grid-cols-2 gap-3'>

      {cardDetail ? (

        <><section className="credit-card-details gap-4">

          <div>
            <CardDetailSection
              title="Sobre o Cartão"
              icon={<FileText color={COLORS.PRIMARY} />}
              className='text-md font-semibold'
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
                      <div className="">
                        <span className=" text-gray-950 font-semibold">Sim</span>
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
                      <div className="">
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
                  <span className="ml-4">Bandeira: </span>
                  <span className='text-gray-950 font-semibold'>{cardDetail.card_brand}</span>
                  
                </div>
                <div className="flex justify-between">
                  <span className="ml-4">Variante: </span>
                  <span className='text-gray-950 font-semibold'>{cardDetail.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="ml-4">Material do cartão: </span>
                  <span className='text-gray-950 font-semibold'>{cardDetail.card_material}</span>
                </div>

                <div className='flex justify-between'>
                  {cardDetail.contactless
                    ?
                    <>
                      <div className='flex'>
                        <span className='text-green-500'><FaCheck /></span>
                        <span>Pagar por aproximação: </span>
                      </div>
                      <div className="">
                        <span className="text-gray-950 font-semibold">Sim</span>
                      </div>
                    </>
                    :
                    <>
                      <div className='flex'>
                        <span className='text-yellow-500'><FaCheck /></span>
                        <span>Pagar por aproximação: </span>
                      </div>
                      <div className="">
                        <span className="text-gray-950 font-semibold">Não</span>
                      </div>
                    </>}
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
                </div>
              
            </CardDetailSection>

            <CardDetailSection
              title="Pontuação do Cartão"
              icon={<TicketPlus color={COLORS.PRIMARY} />}
              className='text-md font-semibold'
            >
              <div style={{ color: COLORS.TEXT_PRIMARY }}
                  className='flex justify-between'
              >
               {cardDetail.rewards.map((item) => (
                  <div className="flex justify-between">
                    <ul className='flex'> 
                      <li>
                        <span className='ml-4'>{item.expenses}</span>        
                        {item.rules &&
                          <div className=''>
                            <span className='ml-4 text-gray-950 font-semibold'>{item.rules}</span>
                          </div>}

                          <div className='ml-4'>
                            {item.points_per_dollar > 0
                            ?
                            <div className='flex justify-between'>
                              <span> Pontos por dolar: </span>
                              <span className='text-gray-950 font-semibold'>{item.points_per_dollar}</span>
                            </div>
                            :
                            <>
                              <span className='ml-4'> Pontos por real: </span>
                              <span className='text-gray-950 font-semibold'>{item.points_per_real}</span>
                            </>}
                          </div>
                        
                        {(!item.expiration)
                        ?
                        <div className='flex justify-between'>
                          <div>
                            <span className='inline-flex text-green-500'><FaCheck /></span>
                            <span>Pontos expiram: </span>
                          </div>
                          <div>
                              <span className='text-gray-950 font-semibold ml-4'>Não </span>
                          </div>
                         </div>
                        :
                        <p>
                          <span className='inline-flex text-yellow-600'><FaCheck /></span>
                          <span className="">Pontos expiram: </span>
                        <span className='text-gray-950 font-semibold ml-4'>Sim</span></p>}
                        {item.notes &&
                        <div className="flex justify-between">
                          <span className="ml-4">Notas: </span>
                          <span className='text-gray-950 font-semibold'>{item.notes}</span>
                        </div>}
                        
                      </li>
                  </ul>
                </div>
                ))}

              </div>
            </CardDetailSection>

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
                          <span className='ml-4'>Programa:</span>
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
            </CardDetailSection>

            <CardDetailSection
              title="Benefícios da Bandeira e Exclusivos"
              icon={<Gift color={COLORS.PRIMARY} />}
            >
              <div style={{ color: COLORS.TEXT_SECONDARY }}>
                <div className="flex justify-between">
                  <span>Descontos em Lojas:</span>
                  <span className="font-semibold">{cardDetail.card_brand || 'Não oferece'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Descontos em Cinemas:</span>
                  <span className="font-semibold">{cardDetail.card_brand || 'Não oferece'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Descontos em Restaurantes:</span>
                  <span className="font-semibold">{cardDetail.card_brand || 'Não oferece'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Seguros:</span>
                  <span className="font-semibold">{cardDetail.card_brand || 'Não oferece'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Outros Benefícios:</span>
                  <span className="font-semibold">{cardDetail.card_brand || 'Nenhum adicional'}</span>
                </div>
              </div>
            </CardDetailSection>

            {cardDetail.card_name && (
              <div className="card-image flex justify-center items-center p-4 bg-white rounded-lg">
                <img
                  src={cardDetail.card_brand}
                  alt={`Cartão ${cardDetail.card_name}`}
                  className="max-h-48 object-contain" />
              </div>
            )}
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
                      <div className=''>
                        <span className='ml-4'>Somente correntistas: </span>
                      </div>
                      <div className="">
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
                          <li className='ml-4'>{item}</li>
                        ))}
                      </ul>
                    </span>
                  </p>
                </div>

                <div className='flex justify-between'>
                  {cardDetail.add_cards_amount > 5
                    ?
                    <>
                      <div className='flex'>
                        <span className='text-green-500'><FaCheck /></span>
                        <span>Cartões adicionais: </span>
                      </div>
                      <div className="">
                      <span className="text-gray-950 font-semibold">Até {cardDetail.add_cards_amount}</span>
                      </div>
                    </>
                    :
                    <>
                      <div className=''>
                        <span className="text-white text-sm ml-4 mt-2">Obs.: </span>
                        <span className="text-gray-950 font-semibold">{cardDetail.obs_add_cards}</span>
                      </div>
                    </>}
                </div>
                  
                <div className='flex justify-between'>
                  {cardDetail.add_cards_charge > 0
                    ?
                    <>
                      <div>
                        <span className="ml-4">Valor mínimo de fatura por adicional: </span>
                      </div>
                      <div>
                        <span className="text-gray-950 font-semibold">{cardDetail.add_cards_charge}</span>
                      </div>
                    </>
                    :
                    <>
                      <div>
                        <span className="ml-4">Valor mínimo de fatura por adicional: </span>
                      </div>
                      <div>
                        <span className="text-gray-950 font-semibold">Não há</span>
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
                    <div>
                      <span className='inline-flex text-green-500'><FaCheck /></span>
                      <span>Percentual de: </span>
                    </div>
                    <span className='text-gray-950 font-semibold'>{cardDetail.cashback}</span>
                  </div>
                  :
                  <div className='flex justify-between'>
                    <div>
                      <span className='inline-flex text-green-500'><FaCheck /></span>
                      <span>Anuidade: </span>
                    </div>
                    <span className='text-gray-950 font-semibold'>Isento</span>
                  </div>}

                  <div className='flex justify-between'>
                    <span className="ml-4">Obs:</span>
                    <span className='text-gray-950 font-semibold text-right'>{cardDetail.obs_cashback}</span>
                  </div>
              </div>
            </CardDetailSection>

            {cardDetail.cashback &&
            <CardDetailSection
              title="Cashback"
              icon={<CircleDollarSign color={COLORS.PRIMARY} />}
              className='text-md font-semibold'
            >
              <div style={{ color: COLORS.TEXT_PRIMARY }}>
                
                {(cardDetail.ranking_annuity > 6)
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

                  <div className='flex justify-between'>
                    <span className="ml-4">Obs:</span>
                    <span className='text-gray-950 font-semibold text-right'>{cardDetail.obs_cashback}</span>
                  </div>
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
                  {item.lounge_name &&
                    <div className="flex justify-between">
                      <div>
                        <span className='inline-flex text-green-500'><FaCheck /></span>
                        <span className=''>Sala:</span>
                      </div>
                      <span className=" text-gray-950 font-semibold">{item.lounge_name}</span>
                    </div>}

                  {item.int_airport[0] &&
                  <div className='flex justify-between'>
                    
                      <span className='ml-4'>Aeroportos nacionais:</span>
                    
                    
                      <span className="ml-4 text-gray-950 font-semibold text-right">{item.br_airport}</span>
                    
                  </div>}

                  {item.int_airport &&
                  <div className="flex justify-between">
                    <span className='ml-4'>Aeroportos internacionais:</span>
                    <span className="text-gray-950 font-semibold">{item.int_airport}</span>
                  </div>}

                  {item.access_limit &&
                  <div className='flex justify-between'>
                    <span className="ml-4">Limite de acessos: </span>
                    <span className='text-gray-950 font-semibold ml-4'>{item.access_limit}</span>
                  </div>}

                  {(cardDetail.ranking_vip_lounges < 4)
                  ?
                  <div className='flex justify-between'>
                    <span className='inline-flex text-red-600'><FaCheck /></span>
                    <span className="">Condições: </span>
                    <span className='ml-4 text-gray-950 font-semibold text-right'>{item.conditions}</span>
                  </div>
                  :
                  <div className='flex justify-between'>
                    <span className='inline-flex text-green-600'><FaCheck /></span>
                    <span className="">Condições: </span>
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