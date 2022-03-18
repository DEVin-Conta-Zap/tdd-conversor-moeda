import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

beforeAll(() => jest.spyOn(window, "fetch"));

describe('<App />', () => {
  

  test('shows the amount in brazilian real after submit', async () => {
    render(<App/>);

    (window.fetch as unknown as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        USDBRL: { ask: "5.16" } 
      })
    });

    userEvent.type(screen.getByLabelText(/valor/i), "3000");
    userEvent.selectOptions(screen.getByLabelText(/moeda/i), "USD")
    userEvent.click(screen.getByRole("button", { name: /calcular/i}));

    await waitFor(async () => {
      expect(window.fetch).toHaveBeenCalledWith("http://economia.awesomeapi.com.br/json/last/USD-BRL");
    })
    expect(window.fetch).toHaveBeenCalledTimes(1);
    
    expect(await screen.findByText("15480.00")).toBeInTheDocument();
  })

  test('renders on error message from the server', async () => {
    const testError = "test error"
    render(<App/>);

    (window.fetch as unknown as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        message: testError 
      })
    });

    userEvent.type(screen.getByLabelText(/valor/i), "3000");
    userEvent.selectOptions(screen.getByLabelText(/moeda/i), "USD")
    userEvent.click(screen.getByRole("button", { name: /calcular/i}));
    
    // await waitFor(async () => {
    //   expect(screen.getByRole('alert')).toHaveTextContent(testError);
    // });
    expect(await screen.findByRole('alert')).toHaveTextContent(testError);
  })
})