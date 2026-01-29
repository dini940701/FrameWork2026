import { Page,Locator } from '@playwright/test';

type flexibleLocator=string|Locator;

export class ElementUtil{
    private page:Page;
    private defaultTimeout:number=50000;
    constructor(page:Page,defaultTimeout:number=50000){
        this.page=page;
        this.defaultTimeout=defaultTimeout;
    }

    /**
     * To get locator using locator and optional index
     * @param locator 
     * @returns 
     */
    private getLocator(locator:flexibleLocator,index?:number):Locator{
        if(typeof locator==='string'){
            if(index){
                return this.page.locator(locator).nth(index);
            }
            else{
                return this.page.locator(locator).first();
            }
        }
        else{
            if(index){
                return locator.nth(index);
            }
            else{
                return locator.first();
            }
        }
    }

    /**
     * Fill the value
     * @param locator 
     * @param value 
     * @param options 
     * @param index 
     */
    async doFill(locator:flexibleLocator,value:string,options?:{timeout?:number},index?:number):Promise<void>{
        await this.getLocator(locator,index).fill(value,{
            timeout:options?.timeout || this.defaultTimeout
        });
    }

    /**
     * Fill the value Sequentially with some delay
     * @param locator 
     * @param value 
     * @param options 
     */
    async pressSequentially(locator:flexibleLocator,value:string,options?:{delay?:number}):Promise<void>{
        await this.getLocator(locator).pressSequentially(value,{
            delay:options?.delay
        });
    }

    /**
     * Click on an element
     * @param locator 
     * @param options 
     */
    async doClick(locator:flexibleLocator,index?:number,options?:{force?:boolean,timeout?:number}):Promise<void>{
        await this.getLocator(locator,index).click({
            force:options?.force,
            timeout:options?.timeout || this.defaultTimeout
        });
    }

    async doubleClick(locator:flexibleLocator,index?:number,options?:{timeout?:number}):Promise<void>{
        await this.getLocator(locator,index).dblclick({
            timeout:options?.timeout || this.defaultTimeout
        },);
    }

    /**
     * 
     * @param locator 
     * @param options 
     */
    async rightClick(locator:flexibleLocator,options?:{button?: 'left' | 'right' | 'middle' | undefined}):Promise<void>{
        await this.getLocator(locator).click({
            button:options?.button
        });
    }

    /**
     * selectByValueDropdown
     * @param locator 
     * @param value 
     * @param options 
     */
    async selectDropDown(locator:flexibleLocator,value:string,options?:{timeout?:number}):Promise<void>{
        await this.getLocator(locator).selectOption(value,{
            timeout:options?.timeout || this.defaultTimeout
        });
    }

    /**
    * selectByLabelDropdown
    * @param locator 
    * @param value 
    */
    async selectByLabelDropdown(locator:flexibleLocator, labelValue:string){
        await this.getLocator(locator).selectOption({label:labelValue});
    }

    /**
    * selectByIndexDropdown
    * @param locator 
    * @param indexValue 
    */
    async selectByIndexDropdown(locator:flexibleLocator, indexValue:number){
        await this.getLocator(locator).selectOption({index:indexValue});
    }

    /**
     * Get text using textContent
     * @param locator 
     * @returns 
     */
    async getTextContent(locator:flexibleLocator):Promise<string | null>{
        const text=await this.getLocator(locator).textContent();
        return text;
    }

    /**
     * Get text using innerText
     * @param locator 
     * @returns 
     */
    async getInnerText(locator:flexibleLocator):Promise<string>{
        const innerText=await this.getLocator(locator).innerText();
        return innerText;
    }    

    /**
     * Get text using allInnerTexts
     * @param locator 
     * @returns 
     */
    async getAllInnerTexts(locator:flexibleLocator):Promise<string[]>{
        const allInnerTexts=await this.getLocator(locator).allInnerTexts();
        return allInnerTexts;
    }
    
    /**
     * Get input value using inputValue
     * @param locator 
     * @returns 
     */
    async getInputValue(locator:flexibleLocator):Promise<string>{
        const inputValue=await this.getLocator(locator).inputValue();
        return inputValue;
    }

    //============================ Element Visibility & State Check ================//

    /**
     * check element is visible
     * @param locator 
     * @param index 
     * @returns 
     */
    async isVisible(locator:flexibleLocator,index?:number):Promise<boolean>{
        return this.getLocator(locator,index).isVisible({timeout:this.defaultTimeout});
    }

    /**
     * check element is hidden
     * @param locator 
     * @param index 
     * @returns 
     */
    async isHidden(locator:flexibleLocator,index?:number):Promise<boolean>{
        return this.getLocator(locator,index).isHidden({timeout:this.defaultTimeout});
    }

    /**
     * check element is Enabled
     * @param locator 
     * @param index 
     * @returns 
     */
    async isEnabled(locator:flexibleLocator,index?:number):Promise<boolean>{
        return this.getLocator(locator,index).isEnabled({timeout:this.defaultTimeout});
    }

    /**
     * check element is Disabled
     * @param locator 
     * @param index 
     * @returns 
     */
    async isDisabled(locator:flexibleLocator,index?:number):Promise<boolean>{
        return this.getLocator(locator,index).isDisabled({timeout:this.defaultTimeout});
    }

    /**
     * check element is Checked(radio/checkbox)
     * @param locator 
     * @param index 
     * @returns 
     */
    async isChecked(locator:flexibleLocator,index?:number):Promise<boolean>{
        return this.getLocator(locator,index).isChecked({timeout:this.defaultTimeout});
    }

    /**
     * check element is Editable
     * @param locator 
     * @param index 
     * @returns 
     */
    async isEditable(locator:flexibleLocator,index?:number):Promise<boolean>{
        return this.getLocator(locator,index).isEditable({timeout:this.defaultTimeout});
    }
    
    
    //====================wait utils===========//

    /**
     * wait for element to be visible
     * @param locator 
     * @param timeout 
     * @returns 
     */
    async waitForElementVisible(locator:flexibleLocator,timeout:number=5000){
        try{
            await this.getLocator(locator).waitFor({state:'visible',timeout});
            return true;
        }
        catch{
            return false;
        }
    }


    /**
     * wait for element to be present in DOM.
     * @param locator 
     * @param timeout 
     * @returns 
     */
    async waitForElementAttached(locator:flexibleLocator,timeout:number=5000):Promise<boolean>{
        try{
            await this.getLocator(locator).waitFor({state:'attached',timeout});
            return true;
        }
        catch{
            return false;
        }
    }

    /**
     * wait for a specific timeout (static)
     * @param state 
     * @param options 
     */
    async waitForLoadState(state?:'load'|'domcontentloaded'|'networkidle'|undefined,options?:{timeout?:number}):Promise<void>{
        await this.page.waitForLoadState(state,{
            timeout:options?.timeout || this.defaultTimeout
        });
    }

    /**
     * wait for a specific timeout (static)
     * @param timeout 
     */
    async sleep(timeout:number):Promise<void>{
        await this.page.waitForTimeout(timeout);
    }

    //==========File Upload==============//

    /**
     * upload the file
     * @param locator 
     * @param file 
     */
    async setInputFiles(locator:flexibleLocator,file:string|string[]):Promise<void>{
        await this.getLocator(locator).setInputFiles(file);
    }
}