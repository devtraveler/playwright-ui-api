import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
   
  public page: Page;

  // Define general web elements on BasePage
  public nurNotwendigeCookiesButton: Locator; 
  public allesAkzeptierenButton: Locator;
  public kreditTab: Locator;
  public kreditTabMobile: Locator;
  public ratenKreditOption: Locator;
  public upButtonXPath: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locate and assign web elements
    this.nurNotwendigeCookiesButton = page.locator('//button[@class="gdpr-link gdpr-deny-all"]')
    this.allesAkzeptierenButton = page.locator('//button[@id="uc-btn-accept-banner"]')
    this.kreditTab = page.locator('//a[contains(@class,"page-navigation-text")][contains(.,"Kredit")]')
    this.kreditTabMobile = page.locator('//a[@class="mps-label-link"][contains(text(),"Kredit")]')
    this.ratenKreditOption = page.locator('//a[@href="/kredit/ratenkredit/"][contains(.,"Ratenkredit")]');
    this.upButtonXPath = page.locator('//div[contains(@class,"up-button")]');  
    
  }

  async navigateTo(url: string) {

    // Go to the webpage
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  async verifyUrl(text: string): Promise<void> {
    
    // Verify the user goes to the expected webpage
    const pageUrl = this.page.url()
    expect(pageUrl).toContain(text);

  } 

  async clickNurNotwendigeCookies(){

    // Pass the Cookies Popup by clicking the NurNotwendige button
    await expect(this.nurNotwendigeCookiesButton).toBeVisible();
    await this.nurNotwendigeCookiesButton.click();
  }

  async clickAllesAkzeptierenButton(){

    // Pass the Cookies Popup by clicking the AllesAkzeptieren button
    await expect(this.allesAkzeptierenButton).toBeVisible();
    await this.allesAkzeptierenButton.click();
  }

  async hoverKredit() {

    // Hover over the Kredit option on the top navigation bar
    await this.kreditTab.hover();
  }

  async clickKredit(isMobile: boolean) {    

    if(isMobile){

      // Click the Kredit option for mobile view
      await this.kreditTabMobile.click();   

    } else{

       this.hoverKredit();
      //Click the Kedit option for desktop view
      await this.kreditTab.click();
    }
  }

  async clickRatenkredit() {

    // Click on the Ratenkredit option under the Kredit option 
    await this.page.click('text=Ratenkredit');
  }

  async scrollToLastElement() {
    
   // To scroll the last element to see all product cards on the page

    const upButtonXPath = "//div[contains(@class,'up-button')]";  

    // Verify the last element is in the DOM and store it into a variable
    let isUpButtonVisible = await this.page.isVisible(upButtonXPath);


    while(!isUpButtonVisible){

      // Scrolling by keyboard
      await this.page.keyboard.press('End');

      isUpButtonVisible = await this.page.isVisible(upButtonXPath);

    } 
    
  }  

  async waitForSelector(selector: string) {

    // To wait dynamically
    await this.page.waitForSelector(selector);
  }


}
