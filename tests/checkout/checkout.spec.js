import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { Messages } from '../../utils/Messages';
import { constants } from '../../utils/constants';
import { CartPage } from '../../pages/CartPage';

test.describe('checkout workflow', () => {
    test('checkout product', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const checkoutPage = new CheckoutPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD);
        await loginPage.verifyLoginSuccess();
        await inventoryPage.addProductToCart(constants.PRODUCT_NAME);
        await inventoryPage.verifyProductAddedToCart(constants.PRODUCT_NAME);
        await inventoryPage.goToCart();
        await cartPage.verifyCartPage();
        const cartPrice = await cartPage.getCartItemPrice();
        await cartPage.clickCheckout();
        await checkoutPage.verifyCheckoutInformationPage();
        await checkoutPage.fillCheckoutInformation(constants.FIRST_NAME, constants.LAST_NAME, constants.POSTAL_CODE);
        await checkoutPage.clickContinue();
        await checkoutPage.verifysubTotalMatchesCartItemPrice(cartPrice);
        await checkoutPage.verifyTotalMatchesCalculatedTotal(); 
        await checkoutPage.clickFinish();
        await checkoutPage.verifyCheckoutComplete(Messages.OrderComplete.ORDER_COMPLETE_TEXT);
    });
    test('shows an error if last name is missing', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const checkoutPage = new CheckoutPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD);
        await loginPage.verifyLoginSuccess();
        await inventoryPage.addProductToCart(constants.PRODUCT_NAME);
        await inventoryPage.verifyProductAddedToCart(constants.PRODUCT_NAME);
        await inventoryPage.goToCart();
        await cartPage.verifyCartPage();
        await cartPage.clickCheckout();
        await checkoutPage.verifyCheckoutInformationPage();
        await checkoutPage.fillCheckoutInformation(constants.FIRST_NAME, '', constants.POSTAL_CODE);
        await checkoutPage.clickContinue();
        await checkoutPage.verifyFormErrorMessage(Messages.CheckoutInformation.FORM_ERROR_MESSAGE);
    });

});