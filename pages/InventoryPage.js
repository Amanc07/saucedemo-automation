import { BasePage } from "./BasePage";
import {page, expect} from '@playwright/test';


export class InventoryPage extends BasePage {

    constructor(page) {
        super(page);
      this.inventoryDescription = page.getByTestId('inventory_item_description');
      this.cartBadge = page.getByTestId('shopping-cart-link');
    }

    addToCartButton(productName){
        return this.page.getByTestId(`add-to-cart-${productName}`);
    }
    removeFromCartButton(productName){
        return this.page.getByTestId(`remove-${productName}`);
    }

    async addProductToCart(productName){
        await this.addToCartButton(productName).click();
    }
    async verifyProductAddedToCart(productName){
        await expect(this.removeFromCartButton(productName)).toBeVisible();
    }
    async goToCart(){
        await this.cartBadge.click();
    }
}