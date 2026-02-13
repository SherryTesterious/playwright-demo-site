const { test, expect } = require('@playwright/test');

test.describe('Mini HR E2E tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
  });

  test('Login as admin and see employee table', async ({ page }) => {

    await page.fill('#username', 'admin');
    await page.fill('#password', '1234');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/employees\.html$/);

    const deleteButton = page.locator('text=Delete').first();
    await expect(deleteButton).toBeVisible();

    const rows = page.locator('#employeeTable tr');
    await expect(rows).toHaveCount(5);

    await page.fill('#search', 'Employee 10');
    await expect(page.locator('#employeeTable tr')).toHaveCount(1);

    await page.fill('#search', '');
    await page.click('#next');
    await expect(page.locator('#pageInfo')).toHaveText('Page 2');

    await page.click('#employeeTable button');
    await page.click('#confirmDelete');

    await expect(page.locator('#employeeTable tr')).toHaveCount(5);
  });

  test('Logout redirects to login', async ({ page }) => {

    await page.fill('#username', 'admin');
    await page.fill('#password', '1234');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/employees\.html$/);

    await page.click('#logoutBtn');

    await expect(page).toHaveURL(/\/index\.html$/);
  });

});
