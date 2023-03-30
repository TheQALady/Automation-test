import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2)

Given('User navigates to the E-commerce website', async function () {
    await pageFixture.page.goto("https://www.saucedemo.com/");
})

Given('User enters the username as {string}', async function (username) {
    await pageFixture.page.locator('#user-name').type(username);
});

Given('User enters the password as {string}', async function (password) {
    await pageFixture.page.locator('#password').type(password);
})

When('User clicks login button', async function () {
    await pageFixture.page.locator('#login-button').click();
});

Then('Login should be success', async function () {
    await expect(pageFixture.page.getByText('Products')).toBeVisible();
    console.log("Login successful");
})

When('Login should fail', async function () {
    await expect(pageFixture.page.locator('text=Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
    console.log("Login failed");
});
