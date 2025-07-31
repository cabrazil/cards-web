import { ReactNode } from "react";

const COLORS = {
  PRIMARY: '#1F3B4D',       
  SECUNDARY: '#d1d5db',    // Cinza-300
  HIGHLIGHT: '#4169e1',    // #FF9000
  BACKGROUND: '#F5F5F5',
  TEXT_PRIMARY: '#4b5563',  //#333333
  TEXT_SECONDARY: '#030712', //#666666
  TEXT_TITLES: '#FFFFFF',
};

interface CardDetailSectionProps2 {
  title: string;
  icon: ReactNode;
  icon2?: ReactNode;
  title2?: string;
  children: ReactNode;
  className?: string;
}
// Para usar a imagem do cartão e agora com tooltip de conclusão
const CardDetailSection2 = ({ title, icon, icon2, title2, children, className = '' }: CardDetailSectionProps2) => (
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
    <div className="flex mb-4">
      <div className='flex items-center mr-auto'>
        {icon}
          <h3 
            className="text-lg font-semibold ml-2"
            style={{ color: COLORS.TEXT_TITLES }}
          >
            {title}
          </h3>
      </div>
      
      <div className="flex items-center ml-auto">
        {icon2}
          <h3 
            className="text-lg font-semibold ml-2"
            style={{ color: COLORS.TEXT_TITLES }}
          >
            {title2}
          </h3>
      </div>
      
    </div>
    {children}
  </div>
);

export default CardDetailSection2;