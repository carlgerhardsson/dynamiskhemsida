import { test, expect } from '@playwright/test';

// E2E test for the mail signup page

test.describe('Mailutskick', () => {
  test('användare kan anmäla sig till mailutskick', async ({ page }) => {
    await page.goto('/mail');
    await expect(page.getByRole('heading', { name: /mailutskick/i })).toBeVisible();
    await page.getByLabel(/ditt namn/i).fill('Testperson');
    await page.getByLabel(/e-post/i).fill('testperson@example.com');
    await page.getByRole('button', { name: /anmä[l|l] dig/i }).click();
    // Logga nätverkstrafik för POST
    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/api/mailutskick') && resp.request().method() === 'POST'),
      page.getByRole('button', { name: /anmä[l|l] dig/i }).click()
    ]);
    const status = response.status();
    const body = await response.json().catch(() => null);
    console.log('E2E POST /api/mailutskick', { status, body });
    // Kontrollera att bekräftelse visas (exakt text från komponenten)
    await expect(page.getByText('Tack för din anmälan till mailutskick!')).toBeVisible();
  });

  test('validering visas om fält saknas', async ({ page }) => {
    await page.goto('/mail');
    await page.getByRole('button', { name: /anmä[l|l] dig/i }).click();
    await expect(page.getByText(/namn.*krävs|e-post.*krävs/i)).toBeVisible();
  });
});
