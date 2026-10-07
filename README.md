# Playwright Tests for SauceDemo

End-to-end UI tests for the demo shop [saucedemo.com](https://www.saucedemo.com), built with **Playwright** and **JavaScript** using the **Page Object Model** and custom **fixtures**, with a **GitHub Actions** pipeline that runs on three browsers and publishes the HTML report.

![Playwright Tests](https://github.com/Naorinr95/playwright-saucedemo-tests/actions/workflows/playwright.yml/badge.svg?branch=main)

**[View the latest test report](https://naorinr95.github.io/playwright-saucedemo-tests/)**, published automatically to GitHub Pages after every run on `main`.

## What is tested

| Area | Scenario |
|------|----------|
| Login | Valid user reaches the products page |
| Login | Wrong password shows an error |
| Login | Locked-out user cannot log in |
| Login | Empty username shows a required message |
| Login | Logout returns to the login page |
| Inventory | Lists six products |
| Inventory | Sorts by price from low to high |
| Inventory | Sorts by name from Z to A |
| Inventory | Adding and removing items updates the cart badge |
| Cart | Cart shows the items that were added |
| Checkout | Purchase of two items end to end, with the item total checked |
| Checkout | Checkout requires a first name |

12 tests, each run on Chromium, Firefox and WebKit.

## Tech stack

- Playwright Test, JavaScript, Node.js 22
- Page Object Model (`LoginPage`, `InventoryPage`, `CartPage`, `CheckoutPage`)
- Custom fixtures (`inventoryPage` arrives already logged in)
- Test data kept separate from test code
- Retries, traces on first retry and screenshots on failure in CI
- GitHub Actions with an HTML report artifact

## Getting started

```bash
git clone https://github.com/Naorinr95/playwright-saucedemo-tests.git
cd playwright-saucedemo-tests
npm ci
npx playwright install
```

## Running the tests

```bash
npm test                  # all browsers, headless
npm run test:chromium     # one browser
npm run test:headed       # watch the browser
npm run test:ui           # Playwright UI mode
npm run report            # open the last HTML report
```

## Project structure

```
pages/                 Page objects
fixtures/              Custom fixtures that create the page objects
tests/                 Test specs (login, inventory, checkout)
test-data/             Users and checkout details
playwright.config.js   Browsers, retries, reporters and base URL
.github/workflows/     CI pipeline
```

## Continuous integration

On every push to `main`, on pull requests and on demand, GitHub Actions installs dependencies and browsers, runs all tests, and uploads the `playwright-report` artifact.

On pushes to `main` (and manual runs), a second job publishes the HTML report to **GitHub Pages**, so the latest results are always available at the link above. This happens even when a test fails, so the failing report can be opened straight away. Pull requests run the tests but do not publish.

## Notes

- The site under test is a public demo shop, and the credentials used are the ones published on its login page. No real accounts or data are involved.
- Possible extensions: visual comparison tests, tests for the other demo users, and API checks on a separate service.

## Author

**Rifat Naorin**, Software QA Engineer

[GitHub](https://github.com/Naorinr95)
