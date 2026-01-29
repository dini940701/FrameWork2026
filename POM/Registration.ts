import { Page,Locator } from '@playwright/test';
import { ElementUtil } from '../utilities/ElementUtil.js';

export class Registration{
    private readonly eleUtil:ElementUtil;
    private readonly page:Page;
    private readonly firstName:Locator;
    private readonly lastName:Locator;
    private readonly emailId:Locator;
    private readonly telphone:Locator;
    private readonly password:Locator;
    private readonly confirmPassword:Locator;
    private readonly newsLetterYesRadio:Locator;
    private readonly newsLetterNoRadio:Locator;
    private readonly privacyCheckbox:Locator;
    private readonly submitButton:Locator;
    private readonly successMessage:Locator;

    constructor(page:Page){
        this.page=page;
        this.eleUtil=new ElementUtil(page);
        this.firstName=page.getByPlaceholder('First Name');
        this.lastName=page.getByPlaceholder('Last Name');
        this.emailId=page.locator('input[name=\'email\']');
        this.telphone=page.getByPlaceholder('Telephone');
        this.password=page.locator('//input[@name=\'password\']');
        this.confirmPassword=page.locator('//input[@placeholder=\'Password Confirm\']');
        this.newsLetterYesRadio=page.getByRole('radio', { name: 'Yes', checked: false });
        this.newsLetterNoRadio=page.getByRole('radio', { name: 'No', checked: true });
        this.privacyCheckbox=page.locator('[name="agree"]');
        this.submitButton=page.getByRole('button', { name: 'Continue' });
        this.successMessage=page.getByText('Your Account Has Been Created!', { exact: true });

    }

    async dosignUp(
        firstName:string,
        lastName:string,
        emailId:string,
        telephone:string,
        password:string,
        confirmPassword:string,
        subscribeNewsLetter:string,
        ){
        await this.eleUtil.doFill(this.firstName,firstName);
        await this.eleUtil.doFill(this.lastName,lastName);
        await this.eleUtil.doFill(this.emailId,emailId);
        await this.eleUtil.doFill(this.telphone,telephone);
        await this.eleUtil.doFill(this.password,password);
        await this.eleUtil.doFill(this.confirmPassword,confirmPassword);
        if(subscribeNewsLetter==='Yes'){
            await this.eleUtil.doClick(this.newsLetterYesRadio);
        }
        else{
            await this.eleUtil.doClick(this.newsLetterNoRadio);
        }
        await this.eleUtil.doClick(this.privacyCheckbox);
        await this.eleUtil.doClick(this.submitButton);
    }

    async getSuccessMessage(){
        const successMessage=await this.eleUtil.isVisible(this.successMessage);
        console.log(successMessage);
        return successMessage;
    }
}
