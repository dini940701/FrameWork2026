import { test,expect } from '../fixtures/basefixture.js';
import { SRP } from '../POM/SRP.js';

test('Verify the total no.of products in search results page',
    {
    tag:['@smoke','@regression'],
    annotation:[
        {
        type:'Story',
        description:'To find the total no.of products on search page',
    },
],
},async({homePage})=>{
    const srp:SRP=await homePage.doSearch('Macbook');
    expect(await srp.productCount()).toBe(3);
});

const searchData=[
    {searchValue:'Macbook',resultsCount:3},
    {searchValue:'Samsung',resultsCount:2},
    {searchValue:'iMac',resultsCount:1},
    {searchValue:'Dini',resultsCount:0},
];

for(const product of searchData){
test(`Verify the srp for search key ${product.searchValue}`,async({homePage})=>{
    const srp:SRP=await homePage.doSearch(product.searchValue);
    expect(await srp.productCount()).toBe(product.resultsCount);
});
}