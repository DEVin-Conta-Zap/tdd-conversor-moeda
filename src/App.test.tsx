import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';
import App from './App'

beforeAll(() => jest.spyOn(window, "fetch"));

describe('<App />', () => {
  

  test('shows the amount in brazilian real after submit', async () => {
    render(<App/>)

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        USDBRL: { ask: "5.16" } 
      })
    });

    userEvent.type(screen.getByLabelText(/valor/i), "3000");
    userEvent.selectOptions(screen.getByLabelText(/moeda/i), "USD")
    userEvent.click(screen.getByRole("button", { name: /calcular/i}));

    act(() => {
      expect(window.fetch).toHaveBeenCalledWith("http://economia.awesomeapi.com.br/json/last/USD-BRL");
    })
    

  })
})