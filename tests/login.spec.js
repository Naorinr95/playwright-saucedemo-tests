const { test, expect } = require('../fixtures');
const { InventoryPage } = require('../pages/InventoryPage');
const { users } = require('../test-data/users');

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('valid user reaches the products page', async ({ page, loginPage }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await new InventoryPage(page).expectLoaded();
  });

  test('wrong password shows an error', async ({ loginPage }) => {
    await loginPage.login(users.wrongPassword.username, users.wrongPassword.password);
    await loginPage.expectError('Username and password do not match');
    await loginPage.expectOnLoginPage();
  });

  test('locked out user cannot log in', async ({ loginPage }) => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await loginPage.expectError('this user has been locked out');
  });

  test('empty username shows a required message', async ({ loginPage }) => {
    await loginPage.password.fill(users.standard.password);
    await loginPage.loginButton.click();
    await loginPage.expectError('Username is required');
  });

  test('logout returns to the login page', async ({ page, loginPage }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    const inventory = new InventoryPage(page);
    await inventory.expectLoaded();
    await inventory.logout();
    await loginPage.expectOnLoginPage();
  });
});
