const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.items = page.locator('.cart_item');
    this.itemNames = page.locator('.cart_item .inventory_item_name');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectItems(names) {
    await expect(this.page).toHaveURL(/cart\.html/);
    await expect(this.itemNames).toHaveText(names);
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
