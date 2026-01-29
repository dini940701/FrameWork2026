import { Locator, Page } from '@playwright/test';
import { ElementUtil } from '../utilities/ElementUtil.js';
import { PDP } from '../POM/PDP.js';

export class SRP {
    private readonly page:Page;
    private readonly eleUtil:ElementUtil;
    private readonly results:Locator;

    constructor(page:Page) {
        this.page=page;
        this.eleUtil=new ElementUtil(page);
        this.results=page.locator('.product-thumb');
    }

    async productCount(): Promise<number>{
        return await this.results.count();
    }

    async selectProduct(productName:string){
        console.log(`Product Name : ${productName}`);
        await this.eleUtil.doClick(this.page.getByRole('link',{name:`${productName}`}));
        return new PDP(this.page);
    }
}