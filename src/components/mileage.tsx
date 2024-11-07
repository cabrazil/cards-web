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
}

export default function Mileage(){

  const [cards, setCards] = useState<CardProps[]>([])

  useEffect(() => {
    loadCards();
  }, [])

  async function loadCards() {
    const response = await api.get("/mileages")
    setCards(response.data);
  }

  return(
    <div className="w-full max-w-8xl">
      <div className="flex flex-col lg:flex-row gap-4">
        {cards.map( (card) => (
          <div 
            key={card.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col flex-1 ml-4">
            
          
            
              <div>
                <ul> 
                  {card.mileages.map((item) => (
                    <li>
                      <p><span className="text-blue-500 font-bold">Programa de milhagem: </span>{item.program_name}</p>
                      <p><span className="text-blue-500">Pontos podem ser transferidos para: </span></p>
                      
                      {(item.transfer_program[0]) &&
                      <p><span className="text-blue-500">Programa de pontos: </span>{item.transfer_program}</p>}
                      {(item.airlines[0]) &&
                      <p><span className="text-blue-500">Companhias aéreas: </span>{item.airlines}</p>}
                      {(item.hotels[0]) &&
                      <p><span className="text-blue-500">Hotéis: </span>{item.hotels}</p>}
                      <p><span className="text-blue-500">Transfere pontos para a fatura: </span>{item.airlines}</p>
                      <p><span className="text-blue-500">Transfere pontos para cashback: </span>{item.airlines}</p>
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