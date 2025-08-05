import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IntresseForm from '../components/IntresseForm';

describe('IntresseForm', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;
  });

  it('renderar formuläret och kan fylla i namn och e-post', async () => {
    render(<IntresseForm />);
    const namnInput = screen.getByLabelText(/ditt namn/i);
    const emailInput = screen.getByLabelText(/e-post/i);
    await userEvent.type(namnInput, 'Testperson');
    await userEvent.type(emailInput, 'test@example.com');
    expect(namnInput).toHaveValue('Testperson');
    expect(emailInput).toHaveValue('test@example.com');
  });
});
