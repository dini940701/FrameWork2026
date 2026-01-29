import { test,expect } from '../fixtures/basefixture.js';
import { PDP } from '../POM/PDP.js';
import { SRP } from '../POM/SRP.js';


test('Verify the product header and image count',async({homePage})=>{
    const srp:SRP=await homePage.doSearch('macbook');
    const pdp:PDP=await srp.selectProduct('MacBook');
    expect(await pdp.getProductHeader()).toBe('MacBook');
    expect(await pdp.imageCount()).toBe(5);
});

const searchData=[
    {searchKey:'Macbook', productName:'MacBook', imageCount:5, Brand:'Apple', ProductCode:'Product 16', RewardsPoints:'600', Availability:'In Stock', ProductPrice:'$602.00', ExTax:'$500.00'},
    {searchKey:'Samsung',productName:'Samsung SyncMaster 941BW', imageCount:1, Brand:undefined, ProductCode:'Product 6', RewardsPoints:undefined, Availability:'2-3 Days', ProductPrice:'$242.00', ExTax:'$200.00'},
];

for(const prodData of searchData){
    test(`Verify the product header and image count of product ${prodData.productName}`,async({homePage})=>{
        const srp:SRP=await homePage.doSearch(prodData.searchKey);
        const pdp:PDP=await srp.selectProduct(prodData.productName);
        expect(await pdp.getProductHeader()).toBe(prodData.productName);
        expect(await pdp.imageCount()).toBe(prodData.imageCount);
    });
}

for(const prodData of searchData){
    test(`Verify the product details of product ${prodData.productName}`,async({homePage})=>{
        const srp:SRP=await homePage.doSearch(prodData.searchKey);
        const pdp:PDP=await srp.selectProduct(prodData.productName);
        const prodDetails=await pdp.getProductdetails();
        expect(prodDetails.get('Header')).toBe(prodData.productName);
        expect(prodDetails.get('Image Count')).toBe(prodData.imageCount);
        expect(prodDetails.get('Brand')).toBe(prodData.Brand);
        expect(prodDetails.get('Product Code')).toBe(prodData.ProductCode);
        expect(prodDetails.get('Reward Points')).toBe(prodData.RewardsPoints);
        expect(prodDetails.get('Availability')).toBe(prodData.Availability);
        expect(prodDetails.get('price')).toBe(prodData.ProductPrice);
        expect(prodDetails.get('extaxprice')).toBe(prodData.ExTax);
    });
}

for(const data of searchData){
    test(`Add product to cart :${data.productName}`,async({homePage})=>{
        const srp:SRP=await homePage.doSearch(data.searchKey);
        const pdp:PDP=await srp.selectProduct(data.productName);
        expect(await pdp.addToCart()).toBeTruthy();
    });
}

for(const data of searchData){
    test(`Navigate to Cart Page :${data.productName}`,async({homePage})=>{
        const srp:SRP=await homePage.doSearch(data.searchKey);
        const pdp:PDP=await srp.selectProduct(data.productName);
        await pdp.navigateToCart();
        
    });
}




