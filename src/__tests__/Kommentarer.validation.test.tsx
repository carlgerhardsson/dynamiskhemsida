import '@testing-library/jest-dom';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import Kommentarer from '../components/Kommentarer';


describe('Kommentarer validering', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      status: 200,
      json: async () => [],
    } as Response));
  });

  it('visar fel om namn eller text saknas', async () => {
    await act(async () => {
      render(<Kommentarer />);
    });
    fireEvent.change(screen.getByPlaceholderText(/ditt namn/i), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText(/din kommentar/i), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /skicka kommentar/i }));
    screen.debug();
    await waitFor(() => {
      expect(
        screen.getByText((content) =>
          content.replace(/\s/g, '').includes('Fyllibådenamnochkommentar.')
        )
      ).toBeInTheDocument();
    });
  });

  it('visar fel om kommentaren är för lång', async () => {
    await act(async () => {
      render(<Kommentarer />);
    });
    fireEvent.change(screen.getByPlaceholderText(/ditt namn/i), { target: { value: 'Testare' } });
    fireEvent.change(screen.getByPlaceholderText(/din kommentar/i), { target: { value: 'a'.repeat(301) } });
    fireEvent.click(screen.getByRole('button', { name: /skicka kommentar/i }));
    expect(await screen.findByText(/max 300 tecken/i)).toBeInTheDocument();
  });
});
