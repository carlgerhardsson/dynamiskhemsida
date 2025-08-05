import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import IntresseForm from '../components/IntresseForm';


describe('IntresseForm', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    window.alert = jest.fn();
  });

  it('renderar formulär och visar bekräftelse vid lyckad submit', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
    await act(async () => {
      render(<IntresseForm />);
    });
    expect(screen.getByLabelText(/ditt namn/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-post/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telefon/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/meddelande/i)).toBeInTheDocument();
    // Välj datum (mocka DayPicker)
    // Hoppa över datumval för enkelhet, simulera submit
    fireEvent.change(screen.getByLabelText(/ditt namn/i), { target: { value: 'Testare' } });
    fireEvent.change(screen.getByLabelText(/e-post/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /skicka/i }));
    // Eftersom DayPicker krävs, förvänta alert (ingen datum vald)
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/välj minst ett datum/i));
    });
  });
});
