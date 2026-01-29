// import { test as base,expect } from '@playwright/test';

// import { parse } from 'csv-parse/sync';
// import fs from 'fs';

// type RegistrationData={
//     firstName:string,
//     lastName:string,
//     telephone:string,
//     password:string,
//     subscribeNewsLetter:string
// }

// type csvFixture={
//     regData:RegistrationData[];

// }
// export const test=base.extend<csvFixture>({
//     regData:async(use)=>{
//         const fileContent=fs.readFileSync('./data-provider/register.csv');
//         const registration:RegistrationData[]=parse(fileContent,{
//             columns:true,
//             skip_empty_lines:true
//         });
//         //await use(registration);
//     }
// });
// export {expect};
