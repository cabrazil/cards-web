function transformIssuers(issuers: any[]) {
  return issuers.map((issuer: { issuer_name: any; }) => ({ 
      "issuer_name": issuer.issuer_name, 
      "issuer_type": issuer.issuer_name 
  }));
}

// Exemplo de uso
const issuersData = [
"Agora Investimentos",
"Banco Bari",
"Banco BMG",
"Banco BV",
"Banco do Brasil",
"Banco do Nordeste",
"Banco PAN",
"Banco Votorantim",
"Banese",
"Banpara",
"Banrisul",
"Bradesco",
"BRB",
"BTG Pactual",
"C6 Bank",
"Caixa Economica Federal",
"Credicard",
"Cresol",
"Daycoval",
"Digio",
"Genial Investimentos",
"Gradual",
"Inter",
"Itau",
"Modalmais",
"Neon",
"Next",
"Nubank",
"Original",
"PicPay",
"Porto Seguro",
"RappiBank",
"Rico",
"Safra",
"Santander",
"Sicoob",
"Sicredi",
"Sofisa",
"Unicred",
"Uniprime",
"XP Investimentos"
];

const result = transformIssuers(issuersData);
console.log(result);