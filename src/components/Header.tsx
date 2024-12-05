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
      <h1 
        className="text-3xl font-bold mb-4"
        style={{ color: COLORS.TEXT_PRIMARY }}
      >
        Guia Completo de Cartões de Crédito
      </h1>
      <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.TEXT_PRIMARY }}>
        Descubra o Cartão Ideal para o Seu Perfil!
      </h3>

      <p className="text-md font-semibold mb-4" style={{ color: COLORS.TEXT_SECONDARY }}>
        Selecionamos e comparamos os melhores cartões de crédito do mercado, destacando suas principais vantagens para que 
        você encontre o que mais se adapta às suas necessidades. Quer acumular milhas mais rápido? Aproveitar benefícios 
        exclusivos? Ter acesso a salas VIP em aeroportos ou maximizar seu cashback? Aqui você encontra um comparativo 
        completo com informações sobre elegibilidade, taxas, limites de gastos, e muito mais. Explore nosso ranking e 
        faça a escolha certa para transformar seu consumo em experiências valiosas!
      </p>

      <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.TEXT_PRIMARY }}>
        Selecione o Segmento de renda e a Instituição financeira
      </h2>

    </header>
  )
}