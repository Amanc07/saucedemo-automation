import { BasePage } from "./BasePage";
import {page, expect} from '@playwright/test';


export class CheckoutPage extends BasePage {

    constructor(page) {
      super(page);
      this.checkoutInfo=page.getByTestId('checkout-info-container');
      this.firstNameInput=page.getByTestId('firstName');
      this.lastNameInput=page.getByTestId('lastName');
      this.postalCodeInput=page.getByTestId('postalCode');
      this.continueButton=page.getByTestId('continue');
      this.subTotal=page.getByTestId('subtotal-label');
      this.tax=page.getByTestId('tax-label');
      this.total=page.getByTestId('total-label');
      this.finishButton=page.getByTestId('finish');
      this.orderCompletePage=page.getByTestId('checkout-complete-container');
      this.orderCompleteText=page.getByTestId('complete-header');
    }

    async fillCheckoutInformation(firstName, lastName, postalCode){
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }
    async clickContinue(){
        await this.continueButton.click();
    }
    async clickFinish(){
        await this.finishButton.click();
    }
    async verifyCheckoutInformationPage(){
        await expect(this.checkoutInfo).toBeVisible();
    }
    async verifysubTotalMatchesCartItemPrice(cartItemPrice){
        const subTotalValue = await this.numericValue(this.subTotal);
        expect(subTotalValue).toBe(cartItemPrice);
    }
    async calculateTotal(){
        const subTotalValue = await this.numericValue(this.subTotal);
        const taxValue = await this.numericValue(this.tax);
        return subTotalValue + taxValue;
    }
    async verifyTotalMatchesCalculatedTotal(){
        const calculatedTotal = await this.calculateTotal();
        const totalValue = await this.numericValue(this.total);
        expect(totalValue).toBe(calculatedTotal);
    }
    async verifyCheckoutComplete(orderCompleteText){
        await expect(this.orderCompletePage).toBeVisible();
        await expect(this.orderCompleteText).toHaveText(orderCompleteText);

    }


}