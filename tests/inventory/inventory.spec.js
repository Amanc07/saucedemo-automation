import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Inventory Tests', () => {
    test('sort low to high', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD);
        await loginPage.verifyLoginSuccess();
        await inventoryPage.sortProductsLowToHigh();
        await inventoryPage.verifyProductSortedLowToHigh();
    });
});