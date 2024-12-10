import { CreditCard, TicketPlus, Award, Globe, Gift, FileText } from 'lucide-react';
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
    className={`card-section p-4 rounded-lg mb-4 shadow-sm ${className}`}
    style={{ 
      backgroundColor: 'white', 
      borderLeftColor: COLORS.HIGHLIGHT,
      borderLeftWidth: '2px'
    }}
  >
    <div className="flex items-center mb-3">
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
  const [creditCard, setCreditCard] = useState<CreditCardProps | null>(null);
    
  useEffect(() => {
    loadCards();
  }, [cardId])

  async function loadCards() {
    const response = await api.get(`/cardid?id=${cardId}`);
    setCreditCard(response.data);
  }

  return (
    <div className='grid md:grid-cols-2'>

      {creditCard ? (

        <><section className="credit-card-details gap-4">

          <div>
            <CardDetailSection
              title="Sobre o Cartão"
              icon={<FileText color={COLORS.PRIMARY} />}
              className='text-md font-semibold'
            >
              <div style={{ color: COLORS.TEXT_PRIMARY }}>
                <div className='flex justify-between'>
                  {creditCard.international_card
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
                  {creditCard.card_modality.length > 6
                    ?
                    <>
                      <div className='flex'>
                        <span className='text-green-500'><FaCheck /></span>
                        <span>Modalidade: </span>
                      </div>
                      <div className="">
                        <span className="text-gray-950 font-semibold">{creditCard.card_modality}</span>
                      </div>
                    </>
                    :
                    <>
                      <div className='flex'>
                        <span className='text-yellow-500'><FaCheck /></span>
                        <span>Modalidade: </span>
                      </div>
                      <div className="">
                        <span className="text-gray-950 font-semibold">{creditCard.card_modality}</span>
                      </div>
                    </>}
                  </div>

                <div className="flex justify-between">
                  <span className="ml-4">Bandeira: </span>
                  <span className='text-gray-950 font-semibold'>{creditCard.card_brand}</span>
                  
                </div>
                <div className="flex justify-between">
                  <span className="ml-4">Variante: </span>
                  <span className='text-gray-950 font-semibold'>{creditCard.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="ml-4">Material do cartão: </span>
                  <span className='text-gray-950 font-semibold'>{creditCard.card_material}</span>
                </div>

                <div className='flex justify-between'>
                  {creditCard.contactless
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
                        {creditCard.virtual_wallets.map((item) => (
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
               {creditCard.rewards.map((item) => (
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
                          <span className='inline-flex text-red-600'><FaCheck /></span>
                          <span className="">Pontos expiram: </span>
                        <span className='text-gray-950 font-semibold ml-4'>Sim</span></p>}

                        <p><span className="ml-4">...</span></p>
                        <p><span className="ml-4">...</span></p>
                        <p><span className="ml-4">...</span></p>
                        
                      </li>
                  </ul>
                </div>
                ))}

              </div>
            </CardDetailSection>

            <CardDetailSection
              title="Programa de Milhas"
              icon={<Award color={COLORS.PRIMARY} />}
            >
              <div style={{ color: COLORS.TEXT_SECONDARY }}>
                <div className="flex justify-between mb-2">
                  <span>Nome do Programa:</span>
                  <span className="font-semibold">{creditCard.card_brand || 'Não definido'}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Transferência para Companhias Aéreas:</span>
                  <span className="font-semibold">{creditCard.card_brand || 'Sim'}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Transferência para Hotéis:</span>
                  <span className="font-semibold">{creditCard.card_brand || 'Não'}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Cashback:</span>
                  <span className="font-semibold">
                    {creditCard.annual_fee ? `${creditCard.annual_fee}%` : 'Não oferece'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Observação:</span>
                  <span className="font-semibold">
                    {creditCard.obs_cashback || 'Sem observações'}
                  </span>
                </div>
              </div>
            </CardDetailSection>

            <CardDetailSection
              title="Acesso às Salas VIP"
              icon={<Globe color={COLORS.PRIMARY} />}
            >
              <div style={{ color: COLORS.TEXT_SECONDARY }}>
                <div className="flex justify-between mb-2">
                  <span>Salas Disponíveis:</span>
                  <span className="font-semibold">{creditCard.card_brand || 'Não especificado'}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Limite de Acessos:</span>
                  <span className="font-semibold">{creditCard.card_brand || 'Ilimitado'}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tipo de Aeroporto:</span>
                  <span className="font-semibold">{creditCard.card_brand || 'Nacional e Internacional'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Condições Especiais:</span>
                  <span className="font-semibold">{creditCard.card_brand || 'Não aplicável'}</span>
                </div>
              </div>
            </CardDetailSection>

            <CardDetailSection
              title="Benefícios da Bandeira e Exclusivos"
              icon={<Gift color={COLORS.PRIMARY} />}
            >
              <div style={{ color: COLORS.TEXT_SECONDARY }}>
                <div className="flex justify-between mb-2">
                  <span>Descontos em Lojas:</span>
                  <span className="font-semibold">{creditCard.card_brand || 'Não oferece'}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Descontos em Cinemas:</span>
                  <span className="font-semibold">{creditCard.card_brand || 'Não oferece'}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Descontos em Restaurantes:</span>
                  <span className="font-semibold">{creditCard.card_brand || 'Não oferece'}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Seguros:</span>
                  <span className="font-semibold">{creditCard.card_brand || 'Não oferece'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Outros Benefícios:</span>
                  <span className="font-semibold">{creditCard.card_brand || 'Nenhum adicional'}</span>
                </div>
              </div>
            </CardDetailSection>

            {creditCard.card_name && (
              <div className="card-image flex justify-center items-center p-4 bg-white rounded-lg">
                <img
                  src={creditCard.card_brand}
                  alt={`Cartão ${creditCard.card_name}`}
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
                  {creditCard.account_holder
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
                        {creditCard.get_conditions.map((item) => (
                          <li className='ml-4'>{item}</li>
                        ))}
                      </ul>
                    </span>
                  </p>
                </div>

                <div className='flex justify-between'>
                  {creditCard.add_cards_amount > 5
                    ?
                    <>
                      <div className='flex'>
                        <span className='text-green-500'><FaCheck /></span>
                        <span>Cartões adicionais: </span>
                      </div>
                      <div className="">
                      <span className="text-gray-950 font-semibold">Até {creditCard.add_cards_amount}</span>
                      </div>
                    </>
                    :
                    <>
                      <div className=''>
                        <span className="text-white text-sm ml-4 mt-2">Obs.: </span>
                        <span className="text-gray-950 font-semibold">{creditCard.obs_add_cards}</span>
                      </div>
                    </>}
                </div>
                  
                <div className='flex justify-between'>
                  {creditCard.add_cards_charge > 0
                    ?
                    <>
                      <div>
                        <span className="ml-4">Valor mínimo de fatura por adicional: </span>
                      </div>
                      <div>
                        <span className="text-gray-950 font-semibold">{creditCard.add_cards_charge}</span>
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
                  <span className="text-gray-950 font-semibold">{creditCard.card_limit || 'Não oferece'}</span>
                </div>

                <div>
                  <span className='ml-4'>...</span>
                </div>
              </div>
            </CardDetailSection>

            <CardDetailSection
              title="Para obter o Cartão"
              icon={<CreditCard color={COLORS.PRIMARY} />}
              className='text-md font-semibold'
            >
              <div style={{ color: COLORS.TEXT_PRIMARY }}>
                <div className='flex justify-between'>
                  {creditCard.account_holder
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
                        {creditCard.get_conditions.map((item) => (
                          <li className='ml-4'>{item}</li>
                        ))}
                      </ul>
                    </span>
                  </p>
                </div>

                <div className='flex justify-between'>
                  {creditCard.add_cards_amount > 5
                    ?
                    <>
                      <div className='flex'>
                        <span className='text-green-500'><FaCheck /></span>
                        <span>Cartões adicionais: </span>
                      </div>
                      <div className="">
                      <span className="text-gray-950 font-semibold">Até {creditCard.add_cards_amount}</span>
                      </div>
                    </>
                    :
                    <>
                      <div className=''>
                        <span className="text-white text-sm ml-4 mt-2">Obs.: </span>
                        <span className="text-gray-950 font-semibold">{creditCard.obs_add_cards}</span>
                      </div>
                    </>}
                </div>
                  
                <div className='flex justify-between'>
                  {creditCard.add_cards_charge > 0
                    ?
                    <>
                      <div>
                        <span className="ml-4">Valor mínimo de fatura por adicional: </span>
                      </div>
                      <div>
                        <span className="text-gray-950 font-semibold">{creditCard.add_cards_charge}</span>
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
                  <span className="text-gray-950 font-semibold">{creditCard.card_limit || 'Não oferece'}</span>
                </div>

                <div>
                  <span className='ml-4'>...</span>
                </div>
              </div>
            </CardDetailSection>

          </div>

        </section></>
      ) : (
        <p>Carregando detalhes do cartão de crédito...</p>
      )}
  </div>
  );
};