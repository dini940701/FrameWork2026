import { Page,Locator } from '@playwright/test';
import { ElementUtil } from '../utilities/ElementUtil.js';
import { CartPage } from '../POM/CartPage.js';

export class PDP{
    private readonly page:Page;
    private readonly eleUtil:ElementUtil;
    private readonly header:Locator;
    private readonly images:Locator;
    private readonly productMetaData:Locator;
    private readonly productPriceData:Locator;
    private readonly productMap=new Map<string,string|number|null>;
    private readonly quantity:Locator;
    private readonly addProductToCartButton:Locator;
    private readonly successMessage:Locator;
    private readonly cartTotal:Locator;
    private readonly cartButton:Locator;
    private readonly viewCartLink:Locator;
// Why Map?
// Key-value structured data
// Easier than multiple variables
// Great for data-driven assertions

    constructor(page:Page){
        this.page=page;
        this.eleUtil=new ElementUtil(page);
        this.header=page.locator('h1');
        this.images=page.locator('div#content div.col-sm-8 a img');
        this.productMetaData=page.locator("(//div[@id='content']//ul[@class='list-unstyled'])[1]/li");
        this.productPriceData=page.locator("(//div[@id='content']//ul[@class='list-unstyled'])[2]/li");
        this.quantity=page.locator('#input-quantity');
        this.addProductToCartButton=page.locator('button#button-cart');
        this.successMessage=page.locator('.alert-success');
        this.cartTotal=page.locator('#cart-total');
        this.cartButton=page.locator('div#cart');
        this.viewCartLink=page.getByText('View Cart', { exact: true });
    }

    async getProductHeader():Promise<string>{
        const header=await this.eleUtil.getInnerText(this.header);
        console.log(`Header text : ${header}`);
        return header;
    }

    async imageCount():Promise<number>{
        const productImage=await this.images.count();
        console.log(`Total no.of images for the product : ${productImage}`);
        return productImage;
    }
/**
 * Gets all text from metadata list
 * Each item looks like:
        Brand: Apple
        Product Code: MacBook
 * Splits on :
 * Stores in Map
 */
    private async getProductMetaData(){
        const prodMetaData=await this.productMetaData.allInnerTexts();
        for(const data of prodMetaData){
            const meta:string[]=data.split(':');
            const metaKey=meta[0].trim();
            const metaValue=meta[1].trim();
            this.productMap.set(metaKey,metaValue);
        }
    }

    private  async getProductPriceData() {
        const productPricing: string[] = await this.productPriceData.allInnerTexts();
        const productPrice = productPricing[0].trim();
        const productExTax = productPricing[1].split(':')[1].trim();
        this.productMap.set('price', productPrice);
        this.productMap.set('extaxprice', productExTax);
    }

    private async getProductInfo(){
        for(const [key,value] of this.productMap){
            console.log(key,value);
        }
    }

    async getProductdetails(){
        this.productMap.set('Header',await this.getProductHeader());
        this.productMap.set('Image Count',await this.imageCount());
        await this.getProductMetaData();
        await this.getProductPriceData();
        await this.getProductInfo();
        return this.productMap;
    }

    async addToCart():Promise<boolean>{
        await this.eleUtil.doFill(this.quantity,'2');
        await this.eleUtil.doClick(this.addProductToCartButton);
        const success=await this.eleUtil.waitForElementVisible(this.successMessage,1000);
        return success;
    }

    async navigateToCart():Promise<CartPage>{
        const cartTotal=await this.eleUtil.getInnerText(this.cartTotal);
        console.log(cartTotal);
        await this.eleUtil.doClick(this.cartButton);
        await this.eleUtil.doClick(this.viewCartLink);
        return new CartPage(this.page);
    }
}
