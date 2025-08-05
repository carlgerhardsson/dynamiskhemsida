import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Kommentarer from '../components/Kommentarer';

describe('Kommentarer-komponenten', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  });

  it('renderar rubrik och formulär', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve([]),
    });
    await act(async () => {
      render(<Kommentarer />);
    });
    expect(screen.getByPlaceholderText(/ditt namn/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /skicka kommentar/i })).toBeInTheDocument();
  });

  it('visar kommentar och kan posta ny', async () => {
    // Första GET (initial fetch)
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve([
        { id: 1, namn: 'Testare', text: 'Kommentartext', createdAt: new Date().toISOString() },
      ]),
    });
    await act(async () => {
      render(<Kommentarer />);
    });
    expect(await screen.findByText('Kommentartext')).toBeInTheDocument();

    // POST (skicka ny kommentar)
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve([
        { id: 2, namn: 'Anna', text: 'Ny kommentar', createdAt: new Date().toISOString() },
      ]),
    });
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/ditt namn/i), { target: { value: 'Anna' } });
      fireEvent.change(screen.getByPlaceholderText(/din kommentar/i), { target: { value: 'Ny kommentar' } });
      fireEvent.click(screen.getByRole('button', { name: /skicka kommentar/i }));
    });

    await waitFor(async () => {
      expect(await screen.findByText('Ny kommentar')).toBeInTheDocument();
    });
  });
});
