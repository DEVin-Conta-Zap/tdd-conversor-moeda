
export type ResultProps = {
  value: string | number;
  coin: string;
}

type FormProps = {
  onSubmit: (value: ResultProps) => void
}

const Form = ({ onSubmit }: FormProps) => {

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const { value, coin } = e.target.elements;

    onSubmit({
      coin: coin.value,
      value: value.value
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='value'>Valor</label>
      <input type="number" id="value" />

      <label htmlFor='coin'>Moeda</label>
      <select id="coin">
        <option value="USD">Dolar americano</option>
        <option value="EUR">Euro</option>
      </select>

      <button type='submit'>Calcular</button>
    </form>
  )
}

export default Form;