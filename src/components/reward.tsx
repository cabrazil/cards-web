import { useEffect, useState } from 'react'
import { api } from '../services/api'

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
  card_material: string;
  contactless: boolean;
  get_conditions: [];
  spread_on: string;
  cashback: string;
  obs_add_cards: string;
  obs_cashback: string;
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

export default function Reward(){

  const [cards, setCards] = useState<CardProps[]>([])

  useEffect(() => {
    loadCards();
  }, [])

  async function loadCards() {
    const response = await api.get("/rewards")
    setCards(response.data);
  }

  return(
    <div className="w-full max-w-8xl">
      <div className="flex flex-col lg:flex-row gap-4">
        {cards.map( (card) => (
          <div 
            key={card.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col flex-1 ml-4">
            
          
            <span className="text-blue-500 font-bold">Sistema de pontuação:</span>
              <div>
                <ul> 
                  {card.rewards.map((item) => (
                    <li>
                      <p><span className="text-blue-500">Tipo de gastos: </span>{item.expenses}</p>
                      {item.rules &&
                      <p><span className="text-blue-500">Regras: </span>{item.rules}</p>}
                      <p className='text-blue-500'>
                        <span> Pontos por dolar: </span>
                        <span className='text-gray-800'>{item.points_per_dollar}</span>
                        <span className='ml-4'> Pontos por real: </span>
                        <span className='text-gray-800'>{item.points_per_real}</span>
                      </p>
                      

                      {(!item.expiration)
                      ?
                      <p>
                        <span className="text-blue-500">Pontos expiram: </span>
                        <span className='text-gray-800'>Não </span>
                      </p>
                      :
                      <p><span className="text-blue-500">Pontos expiram: </span>
                      <span className='text-gray-800'>Sim</span></p>}

                      <p><span className="text-blue-500">.</span></p>
                      
                    </li>
                    ))}
                </ul>
              </div>      
          </div>  
        ))}
      </div>
    </div>
  )
}