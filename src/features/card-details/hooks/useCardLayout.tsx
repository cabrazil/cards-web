import { useMemo } from 'react';
import { CardProps } from '../types';

// Definição das propriedades de cada tipo de card
const CARD_CONFIG = {
  aboutCard: {
    id: 'about-card',
    priority: 1,
    estimatedHeight: 300,
    hasContent: true // Sempre tem conteúdo
  },
  requirements: {
    id: 'requirements',
    priority: 2,
    estimatedHeight: 250,
    hasContent: true // Sempre tem conteúdo
  },
  zerofee: {
    id: 'zerofee',
    priority: 3,
    estimatedHeight: 200,
    hasContent: true // Sempre tem conteúdo
  },
  rewards: {
    id: 'rewards',
    priority: 4,
    estimatedHeight: 220,
    hasContent: (cardDetail: CardProps) => cardDetail.ranking_points > 0
  },
  milesProgram: {
    id: 'miles-program',
    priority: 5,
    estimatedHeight: 240,
    hasContent: (cardDetail: CardProps) => cardDetail.ranking_miles_program > 0
  },
  cashback: {
    id: 'cashback',
    priority: 6,
    estimatedHeight: 200,
    hasContent: (cardDetail: CardProps) => cardDetail.cashback.length > 0
  },
  vipLounges: {
    id: 'vip-lounges',
    priority: 7,
    estimatedHeight: 220,
    hasContent: (cardDetail: CardProps) => cardDetail.ranking_vip_lounges > 0
  },
  cardBenefits: {
    id: 'card-benefits',
    priority: 8,
    estimatedHeight: 180,
    hasContent: true // Sempre tem conteúdo
  },
  brandBenefits: {
    id: 'brand-benefits',
    priority: 10, // Aumentado para ser o último
    estimatedHeight: 250, // Aumentado para garantir que vá para a direita
    hasContent: true // Sempre tem conteúdo
  }
};

export const useCardLayout = (cardDetail: CardProps | null) => {
  return useMemo(() => {
    if (!cardDetail) return [];

    const cards = [];

    // Cards obrigatórios
    cards.push({
      ...CARD_CONFIG.aboutCard,
      component: <AboutCard cardDetail={cardDetail} />
    });

    cards.push({
      ...CARD_CONFIG.requirements,
      component: <Requirements cardDetail={cardDetail} />
    });

    cards.push({
      ...CARD_CONFIG.zerofee,
      component: <Zerofee cardDetail={cardDetail} />
    });

    // Cards condicionais
    if (CARD_CONFIG.rewards.hasContent(cardDetail)) {
      cards.push({
        ...CARD_CONFIG.rewards,
        component: <Rewards cardDetail={cardDetail} />
      });
    } else {
      cards.push({
        ...CARD_CONFIG.rewards,
        component: <NoRewards />
      });
    }

    if (CARD_CONFIG.milesProgram.hasContent(cardDetail)) {
      cards.push({
        ...CARD_CONFIG.milesProgram,
        component: <MilesProgram cardDetail={cardDetail} />
      });
    } else {
      cards.push({
        ...CARD_CONFIG.milesProgram,
        component: <NoMilesProgram />
      });
    }

    if (CARD_CONFIG.cashback.hasContent(cardDetail)) {
      cards.push({
        ...CARD_CONFIG.cashback,
        component: <Cashback cardDetail={cardDetail} />
      });
    } else {
      cards.push({
        ...CARD_CONFIG.cashback,
        component: <NoCashback />
      });
    }

    if (CARD_CONFIG.vipLounges.hasContent(cardDetail)) {
      cards.push({
        ...CARD_CONFIG.vipLounges,
        component: <VipLounges cardDetail={cardDetail} />
      });
    } else {
      cards.push({
        ...CARD_CONFIG.vipLounges,
        component: <NoVipLounges />
      });
    }

    // Cards obrigatórios finais
    cards.push({
      ...CARD_CONFIG.cardBenefits,
      component: <CardBenefits cardDetail={cardDetail} />
    });

    cards.push({
      ...CARD_CONFIG.brandBenefits,
      component: <BrandBenefits cardDetail={cardDetail} />
    });

    return cards;
  }, [cardDetail]);
};

// Importações necessárias
import {
  AboutCard,
  Requirements,
  Rewards,
  NoRewards,
  Cashback,
  VipLounges,
  MilesProgram,
  Zerofee,
  CardBenefits,
  BrandBenefits,
  NoCashback,
  NoMilesProgram,
  NoVipLounges
} from '../components/credit-card'; 