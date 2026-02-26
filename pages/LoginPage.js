import { BasePage } from "./BasePage";
import {page, expect} from '@playwright/test';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.inventoryList = page.getByTestId('inventory-container');
  }
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
    async verifyLoginSuccess() {
    await expect(this.inventoryList).toBeVisible();
  }
}