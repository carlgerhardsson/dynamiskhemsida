import { test, expect } from '@playwright/test';

test.describe('Mailutskick - validering', () => {
  test('visar felmeddelande om endast namn fylls i', async ({ page }) => {
    await page.goto('/mail');
    await page.getByLabel(/ditt namn/i).fill('Testperson');
    await page.getByRole('button', { name: /anmä[l|l] dig/i }).click();
    await expect(page.getByText(/e-post.*krävs/i)).toBeVisible();
  });

  test('visar felmeddelande om endast e-post fylls i', async ({ page }) => {
    await page.goto('/mail');
    await page.getByLabel(/e-post/i).fill('testperson@example.com');
    await page.getByRole('button', { name: /anmä[l|l] dig/i }).click();
    await expect(page.getByText(/namn.*krävs/i)).toBeVisible();
  });
});
