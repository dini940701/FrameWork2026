import { test,expect } from '../fixtures/basefixture.js';
import { LoginPage } from '../POM/LoginPage.js';
import { Registration } from '../POM/Registration.js';
import { parse } from 'csv-parse/sync';
import fs from 'fs';

function getRandomEmail() : string{
    const randomValue = Math.random().toString(36).substring(2, 9);
    return `auto_${randomValue}@mail.com`;
}

type RegistrationData={
    firstName:string,
    lastName:string,
    telephone:string,
    password:string,
    subscribeNewsLetter:string
}

const fileContent=fs.readFileSync('./data-provider/register.csv');
const regData:RegistrationData[]=parse(fileContent,{
    columns:true,
    skip_empty_lines:true
});

for(const data of regData){
test(`Verify Cretae an account successfully for : ${data.firstName}`,async({page,baseURL})=>{
    const loginPage=new LoginPage(page);
    await loginPage.goto(baseURL);
    const regPage:Registration=await loginPage.newAccount();
    await regPage.dosignUp(data.firstName,data.lastName,getRandomEmail(),data.telephone,data.password,data.password,data.subscribeNewsLetter);
    expect(await regPage.getSuccessMessage()).toBeTruthy();
});
}