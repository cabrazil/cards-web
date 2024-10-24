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
  zerofees: [{
    id: string
    expenses: string;
    investments: string;
    fee_discount: number;
    notes: string;
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
    <div className="w-full max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-4">
        {cards.map( (card) => (
          <div 
            key={card.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col flex-1 ml-4">
            
          
            <span className="font-medium mb-4">Para obter isenção de Tarifa:</span>
              <div>
                <ul> 
                  {card.zerofees.map((item) => (
                    <li>
                      <p><span className="font-medium">Tipo de despesas: </span>{item.expenses}</p>
                      <p><span className="font-medium">Investimentos: </span>{item.investments}</p>
                      <p><span className="font-medium">Isenção de: </span>{item.fee_discount}%</p>
                      <p><span className="font-medium">Notas: </span>{item.notes}</p>
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