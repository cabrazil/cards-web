import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface CardItem {
  id: string;
  component: React.ReactNode;
  priority?: number; // Prioridade para ordenação (menor = mais importante)
  estimatedHeight?: number; // Altura estimada para balanceamento
}

interface TwoColumnLayoutProps {
  cards: CardItem[];
  className?: string;
}

export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({ cards, className = '' }) => {
  // Ordena os cards por prioridade (menor número = maior prioridade)
  const sortedCards = useMemo(() => {
    return [...cards].sort((a, b) => (a.priority || 999) - (b.priority || 999));
  }, [cards]);

  // Distribui os cards entre duas colunas de forma balanceada
  const { leftColumn, rightColumn } = useMemo(() => {
    const left: CardItem[] = [];
    const right: CardItem[] = [];
    let leftHeight = 0;
    let rightHeight = 0;

    sortedCards.forEach((card) => {
      const cardHeight = card.estimatedHeight || 200; // Altura padrão estimada
      
      // Força "Benefícios da Bandeira" para a coluna direita
      if (card.id === 'brand-benefits') {
        right.push(card);
        rightHeight += cardHeight;
      } else {
        // Distribuição normal para os outros cards
        if (leftHeight <= rightHeight) {
          left.push(card);
          leftHeight += cardHeight;
        } else {
          right.push(card);
          rightHeight += cardHeight;
        }
      }
    });

    return { leftColumn: left, rightColumn: right };
  }, [sortedCards]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Coluna Esquerda */}
      <motion.div className="space-y-8 flex flex-col items-center">
        {leftColumn.map((card) => (
          <motion.div
            key={card.id}
            variants={cardVariants}
            layout
            className="w-full max-w-[700px]"
          >
            {card.component}
          </motion.div>
        ))}
      </motion.div>

      {/* Coluna Direita */}
      <motion.div className="space-y-8 flex flex-col items-center">
        {rightColumn.map((card) => (
          <motion.div
            key={card.id}
            variants={cardVariants}
            layout
            className="w-full max-w-[700px]"
          >
            {card.component}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TwoColumnLayout; 