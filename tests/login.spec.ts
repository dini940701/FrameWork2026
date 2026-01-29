import { test,expect } from '../fixtures/basefixture.js';
import { LoginPage } from '../POM/LoginPage.js';

test('Successfull login',{
    tag:['@smoke','@regression'],
    annotation:[
        {type:'story',description:'Login Page validation'}
    ]
    },async({homePage})=>{
        await expect(homePage.page).toHaveTitle('My Account');
});

test.skip('Invalid Login',{
    tag:['@smoke','@regression'],
    annotation:[
        {type:'story',description:'Login Page validation'}
    ]
    },async({page,baseURL})=>{
        const loginPage=new LoginPage(page);
        await loginPage.goto(baseURL);
        await loginPage.doLogin('1@dinesh','Dini1994');
        const failedLogin=await loginPage.failedLogin();
        expect(failedLogin).toContain('Warning');
});
