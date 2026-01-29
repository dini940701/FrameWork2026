import { Page,Locator } from '@playwright/test';
import { LoginPage } from '../POM/LoginPage.js';
import { ElementUtil } from '../utilities/ElementUtil.js';
import { SRP } from '../POM/SRP.js';

export class HomePage {
    readonly page:Page;
    private readonly eleUtil:ElementUtil;
    private readonly logoutLink:Locator;
    private readonly searchBar:Locator;
    private readonly searchIcon:Locator;
    private readonly loginLink:Locator;

    constructor(page:Page) {
        this.page=page;
        this.eleUtil=new ElementUtil(this.page);
        this.logoutLink=page.locator('(//a[text()=\'Logout\'])[2]');
        this.searchBar=page.getByPlaceholder('Search');
        this.searchIcon=page.locator('.btn-lg');
        this.loginLink=page.locator('//a[text()=\'Login\']');
    }

    async isUserLoggedIn(){
        const link=await this.eleUtil.waitForElementVisible(this.logoutLink,10000);
        return link;
    }

    async doSearch(searchvalue:string):Promise<SRP>{
        await this.eleUtil.doFill(this.searchBar,searchvalue);
        await this.eleUtil.doClick(this.searchIcon,0,undefined);
        return new SRP(this.page);
    }

    async doLogout():Promise<LoginPage>{
        await this.eleUtil.doClick(this.logoutLink,undefined);
        await this.eleUtil.doClick(this.loginLink,1,undefined);
        return new LoginPage(this.page);
    }
}