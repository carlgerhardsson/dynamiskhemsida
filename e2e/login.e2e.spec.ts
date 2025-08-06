import { test, expect } from '@playwright/test';

test.describe('Inloggning och skyddade sidor', () => {
  test('omdirigeras till login om ej inloggad', async ({ page, context }) => {
  });

  test('kan logga in och se startsidan', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/användarnamn/i).fill('admin');
    await page.getByLabel(/lösenord/i).fill('admin123');
    await page.getByRole('button', { name: /logga in/i }).click();
    await expect(page.getByText(/välkommen!/i)).toBeVisible();
  });

  test('felmeddelande vid felaktig inloggning', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/användarnamn/i).fill('fel');
    await page.getByLabel(/lösenord/i).fill('fel');
    await page.getByRole('button', { name: /logga in/i }).click();
    await expect(page.getByText(/fel användarnamn eller lösenord/i)).toBeVisible();
  });

  test('kan logga ut och omdirigeras till login', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/användarnamn/i).fill('admin');
    await page.getByLabel(/lösenord/i).fill('admin123');
    await page.getByRole('button', { name: /logga in/i }).click();
    await expect(page.getByText(/välkommen!/i)).toBeVisible();
    await page.getByRole('button', { name: /logga ut/i }).click();
    await expect(page.getByLabel(/användarnamn/i)).toBeVisible();
  });
});
