import { useEffect, useState } from 'react'
import { api } from './services/api'
// import itau_card from './assets/black_itau.png'

interface CardProps{
  id: string;
  card_name: string;
  issuer: string;
  annual_fee: number;
  card_brand: string;
  category: string;
  virtual_wallets: [];
  add_cards_amount: number;
  add_cards_charge: number;
  card_limit: string;
  req_min_income: number;
  req_min_investment: number;
  zerofees: [{
    id: string
    expenses: string;
    investments: string;
    fee_discount: number;
    notes: string;
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
    <div className="w-full max-w-7xl">
      <h2 className="mb-5 text-3xl font-semibold text-white md:text-center md:text-5xl">Comparativo de cartões Black</h2>
      <p className="text-xl text-gray-100 md:text-center md:text-2xl">Here's what others have to say about us.
                </p>
      <div className="flex flex-col lg:flex-row gap-4">
        {cards.map( (card) => (
          <div 
            key={card.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col flex-1 ml-4">
            <h3 className="text-xl font-semibold mb-4">{card.card_name}</h3>
            <p className="text-gray-600">Emitido por <span className='font-medium'>{card.issuer}</span> com taxa anual de R$ {card.annual_fee},00</p>
            <div>
               <p><span className="text-gray-600">Com a bandeira </span>{card.card_brand} na categoria {card.category} </p>
               <div>
                  <p>
                    <span className="text-gray-600">Aceito nas Carteiras Virtuais:                    
                       <ul className='display: inline-flex gap-2'>
                         {card.virtual_wallets.map((item) => (
                           <li className='first:ml-2'>{item}</li>
                          ))}
                        </ul>
                    </span>
                  </p>
                  <p><span className="text-gray-600">Permite até {card.add_cards_amount} cartões adicionais</span></p>
                  <p><span className="text-gray-600">Valor mínimo de fatura por adicional: </span>{card.add_cards_charge}</p>
                  <p><span className="text-gray-800">Condições de elegibilidade:</span></p>
                  <p><span className="text-gray-600">Valor mínimo de renda: R$ </span>{card.req_min_income}</p>
                  <p><span className="text-gray-600">Valor mínimo de investimento: R$ </span>{card.req_min_investment}</p>
                  <p><span className="text-gray-600">Valor limite do cartão: </span>{card.card_limit}</p>
                </div>
            </div>
          
        </div>  
        ))}
      </div>
    </div>
  )
}
