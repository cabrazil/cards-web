import { ReactNode } from "react";

const COLORS = {
  PRIMARY: '#1F3B4D',       
  SECUNDARY: '#d1d5db',    // Cinza-300
  HIGHLIGHT: '#4169e1',    // #FF9000
  BACKGROUND: '#F5F5F5',
  TEXT_PRIMARY: '#4b5563',  //#333333
  TEXT_SECONDARY: '#030712' //#666666
};

interface CardDetailSectionProps3 {
  title: string;
  icon: ReactNode;
  icon2?: ReactNode;
  children: ReactNode;
  className?: string;
}
// Para usar com tooltip e texto
const CardDetailSection3 = ({ title, icon, icon2, children, className = '' }: CardDetailSectionProps3) => (
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
    <div className="flex mb-2 justify-between">
      <div className='flex items-center'>
        {icon}
          <h3 
            className="text-lg font-semibold ml-2"
            style={{ color: COLORS.TEXT_PRIMARY }}
          >
            {title}
          </h3>
      </div>
      <div style={{ color: COLORS.TEXT_PRIMARY }}>
        {icon2}
      </div>
      
    </div>
    {children}
  </div>
);

export default CardDetailSection3;