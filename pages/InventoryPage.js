const { expect } = require('@playwright/test');

// 'Sauce Labs Backpack' -> 'sauce-labs-backpack'
const slug = (name) => name.toLowerCase().replace(/\s+/g, '-');

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.items = page.locator('.inventory_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.title).toHaveText('Products');
  }

  async names() {
    return this.itemNames.allTextContents();
  }

  async prices() {
    const texts = await this.itemPrices.allTextContents();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }

  async priceOf(name) {
    const text = await this.page
      .locator('.inventory_item', { hasText: name })
      .locator('.inventory_item_price')
      .innerText();
    return parseFloat(text.replace('$', ''));
  }

  // option: 'az', 'za', 'lohi' or 'hilo'
  async sortBy(option) {
    await this.sortSelect.selectOption(option);
  }

  async addToCart(name) {
    await this.page.locator(`[data-test="add-to-cart-${slug(name)}"]`).click();
  }

  async removeFromCart(name) {
    await this.page.locator(`[data-test="remove-${slug(name)}"]`).click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}

module.exports = { InventoryPage };
