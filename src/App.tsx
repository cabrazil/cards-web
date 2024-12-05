import React from 'react';
import SearchForm from './components/SearchForm';
import CreditCardList from './components/CreditCardList';
import { Header } from './components/Header';

const App: React.FC = () => {
  const handleSearch = (segment: string, issuer: string) => {
    // Aqui você pode chamar a API GET e passar os parâmetros para o componente CreditCardList
    console.log('Buscando cartões de crédito:', segment, issuer);
  };

  return (
    <div>
      <Header />
      <SearchForm onSearch={handleSearch} />
      <CreditCardList segment="ENTRADA" issuer="NUBANK" />
    </div>
  );
};

export default App;