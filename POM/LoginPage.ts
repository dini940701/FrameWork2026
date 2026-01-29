import { Page,Locator } from '@playwright/test';
import { ElementUtil } from '../utilities/ElementUtil.js';
import { Registration } from '../POM/Registration.js';
import { HomePage } from './HomePage.js';

export class LoginPage{
    private readonly page:Page;
    private readonly eleUtil:ElementUtil;
    private readonly userName:Locator;
    private readonly password:Locator;
    private readonly loginButton:Locator;
    private readonly errorMessage:Locator;
    private readonly continueButton:Locator;

    constructor(page:Page){
        this.page=page;
        this.userName=page.locator('input[placeholder=\'E-Mail Address\']');
        this.password=page.locator('input[placeholder=\'Password\']');
        this.loginButton=page.locator('input[type="submit"]');
        this.errorMessage=page.locator('//div[contains(text(),\' Warning\')]');
        this.continueButton=page.getByRole('link',{name:'Continue'});
        this.eleUtil=new ElementUtil(page);
    }

    async goto(baseURL:string|undefined){
        await this.page.goto(baseURL+'route=account/login');
    }
    
    async doLogin(userName:string,password:string){
        await this.eleUtil.doFill(this.userName,userName);
        await this.eleUtil.doFill(this.password,password);
        await this.eleUtil.doClick(this.loginButton);
        return new HomePage(this.page);
    }

    async failedLogin():Promise<string>{
        await this.eleUtil.waitForElementVisible(this.errorMessage,5000);
        const errorMessage=await this.eleUtil.getInnerText(this.errorMessage);
        return errorMessage;
    }

    async newAccount(){
        await this.eleUtil.doClick(this.continueButton);
        return new Registration(this.page);
    }
}