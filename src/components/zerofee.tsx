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
  zerofees: [{
    id: string
    expenses: string;
    investments: string;
    fee_discount: number;
    notes: string;
    get_conditions: string[];
  }]
}

export default function Zerofee(){

  const [cards, setCards] = useState<CardProps[]>([])

  useEffect(() => {
    loadCards();
  }, [])

  async function loadCards() {
    const response = await api.get("/zerofees")
    setCards(response.data);
  }

  return(
    <div className="w-full max-w-8xl">
      <div className="flex flex-col lg:flex-row gap-4">
        {cards.map( (card) => (
          <div 
            key={card.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col flex-1 ml-4">
            
            <span className="text-blue-500 font-bold">Para obter isenção da Anuidade:</span>
              <div>
                <ul> 
                  {card.zerofees.map((item) => (
                    <div>{(!item.expenses)
                      ? <div>
                          <li>
                          <p className='text-gray-800'>Investimentos: {item.investments}</p>
                          <p><span className="text-blue-500">Isenção de: </span>{item.fee_discount}%</p>
                          <p><span className="text-blue-500">Notas: </span>{item.notes}</p>

                          </li>
                        </div>
                      : <div>
                          <li>
                            <p className='text-gray-800'>Gastos no cartão: {item.expenses} ou {item.investments}</p>
                          </li>
                        </div>}
                    </div>
                    
                    ))}
                </ul>
              </div>      
          </div>  
        ))}
      </div>
    </div>
  )
}