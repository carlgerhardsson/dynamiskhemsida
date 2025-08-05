import { test, expect } from '@playwright/test';

// E2E test for the mail signup page

test.describe('Mailutskick', () => {
  test('användare kan anmäla sig till mailutskick', async ({ page }) => {
    await page.goto('/mail');
    await expect(page.getByRole('heading', { name: /mailutskick/i })).toBeVisible();
    await page.getByLabel('Namn').fill('Testperson');
    await page.getByLabel('E-post').fill('testperson@example.com');
    await page.getByRole('button', { name: /skicka/i }).click();
    // Kontrollera att bekräftelse visas (justera texten efter din implementation)
    await expect(page.getByText(/tack|bekräftelse|du är nu anmäld/i)).toBeVisible();
  });

  test('validering visas om fält saknas', async ({ page }) => {
    await page.goto('/mail');
    await page.getByRole('button', { name: /skicka/i }).click();
    await expect(page.getByText(/namn.*krävs|e-post.*krävs/i)).toBeVisible();
  });
});
