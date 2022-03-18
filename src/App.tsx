import { useState } from 'react';
import './App.css';
import Form, { ResultProps } from './components/Form';
import Highlight from './components/Highlight';
import { multiply } from './utils/math';

function App() {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  const handleSubmit = async ({
    value,
    coin
  }: ResultProps) => {
    const res = await fetch(`http://economia.awesomeapi.com.br/json/last/${coin}-BRL`);

    const data = await res.json();

    if(!res.ok) {
      setError(data.message);
      return;
    }

    const result = multiply(data[`${coin}BRL`].ask, value).toFixed(2);

    setValue(result);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}/>
      <Highlight value={value}/>
      {error && <div role="alert">{error}</div>}
    </>
  );
}

export default App;
