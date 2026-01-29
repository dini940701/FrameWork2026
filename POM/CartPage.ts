import { Page } from '@playwright/test';

export class CartPage{
    private readonly page:Page;
    constructor(page:Page){
        this.page=page;
    }
}