import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

setDefaultTimeout(60 * 1000 * 2)

import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";

Then('Lets scrape everything', async function () {
    const count = await pageFixture.page.locator("//div[@class='inventory_list']").count();
    
    for(let i = 0; i <= count; i++){
        const itemName = await (await pageFixture.page.locator("//*[contains(text(),'Add to cart')]/../preceding-sibling::*/a/div").first().innerText()).split(" ");
        console.log(itemName)

        const itemDescr = await (await pageFixture.page.locator("//*[contains(text(),'Add to cart')]/../preceding-sibling::*/a/following-sibling::*").first().innerText()).split(" ", 10);
        console.log(itemDescr)

        const itemPrice = await (await pageFixture.page.locator("//*[contains(text(),'Add to cart')]/preceding-sibling::*").first().innerText()).replace(/[&\/\\#,+()$~%'":*?<>{}]/g,'');
        expect(Number(itemPrice)).toBeGreaterThan(0);
        console.log(itemPrice)

        await pageFixture.page.locator("//*[contains(text(),'Add to cart')]").first().click();
    }
});

Given('user selects a {string} and adds it to the cart', async function (product) {
    await pageFixture.page.locator("//div[@class='inventory_item_name' and contains(text(),'"+product+"')]/../../following-sibling::div/button").click();

});

Then('user verifies cart badge', async function () {
    const badgeCount = await pageFixture.page.locator("//span[@class='shopping_cart_badge']").textContent();
    expect(Number(badgeCount)).toBeGreaterThan(0);
});

Then('user navigates to the cart', async function () {
    await pageFixture.page.locator("//*[@class='shopping_cart_link']").click();
});

Then('user removes products from cart', async function () {
    const count = await pageFixture.page.getByText('Remove').count();
    for(let i = count; i > 0; i--){
        await pageFixture.page.locator("//button[text()='Remove']").first().click();
        //await pageFixture.page.locator("(//button[text()='Remove'])['"+i+"']").click();
    }
});

/**Examples: 
      | product       | price |
      | Fleece Jacket | 49.99 |
      | Backpack      | 29.99 |
 */