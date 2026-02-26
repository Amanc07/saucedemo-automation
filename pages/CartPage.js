import { BasePage } from "./BasePage";
import {page, expect} from '@playwright/test';


export class CartPage extends BasePage {

    constructor(page) {
      super(page);
      this.cartItem=page.getByTestId('inventory-item');
      this.CheckoutButton=page.getByTestId('checkout');
      this.cartItemPrice=page.getByTestId('inventory-item-price');
    }
    async clickCheckout(){
        await this.CheckoutButton.click();
    }
    async verifyCartPage(){
        await expect(this.cartItem).toBeVisible();
    }
    async getCartItemPrice(){
        return await this.numericValue(this.cartItemPrice);
    }
    
}