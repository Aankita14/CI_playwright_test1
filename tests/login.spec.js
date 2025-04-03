/*Task: Automate User Authentication Flow Using Playwright
Scenario:
You are testing a web application that requires user authentication. Your goal is to automate the Login, Logout, and Invalid Login scenarios.*/

const {test,expect} = require('@playwright/test')
const { LoginPage } = require('../pages/LoginPage.js')

test.describe('Login Tests', ()=>{
    test('Successful Login',async({page})=>{
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user','secret_sauce');
        
        //verify Successful Login by checking the URL
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    });

    test('Invalid Login - Wrong password', async ({page})=>{
        const loginPage = new LoginPage(page)
        await loginPage.goto();
        await loginPage.login('standard_user','wrong_password');

        //verify error message
        const errorText = await loginPage.getErrorMessage();
        expect(errorText).toContain('username and password do not match')


    });
});