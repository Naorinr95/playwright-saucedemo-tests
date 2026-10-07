const { test, expect } = require('../fixtures');
const { checkoutInfo } = require('../test-data/users');

test.describe('Cart and checkout', () => {
  test('cart shows the items that were added', async ({ inventoryPage, cartPage }) => {
    const items = ['Sauce Labs Backpack', 'Sauce Labs Onesie'];
    for (const item of items) {
      await inventoryPage.addToCart(item);
    }
    await inventoryPage.openCart();
    await cartPage.expectItems(items);
  });

  test('completes a purchase of two items end to end', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    const items = ['Sauce Labs Backpack', 'Sauce Labs Onesie'];
    let expectedTotal = 0;
    for (const item of items) {
      expectedTotal += await inventoryPage.priceOf(item);
      await inventoryPage.addToCart(item);
    }

    await inventoryPage.openCart();
    await cartPage.expectItems(items);
    await cartPage.checkout();

    await checkoutPage.fillInformation(
      checkoutInfo.firstName,
      checkoutInfo.lastName,
      checkoutInfo.postalCode,
    );
    await checkoutPage.continue();
    await checkoutPage.expectSubtotal(expectedTotal);

    await checkoutPage.finish();
    await checkoutPage.expectOrderComplete();
  });

  test('checkout requires a first name', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.checkout();

    await checkoutPage.fillInformation('', checkoutInfo.lastName, checkoutInfo.postalCode);
    await checkoutPage.continue();
    await expect(checkoutPage.error).toContainText('First Name is required');
  });
});
