// Public demo credentials published on https://www.saucedemo.com
const users = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  wrongPassword: { username: 'standard_user', password: 'wrong_password' },
};

const checkoutInfo = {
  firstName: 'Test',
  lastName: 'User',
  postalCode: '12345',
};

module.exports = { users, checkoutInfo };
