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
        De acordo com seu segmento de renda, selecionamos os melhores cartões de crédito do mercado,
        destacando suas principais vantagens para que você encontre o que mais se adapta às suas
         necessidades. Explore nosso ranking e faça a escolha certa para transformar seu consumo em experiências valiosas!
      </p>

    </header>
  )
}