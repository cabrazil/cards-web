import { useEffect, useState } from 'react'
import { api } from './services/api'
import CurrencyFormatter from './components/CurrencyFormatter';
import DivideNumber from './components/DivideNumber';
import { FaCheck } from "react-icons/fa";
import brad_card from './assets/brad_visa.jpg'

interface CardProps{
  id: string;
  created_at:            string;
  updated_at:            string;
  card_name:             string;
  issuer:                string;
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
}

export default function App(){

  const [cards, setCards] = useState<CardProps[]>([])

  useEffect(() => {
    loadCards();
  }, [])

  async function loadCards() {
    const response = await api.get("/cards")
    setCards(response.data);

  }

  return(
    
    <div className="w-screen h-screen bg-bg-custom3">
      <h2 className="mb-5 text-3xl text-gray-950 md:text-center md:text-5xl">Descubra o cartão de crédito ideal para o seu perfil!</h2>
      <p className="text-xl text-gray-700 md:text-center md:text-1xl">Aqui você encontra informações sobre elegibilidade, pontuação, programa de milhas, salas VIP e muito mais..</p>
      
      <div className="p-8">
        
        {cards.map( (card) => (
          <div 
            key={card.id}
            className="rounded-lg p-4 ml-2 mt-2 border-gray-400 border-solid border-2 grid grid-cols-4 grid-rows-2 gap-2">      
            
            {/* 1a div */}
            <div className='bg-sky-600'>
              <p className=" ml-4 text-2xl font-semibold display: block mb-2">{card.card_name}</p>
              <img className='h-34 w-52 ml-4 rounded mb-2' src={brad_card} alt="brad card" />
              <p><span className="text-white text-sm ml-4">Somente correntistas: </span>
                {card.account_holder
                ?
                <span className='text-gray-950 font-semibold'>Sim</span>
                :
                <span className='text-gray-950 font-semibold'>Não</span>}
              </p>
              <p> 
                <span className="text-white text-sm ml-4">Emitido por: </span>
                <span className='text-gray-950 font-semibold'>{card.issuer}</span>
              </p>
        
              {card.international_card
                ?
                <p>
                  <span className='inline-flex text-green-500'><FaCheck /></span>
                  <span className='text-white text-sm mt-2'>Cartão Internacional: </span>
                  <span className="text-gray-950 font-semibold">Sim</span>
                </p>
                :
                <p>
                  <span className='inline-flex text-yellow-500'><FaCheck /></span>
                  <span className='text-white text-sm'>Cartão Internacional: </span>
                  <span className="text-gray-950 font-semibold">Não</span>
                </p>}
              
              {card.card_modality.length == 6
              ?
              <p> 
                <span className='inline-flex text-yellow-500'><FaCheck /></span>
                <span className="text-white text-sm">Modalidade: </span>
                <span className='text-gray-950 font-semibold'>{card.card_modality}</span>
              </p>
              :
              <p> 
                <span className='inline-flex text-green-500'><FaCheck /></span>
                <span className="text-white text-sm">Modalidade: </span>
                <span className='text-gray-950 font-semibold'>{card.card_modality}</span>
              </p>}

              <p>
                <span className="text-white text-sm ml-4">Bandeira: </span>
                <span className='text-gray-950 font-semibold'>{card.card_brand}</span>
                <span className="text-white text-sm"> na categoria: </span>
                <span className='text-gray-950 font-semibold'>{card.category}</span>
              </p>
              <p> 
                <span className="text-white text-sm ml-4">Material do cartão: </span>
                <span className='text-gray-950 font-semibold'>{card.card_material}</span>
              </p>
              {card.contactless 
              ? 
              <p> 
                <span className="text-white text-sm ml-4">Pagar por aproximação: </span>
                <span className='text-gray-950 font-semibold'>Sim</span>
              </p>
              :
              <p> 
                <span className="text-white text-sm ml-4">Pagar por aproximação: </span>
                <span className='text-gray-950 font-semibold'>Não</span>
              </p>}
              <p>
                <span className="text-white text-sm ml-4">Aceito nas Carteiras Digitais:    
                  <ul className='text-gray-950 font-semibold display: inline-flex gap-2 mb-2 ml-2'>
                    {card.virtual_wallets.map((item) => (
                      <li className='first:ml-2'>{item}</li>
                    ))}
                  </ul>
                </span>
              </p>
            </div>
            
            {/* 2a div */}
            <div className='bg-lime-700'>
              <span className="text-white text-xl ml-4 font-bold">Para obter o cartão:</span>
              <p><span className="text-white text-sm ml-4 font-bold">Com:</span></p>
              <p>
                <span>                    
                  <ul className='text-gray-950 font-semibold'>
                    {card.get_conditions.map((item) => (
                      <li className='ml-4'>{item}</li>
                    ))}
                  </ul>
                </span>
              </p>
              
              {card.add_cards_amount > 5
              ?
                <p>
                  <span className='inline-flex text-green-500'><FaCheck /></span>
                  <span className='text-white text-sm mt-2'>Cartões adicionais: </span>
                  <span className="text-gray-950 font-semibold">até {card.add_cards_amount}</span>
                </p>
              :
                <p className="text-white text-sm ml-4 mt-2">Obs.: <span className="text-gray-950 font-semibold">{card.obs_add_cards}</span></p>}

              {card.add_cards_charge > 0
              ?
              <p className="text-white text-sm ml-4">Valor mínimo de fatura por adicional: <span className="text-gray-950 font-semibold">{card.add_cards_charge}</span></p>
              :
              <p className="text-white text-sm ml-4">Valor mínimo de fatura por adicional: <span className="text-gray-950 font-semibold">Não há</span></p>}
              
              <p className='ml-4'>
                <span className="text-white text-sm mb-2">Valor limite do cartão: </span>
                <span className='text-gray-950 font-semibold'>{card.card_limit}</span>
              </p>              
            </div>
            
            {/* 3a div */}
            <div className='bg-blue-600'>
              <span className="text-white text-xl ml-4 font-bold">Para isentar Anuidade:</span>
              {card.annual_fee > 0
              ?
              <p>
                <span className="text-white text-sm ml-4">Anuidade de: </span>
                <span className='text-gray-950 font-semibold'><CurrencyFormatter amount={card.annual_fee} /></span>
                <span className='text-gray-950 font-semibold'> (12 x <DivideNumber amount={card.annual_fee} divisor={12} />)</span>
                
              </p>
              :
              <p className="ml-4">
                <span className='text-gray-950 font-semibold'> Isento de anuidade</span>
              </p>}

              <ul> 
                {card.zerofees.map((item) => (
                  <div>
                    {(item.fee_discount > 0) && (item.notes != 'Isento')
                      ?
                      <div>
                        <li>
                          <p className='ml-4'>
                            <span className='inline-flex text-yellow-600'><FaCheck /></span>
                            <span className='text-white text-sm'>Isenção de: </span>
                            <span className='text-gray-950 font-semibold'>{item.fee_discount}%</span>
                          </p>
                          <p className='ml-2'>
                            <span>                    
                              <ul className='text-gray-950 font-semibold'>
                                {item.get_conditions.map((item) => (
                                  <li className='ml-4'>{item}</li>
                                ))}
                              </ul>
                            </span>
                          </p>
                          <p className='ml-4'>
                            <span className="text-white text-sm mb-2">Notas: </span>
                            <span className='text-gray-950 font-semibold'>{item.notes}</span>
                          </p>
                          <p><span className="text-white text-sm ml-4"></span></p>   
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

            
            {/* 4a div */}
            <div className='bg-orange-500'>
              <span className="text-white text-xl ml-4 font-bold">Sistema de pontuação:</span>
                <ul> 
                  {card.rewards.map((item) => (
                    <li>
                      <p><span className="text-white text-sm ml-4">Gastos: </span><span className='text-gray-950 font-semibold'>{item.expenses}</span></p>
                      {item.rules &&
                      <p><span className="text-white text-sm ml-4">Regras: </span><span className='text-gray-950 font-semibold'>{item.rules}</span></p>}
                      <p className='text-white text-sm ml-4'>
                        <span> Pontos por dolar: </span>
                        <span className='text-gray-950 text-xl font-semibold'>{item.points_per_dollar}</span>
                        <span className='ml-4'> Pontos por real: </span>
                        <span className='text-gray-950 text-xl font-semibold'>{item.points_per_real}</span>
                      </p>
                      
                      {(!item.expiration)
                      ?
                      <p>
                        <span className='inline-flex text-green-500'><FaCheck /></span>
                        <span className="text-white text-sm">Pontos expiram: </span>
                        <span className='text-gray-950 font-semibold mb-2'>Não </span>
                      </p>
                      :
                      <p>
                        <span className='inline-flex text-red-600'><FaCheck /></span>
                        <span className="text-white text-sm">Pontos expiram: </span>
                      <span className='text-gray-950 font-semibold mb-2'>Sim</span></p>}

                      <p><span className="text-white text-sm ml-4"></span></p>
                      
                    </li>
                    ))}
                </ul>
                {(card.spread_rate > 5)
                ?
                <p>
                  <span className='inline-flex text-red-600'><FaCheck /></span>
                  <span className="text-white text-sm">Spread: </span>
                  <span className='text-gray-950 font-semibold mb-2'>{card.spread_rate}%</span>
                  <span className='text-gray-950 font-semibold mb-2'>{card.spread_on}</span>
                </p>
                :
                <p>
                  <span className="text-white text-sm ml-2">Spread: </span>
                  <span className='text-gray-950 font-semibold'>{card.spread_rate}</span>
                </p>}
                <p>
                  <span className="text-white text-sm ml-4">IOF: </span>
                  <span className='text-gray-950 font-semibold mb-2'>{card.iof_rate}%</span>
                </p>
            </div>  
            
            {/* 5a div */}
            <div className='bg-yellow-600'>
            <span className="text-white text-xl ml-4 font-bold">Programa de milhagem:</span>
                <ul>
                  {card.mileages.map((item) => (
                    <li>
                      <p><span className="text-gray-950 font-semibold ml-4">{item.program_name}</span></p>
                      <p><span className="text-white text-sm ml-4">Pontos podem ser transferidos para: </span></p>
                      
                      
                      <p>
                        <span className="text-white text-sm ml-6">Programa: </span>
                        <span className='text-gray-950 font-semibold'>{item.transfer_program}</span>
                      </p>
                      
                      <p className='ml-6'>
                        <span className="text-white text-sm">Companhias aéreas: </span>
                        <span className='text-gray-950 font-semibold'>{item.airlines}</span>
                      </p>
                      
                      <p className='ml-6'>
                        <span className="text-white text-sm">Hotéis: </span>
                        <span className='text-gray-950 font-semibold'>{item.hotels}</span>
                      </p>
                      
                      {(!item.pay_bills)
                      ?
                      <p>
                        <span className="text-white text-sm ml-6">Transfere pontos para a fatura: </span>
                        <span className='text-gray-950 font-semibold mb-2'>Não </span>
                      </p>
                      :
                      <p><span className="text-white text-sm ml-6">Transfere pontos para a fatura: </span>
                      <span className='text-gray-950 font-semibold mb-2'>Sim</span></p>}
                    
                      <p><span className="text-white text-sm ml-6 mb-4">Transfere pontos para cashback: </span>{item.pay_cashback}</p>
                    </li>
                    ))}
                </ul>
                <p className='mt-4'><span className="text-white text-xl ml-4 font-bold">Cashback:</span></p>
                <p>
                  <span className="text-white text-sm ml-6">Percentual de: </span>
                  <span className='text-gray-950 font-semibold'>{card.cashback}</span>
                </p>
                <p className='ml-6'>
                  <span className="text-white text-sm">Notas: </span>
                  <span className='text-gray-950 font-semibold'>{card.obs_cashback}</span>
                </p>

              </div>      

            {/* 6a div */}
            <div className='bg-emerald-700'>
            <span className="text-white text-xl ml-4 font-bold">Salas VIP:</span>
            <p>
              <span className="text-white text-sm ml-4">Aplicativo: </span>
              <span className="text-gray-950 font-semibold">{card.vip_lounge_app}</span>
            </p>
                <ul>
                  {card.lounges.map((item) => (
                    <li>
                      <p>
                        <span className="text-white text-sm ml-4">Sala: </span>
                        <span className="text-gray-950 font-semibold uppercase">{item.lounge_name}</span>
                      </p>
                      
                      
                      {(item.br_airport[0]) &&
                      <p className='ml-4'>
                        <span className="text-white text-sm">Aeroportos Nacionais: </span>
                        <span className="text-gray-950 font-semibold">{item.br_airport}</span>
                      </p>}

                      {(item.int_airport[0]) &&
                      <p className='ml-4'>
                        <span className="text-white text-sm">Aeroportos Internacionais: </span>
                        <span className='text-gray-950 font-semibold'>{item.int_airport}</span>
                      </p>}                
                      <p className='ml-4'>
                        <span className="text-white text-sm">Limite de acessos: </span>
                        <span className="text-gray-950 font-semibold">{item.access_limit}</span>
                      </p>
                      {(card.ranking_vip_lounges < 4)
                      ?
                      <p className='ml-4'>
                        <span className='inline-flex text-red-600'><FaCheck /></span>
                        <span className="text-white text-sm">Condições: </span>
                        <span className="text-gray-950 font-semibold">{item.conditions}</span>
                      </p>
                      :
                      <p className='ml-4'>
                        <span className='inline-flex text-green-500'><FaCheck /></span>
                        <span className="text-white text-sm">Condições: </span>
                        <span className="text-gray-950 font-semibold">{item.conditions}</span>
                      </p>}


                      <p><span className="text-white text-sm ml-4"></span></p>
                    </li>
                    ))}
                </ul>
              </div> 

            {/* 7a div */}
            <div className='bg-violet-600'>
                <span className="text-white text-xl ml-4 font-bold">Outros Benefícios:</span>
                <p>
                  <span className="text-white text-sm ml-4">*Fast Pass: </span>
                  <span className='text-gray-950 font-semibold mb-2'>Aeroporto de Guarulhos em SP</span>
                  </p>
            </div>

            {/* 7a div */}
            <div className='bg-cyan-600'>
                <span className="text-white text-sm ml-4 font-bold">Salas VIP:</span>
            </div>              
          </div>          
        ))}
      </div>
    </div>
  )
}