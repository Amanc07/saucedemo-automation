import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { Messages } from '../../utils/Messages';

test.describe('Login Tests', () => {
    test('should login successfully with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD);
        await loginPage.verifyLoginSuccess();
    });

    test('should fail to login with locked out user', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.LOCKED_OUT_USER, process.env.PASSWORD);
        await loginPage.verifyLoginFailure(Messages.Login.LOCKED_OUT_USER);});
});