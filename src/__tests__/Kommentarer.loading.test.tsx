import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Kommentarer from '../components/Kommentarer';

describe('Kommentarer loading', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => new Promise(() => {})); // never resolves
  });

  it('visar laddningsindikator när loading är true', async () => {
    await act(async () => {
      render(<Kommentarer />);
    });
    // Fyll i giltiga värden och trigga submit
    fireEvent.change(screen.getByPlaceholderText(/ditt namn/i), { target: { value: 'Testare' } });
    fireEvent.change(screen.getByPlaceholderText(/din kommentar/i), { target: { value: 'Hej' } });
    fireEvent.click(screen.getByRole('button', { name: /skicka kommentar/i }));
    expect(screen.getByRole('button', { name: /skicka kommentar/i })).toBeDisabled();
  });
});
