import { BasePage } from "./BasePage";
import {page, expect} from '@playwright/test';


export class InventoryPage extends BasePage {

    constructor(page) {
        super(page);
      this.inventoryDescription = page.getByTestId('inventory_item_description');
      this.cartBadge = page.getByTestId('shopping-cart-link');
      this.sortInventoryDropdown = page.getByTestId('product-sort-container');
      this.sortLowToHighOption = page.getByRole('option', { name: 'Price (low to high)' });
      this.inventoryItemPrice = page.getByTestId('inventory-item-price');
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
    async sortProductsLowToHigh(){
        await this.sortInventoryDropdown.selectOption('lohi');
    }
    async getAllProductPrices(){
        const count = await this.inventoryItemPrice.count();
        const prices = [];
        for (let i = 0; i < count; i++) {
            const priceElement = this.inventoryItemPrice.nth(i);
            prices.push(await this.numericValue(priceElement));
        }
        return prices;
    }
    async verifyProductSortedLowToHigh(){
        const prices = await this.getAllProductPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    }
}