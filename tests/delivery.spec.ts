import {expect, Locator, test} from "@playwright/test";

test('with incorrect credentials check auth error', async ({ page }) => {
    // Open the page with given url
    const URL = 'https://fe-delivery.tallinn-learning.ee/signin'
    await page.goto(URL);

    const username: Locator = page.getByTestId('username-input')
    const password: Locator = page.getByTestId('password-input')
    const signIn: Locator = page.getByTestId('signIn-button')
    const error: Locator = page.getByTestId('authorizationError-popup')

    await username.fill('randomname')
    await password.fill('randomvalue')
    await signIn.click();

    await expect(error).toBeVisible();
});