export function Header() {

  const COLORS = {
    PRIMARY: '#1F3B4D',      // Azul-marinho profundo
    HIGHLIGHT: '#FFD700',    // Dourado
    BACKGROUND: '#F5F5F5',   // Cinza-claro
    TEXT_PRIMARY: '#333333', // Cinza-escuro
    TEXT_SECONDARY: '#666666' // Cinza-médio
  };

  return (
    <header className="mb-4">
      <h1 className="text-2xl font-bold text-primary mb-4" style={{ color: COLORS.TEXT_PRIMARY }}>
        Encontre o seu Cartão de Crédito ideal
      </h1>

      <p className="text-md font-semibold mb-4" style={{ color: COLORS.TEXT_SECONDARY }}>
      Bem-vindo ao universo dos cartões de crédito! Será que existe um cartão perfeito para todos? <span className="text-[#4169e1] italic">Spoiler: não!</span> Sua renda, hábitos e sonhos, sua realidade define o que é ideal para você. 
      Mas se olharmos para: <span className="text-[#4169e1] italic">grupos de pessoas com realidades semelhantes</span> podemos encontrar ótimas opções. Quer saber como e achar o cartão que combina com sua vida? Aqui, revelamos dicas e
      curiosidades para transformar escolhas em oportunidades. O próximo passo é seu! 
      Explore nosso ranking e faça a escolha certa para transformar seu consumo em experiências valiosas!
      </p>

    </header>
  )
}