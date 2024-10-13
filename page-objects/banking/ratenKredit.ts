import { Locator, expect, Page } from '@playwright/test';
import { BasePage } from '../basePage';

export class RatenKreditPage extends BasePage {
  
  // Define general variables
  public requestedKredit: string;
  public startWithText: string = 'https://www.verivox.de/ratenkredit/vergleich/';
  public endsWithText: string = '/signup10';

  // Define web elements on this module
  public kreditBetragInput!: Locator;
  public kreditLaufzeitMenu!: Locator;
  public achtJahreOption!: Locator;
  public jetztVergleichenButton!: Locator;
  public alleBankenVergleichenButton!: Locator;
  public nettoKreditBeitragResult!: Locator;
  public laufZeitResult!: Locator;

  constructor(page: Page){

   super(page);
    
   // Locate and assign web elements
   this.kreditBetragInput = this.page.locator('(//input[@name="kreditbetrag"])[1]');
   this.kreditLaufzeitMenu = this.page.locator('(//select[@name="kreditlaufzeit"])[1]');
   this.achtJahreOption = this.page.locator('(//option[@value="96"])[1]');
   this.jetztVergleichenButton = this.page.locator('(//button[text()="Jetzt vergleichen"])[1]')
   this.alleBankenVergleichenButton = this.page.locator('(//span[text()="Alle Banken vergleichen"])[1]');

   this.nettoKreditBeitragResult = this.page.locator('//strong[@class="ng-binding"]');
   this.laufZeitResult = this.page.locator('//strong[contains(@class,"ng-scope")]'); 

  }
  
  async typeKreditBetrag(amountOfKredit: string) {

    // To store the amount od Credit
    this.requestedKredit = amountOfKredit;

    // Clear  the KreditBetrag Input and fill it
    await this.kreditBetragInput.click();
    await this.kreditBetragInput.fill('');
    await this.kreditBetragInput.fill(amountOfKredit);
  }

  async clickKreditLaufzeitMenu() {
 
    await this.kreditLaufzeitMenu.click();
  }

  async selectAchtJahreOption() {
    
    // To select the 8 Jahre option from the list directly
    await this.page.selectOption('select[name="kreditlaufzeit"]', '96');

  }

  async clickJetztVergleichenButton() {

    await this.jetztVergleichenButton.click();

  }

  async getBankProduct() {

    // Wait for the product cards to be visible
    await this.page.waitForSelector('xpath=//vx-srl-base-product-card[contains(@class,"product-card")]', { timeout: 60000 });
    
    // Once visible, get all product cards
    const products = await this.page.$$('xpath=//vx-srl-base-product-card[contains(@class,"product-card")]');
    
    // Return the product cards
    return products;
  }

  async isProductCardsAtLeast10Items() {

    const productCards = await this.getBankProduct();
  
    // Verify that the number of product cards is at least 10
    expect(productCards.length).toBeGreaterThanOrEqual(10);
 
  }

  async isSofortauszahlungPresent() {
    
    // This is an alternative to verify the Sofortauszahlung appears in the webpage
    return await this.page.isVisible('text=Sofortauszahlung');
  }

  async hasSofortauszahlung(): Promise<boolean> {

    // Get all the bank product cards
    const productCards = await this.getBankProduct();
    
    // Check for "Sofortauszahlung" in each product card
    for (const card of productCards) {

      const textContent = await card.textContent();

      if (textContent && textContent.includes('Sofortauszahlung')) {
        return true;  // Return true if any product contains "Sofortauszahlung"
      }

    }
    
    return false;  // Return false if none of the products contain the text
  }

  async clickAlleBankenVergleichenButton() {

    await this.alleBankenVergleichenButton.click();

  }

  async signUpFunnelUrlStartsWith(text: string){
    
    // Wait for the page is loaded
    await this.page.waitForLoadState('networkidle');
 
    // Get the current page URL
    const currentURL = this.page.url();

    // Split the URL string by ? char
    const parts = currentURL.split(/[?]/);

    // To get the first item of the array
    const startsWithText = parts[0];

    // Verify that the URL starts with the provided text
    expect(startsWithText).toEqual(text);   
   
  }

  async signUpFunnelUrlEndsWith(text: string){

    // Get the current page URL
    const currentURL = this.page.url();

    // Split the URL string by ! char
    const parts = currentURL.split(/[!]/);

    // To get the seond elemnt of the array because the end part places after ! char

    const endsWithText = parts[1];

    // Verify that the URL ends with the provided text
    expect(endsWithText).toEqual(text);

  }

  async verifyNettoKreditBetragIsFullfilled(kreditAmount: string){

    // To get the text of the NettoKreditBetrag element
    let nettoKreditBeitragText = await this.nettoKreditBeitragResult.textContent();

    // To clear uncessary part of the text by using Regext method
    let cleanedKredit = nettoKreditBeitragText!.replace(/,.*|\D/g, '');

    // Verify that the NettoKreditBetrag matches with the provided amount
    expect(cleanedKredit).toMatch(kreditAmount);

  }

  async verifyLaufZeitIsFullfilled(year: number){

    // To calculate months
    let laufZeitAsMonNumber = year*12;

    // T convert to the String
    let laufZeitAsMonateStr = laufZeitAsMonNumber.toString()

    // Get the text of the LaufZeit element
    let laufZeitResultText = await this.laufZeitResult.textContent();

    // Verify that LaufZeit text matches to the desired months
    expect(laufZeitResultText).toMatch(laufZeitAsMonateStr);

  }


}
