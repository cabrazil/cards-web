import { ReactNode } from "react";

const COLORS = {
  PRIMARY: '#1F3B4D',       
  SECUNDARY: '#d1d5db',    // Cinza-300
  HIGHLIGHT: '#4169e1',    // #FF9000
  BACKGROUND: '#F5F5F5',
  TEXT_PRIMARY: '#4b5563',  //#333333
  TEXT_SECONDARY: '#030712' //#666666
};

interface CardDetailSectionProps2 {
  title: string;
  icon: ReactNode;
  img: string;
  icon2: ReactNode;
  children: ReactNode;
  className?: string;
}
// Para usar a imagem do cartão e agora com tooltip de conclusão
const CardDetailSection2 = ({ title, icon, img, icon2, children, className = '' }: CardDetailSectionProps2) => (
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
    <div className="flex mb-2">
      <div className='flex items-center mr-auto'>
        {icon}
          <h3 
            className="text-lg font-semibold ml-2"
            style={{ color: COLORS.TEXT_PRIMARY }}
          >
            {title}
          </h3>
      </div>
      <div>
        <img className='w-[13rem] h-[9rem]' src={img} alt="cartão de crédito" />
      </div>
      <div className="flex items-center ml-auto">
        {icon2}
      </div>
      
    </div>
    {children}
  </div>
);

export default CardDetailSection2;