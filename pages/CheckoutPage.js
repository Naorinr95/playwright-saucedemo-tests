const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.subtotal = page.locator('[data-test="subtotal-label"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.error = page.locator('[data-test="error"]');
  }

  async fillInformation(firstName, lastName, postalCode) {
    if (firstName) await this.firstName.fill(firstName);
    if (lastName) await this.lastName.fill(lastName);
    if (postalCode) await this.postalCode.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async expectSubtotal(total) {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
    await expect(this.subtotal).toContainText(`$${total.toFixed(2)}`);
  }

  async finish() {
    await this.finishButton.click();
  }

  async expectOrderComplete() {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}

module.exports = { CheckoutPage };
