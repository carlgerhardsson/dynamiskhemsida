import { test, expect } from '@playwright/test';

test('användare kan lägga till och se kommentar på startsidan', async ({ page }) => {
  await page.goto('/');

  // Fyll i namn och kommentar
  await page.getByPlaceholder('Ditt namn').fill('E2E Testare');
  await page.getByPlaceholder('Din kommentar (max 300 tecken)').fill('Detta är en E2E-testkommentar.');

  // Skicka formuläret
  await page.getByRole('button', { name: /skicka kommentar/i }).click();

  // Kontrollera att kommentaren visas
  await expect(page.getByText('E2E Testare')).toBeVisible();
  await expect(page.getByText('Detta är en E2E-testkommentar.')).toBeVisible();
});
