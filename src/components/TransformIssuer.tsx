function transformIssuers(issuers: any[]) {
  return issuers.map((issuer: { issuer_name: any; }) => ({ 
      value: issuer.issuer_name, 
      label: issuer.issuer_name 
  }));
}

// Exemplo de uso
const issuersData = [
  {
      "id": "674786b888fc73e267caae9f", 
      "issuer_name": "C6 Bank", 
      "issuer_type": "Banco Digital", 
      "created_at": "2024-11-27T22:03:50.051Z"
  },
  {
      "id": "784796c999ge74f378dbaf0g", 
      "issuer_name": "Nubank", 
      "issuer_type": "Banco Digital", 
      "created_at": "2024-11-28T10:15:30.123Z"
  },
  {
      "id": "894806d000hf85g489cbe1h", 
      "issuer_name": "Banco do Brasil", 
      "issuer_type": "Banco Tradicional", 
      "created_at": "2024-11-29T15:45:22.456Z"
  }
];

const result = transformIssuers(issuersData);
console.log(result);
// Saída: 
// [
//   { value: 'C6 Bank', label: 'C6 Bank' },
//   { value: 'Nubank', label: 'Nubank' },
//   { value: 'Banco do Brasil', label: 'Banco do Brasil' }
// ]