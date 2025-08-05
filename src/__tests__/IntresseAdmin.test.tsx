import '@testing-library/jest-dom';
import { render, screen, waitFor, act } from '@testing-library/react';
import IntresseAdmin from '../components/IntresseAdmin';

describe('IntresseAdmin', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('visar laddning och sedan data', async () => {
    // Mocka API-svar
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ json: async () => ([{ id: 1, namn: 'Anna', email: 'anna@example.com', createdAt: '2025-08-05', dates: '2025-08-10' }]) })
      .mockResolvedValueOnce({ json: async () => ([{ id: 1, namn: 'Bosse', email: 'bosse@example.com', createdAt: '2025-08-05' }]) });

    await act(async () => {
      render(<IntresseAdmin />);
    });

    expect(screen.getByText(/intresseanmälningar per datum/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Anna')).toBeInTheDocument();
      expect(screen.getByText('Bosse')).toBeInTheDocument();
    });
  });

  it('visar felmeddelande vid fetch-fel', async () => {
    (global.fetch as jest.Mock)
      .mockImplementationOnce(() => Promise.reject(new Error('fail')))
      .mockImplementationOnce(() => Promise.reject(new Error('fail')));
    await act(async () => {
      render(<IntresseAdmin />);
    });
    await waitFor(() => {
      expect(screen.getAllByText(/kunde inte hämta data/i)).toHaveLength(2);
    });
  });
});
