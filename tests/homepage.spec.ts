import { test } from '../fixtures/basefixture.js';



    test('Verify product search',
        {tag:['@smoke','@regression'],
            annotation:{
                type:'Story',description:'Search for an Product'
            }
        },async({homePage})=>{
            await homePage.doSearch('Macbook');
    });