import { test, expect, Locator } from '@playwright/test';

// Scenarios to implement
// 1.
// Button disabled until inputs not filled
// 2.
// All elements are visible on page open, 2 inputs and 1 button
// 3.
// Fill the username and correct email, then click button and assert that OK popup is visible
// 4.
// Failing test with empty spaces in input
// 5.
// Button disabled when not both inputs filled

test.beforeEach(async ({ page }) => {
  const path = require('path');
  const filePath = `file://${path.resolve('html/dummy-order.html')}`;
  await page.goto(filePath);
})

test('all elements are visible', async ({ page }) => {
  // All elements are defined
  const orderButton: Locator = page.getByTestId('submit-order')
  const usernameField: Locator = page.getByTestId('username')
  const emailField: Locator = page.getByTestId('email')

  // Check elements visibility
  await expect (orderButton).toBeVisible();
  await expect (usernameField).toBeVisible();
  await expect (emailField).toBeVisible();
  await expect (orderButton).toBeDisabled();
});

test('fill elements and place order', async ({ page }) => {
  // All elements are defined
  const orderButton: Locator = page.getByTestId('submit-order')
  const usernameField: Locator = page.getByTestId('username')
  const emailField: Locator = page.getByTestId('email')
  const popupOK: Locator = page.locator('#popup-message')

  await usernameField.fill('myUserName')
  await emailField.fill('email@email.com')
  await orderButton.click();

  // Ensure OK is visible
  await expect(popupOK).toBeVisible();
});

test('verify email field validation', async ({ page }) => {
  // All elements are defined
  const orderButton: Locator = page.getByTestId('submit-order')
  const usernameField: Locator = page.getByTestId('username')
  const emailField: Locator = page.getByTestId('email')

  await usernameField.fill('myUserName')
  await emailField.fill('email@email')

  await expect(orderButton).toBeDisabled();

});

test('verify that username is required in the flow', async ({ page }) => {
  // All elements are defined
  const orderButton: Locator = page.getByTestId('submit-order')
  const emailField: Locator = page.getByTestId('email')

  await emailField.fill('email@email')

  await expect(orderButton).toBeDisabled();
});


