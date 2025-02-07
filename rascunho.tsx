//código do carddetail refatorado

return (
    <div className="grid md:grid-cols-2 gap-3">
      {/* Coluna da esquerda - Informações principais */}
      <section className="credit-card-details gap-4">
        <div>
          <AboutCard cardDetail={cardDetail} />
          <PointsSystem cardDetail={cardDetail} />
          {cardDetail.ranking_miles_program > 0 && (
            <MilesProgram cardDetail={cardDetail} />
          )}
          <Benefits cardDetail={cardDetail} />
        </div>
      </section>

      {/* Coluna da direita - Informações secundárias */}
      <section className="credit-card-details gap-4">
        <div>
          <CardRequirements cardDetail={cardDetail} />
          <ZeroFee cardDetail={cardDetail} />
          {cardDetail.cashback && (
            <Cashback cardDetail={cardDetail} />
          )}
          {cardDetail.ranking_vip_lounges > 0 && (
            <VIPLounges cardDetail={cardDetail} />
          )}
        </div>
      </section>
    </div>
  );

  :
  <CardDetailSection
    title="Pontuação do Cartão"
    icon={<TicketPlus color={COLORS.PRIMARY} />}
    className='text-md font-semibold flex justify-between'
  >
    <span className='text-gray-950 font-semibold text-right'>Não oferece</span>
  </CardDetailSection>}


{(item.points_per_real > 100)
  ?
  <><div className='flex justify-between'>
      <span className='ml-4'>{item.expenses}:</span>
      <span className='text-gray-950 font-semibold text-right'>{item.rules} <DivideBy100 amount={item.points_per_real} divisor={100} /> pontos por real</span>
  </div></>
  :
  <><div className='flex justify-between'>
      <span className='ml-4'>{item.expenses}:</span>
      <span className='text-gray-950 font-semibold text-right'>{item.rules} {item.points_per_real} pontos por real</span>
  </div></>}