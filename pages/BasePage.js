export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    const url = process.env.BASE_URL;
    await this.page.goto(url);
  } 
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

}
