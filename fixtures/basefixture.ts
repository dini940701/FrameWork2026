import { test as base,expect } from '@playwright/test';
// Creating base as an alice of test to extend it later.
// We want to extend Playwright’s default test with custom fixtures.
// Renaming avoids confusion when we later export a new extended test.
import { LoginPage } from '../POM/LoginPage.js';
import { HomePage } from '../POM/HomePage.js';

// Defining a Custom Fixture Type
type myFixture={
    homePage:HomePage;
// Declares a fixture named homePage of type HomePage.
}

// Extending Playwright’s Base Test
// base.extend() → Playwright fixture extension
// Creates a new test object with custom fixtures.
// Adds homePage fixture to Playwright.
// Avoids repeating login logic in every test.
// Makes login automatic and reusable.
// Ensures all tests start from a known authenticated state.
export const test=base.extend<myFixture>({
// Defining the homePage Fixture
// page → Browser page provided by Playwright required for browser interaction
// baseURL → URL from playwright.config.ts to keep URL environment-independent
// use → Supplies the fixture to tests which controls when fixture is available and cleaned up
// testInfo → Metadata about the running test to access project-level configuration
// Creates an asynchronous fixture lifecycle
    homePage:async({page,baseURL},use,testInfo)=>{
// Initializes login page with Playwright’s page.
        const loginPage=new LoginPage(page);
        await loginPage.goto(baseURL);
// Reading Credentials from Project Metadata
        const userName=testInfo.project.metadata.appUserName;
        const password=testInfo.project.metadata.appPassword;
        const homePage=await loginPage.doLogin(userName,password);
        expect(homePage.isUserLoggedIn()).toBeTruthy();
// Makes homePage available to the test body.
        await use(homePage);
    }
});
// Makes expect available from this custom test module.
export {expect};
