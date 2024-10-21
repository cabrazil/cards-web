import { useEffect, useState } from 'react'
import { api } from './services/api'

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
    
    <div className='w-full min-h-screen bg-gray-800 flex px-4'>
      <main className='my-10 w-full md:max-w-2xl'>
        <h1 className='text-4xl font-medium text-white'>Cartões de Crédito</h1>

        {cards.map( (card) => (
          <div 
          key={card.id}
          className="grid-cols-2 grid-rows-2 gap-4 p-4 text-white">
            <div className="border-2 border-gray-300 p-4">
              <div className="grid-cols-2 gap-2">
                <div>
                  <p><span className="font-medium">Nome do Cartão: </span>{card.card_name}</p>
                  <p><span className="font-medium">Emissor: </span>{card.issuer}</p>
                  <p><span className="font-medium">Taxa anual: </span>{card.annual_fee}</p>
                  <p><span className="font-medium">Bandeira: </span>{card.card_brand}</p>
                  <p><span className="font-medium">Categoria: </span>{card.category}</p>
                  <div>
                    <p>
                      <span className="font-medium">Carteiras Virtuais:                    
                      <ul className='display: inline-flex gap-2'>
                        {card.virtual_wallets.map((item) => (
                          <li className='first:bg-gray-500 ml-2'>{item}</li>
                          ))}
                      </ul>
                      </span>
                    </p>
                  </div>
                  <p><span className="font-medium">Cartões adicionais: </span>{card.add_cards_amount}</p>
                  <p><span className="font-medium">Valor fatura por adicional: </span>{card.add_cards_charge}</p>
                  {/* <p><span className="font-medium">Valor limite: </span>{card.card_limit}</p> */}
                  <p><span className="font-medium">Valor mínimo de renda: </span>{card.req_min_income}</p>
                  <p><span className="font-medium">Valor mínimo de investimento: </span>{card.req_min_investment}</p>                     
                </div>      
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
