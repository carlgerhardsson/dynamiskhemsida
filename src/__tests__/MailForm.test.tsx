import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import MailForm from '../components/MailForm';

describe('MailForm', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
      // Första anropet: GET /api/mailutskick (CSRF-token)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ csrfToken: 'testtoken' })
      })
      // Andra anropet: POST /api/mailutskick (formulär)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({})
      });
  });

  it('renderar formulär och skickar in', async () => {
    await act(async () => {
      render(<MailForm />);
    });
    expect(screen.getByLabelText(/ditt namn/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-post/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /anmäl dig/i })).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/ditt namn/i), { target: { value: 'Testare' } });
    fireEvent.change(screen.getByLabelText(/e-post/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /anmäl dig/i }));

    await waitFor(() => {
      expect(screen.getByText(/tack för din anmälan/i)).toBeInTheDocument();
    });
  });
});
