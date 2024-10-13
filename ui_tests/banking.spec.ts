import { test, expect } from '@playwright/test';
import { RatenKreditPage } from '../page-objects/banking/ratenKredit';
import { HomePage } from '../page-objects/homepage/homepage';

test.describe('Web UI Tests', () => {
  
  // This is an instance of the RatenKredit Page
  let ratenKreditPage: RatenKreditPage;

  // Created a func to reduce code repetition
  async function verifyShowcaseResultList(ratenKreditPage: any, isMobile: boolean, kreditBetrag: string) {
    
    // Verify the URL
    await ratenKreditPage.verifyUrl('https://www.verivox.de/');

    // If it's a desktop test, it will hover over and click the Kredit
    await ratenKreditPage.clickKredit(isMobile);

    // Clear the nettokreditbetrag input
    await ratenKreditPage.typeKreditBetrag(kreditBetrag);

    // Select 8 Jahre from the dropdown
    await ratenKreditPage.selectAchtJahreOption();

    // Click the Jetzt Vergleichen button
    await ratenKreditPage.clickJetztVergleichenButton();

    // Scroll to the last element (for visibility)
    await ratenKreditPage.scrollToLastElement();

    // Verify the list of bank products is greater than or equal to 10  
    await ratenKreditPage.isProductCardsAtLeast10Items();

    // Verify Sofortauszahlung appears at least once
    await ratenKreditPage.hasSofortauszahlung();
  }

  test.beforeEach(async ({ page }) => {

    // Go to the verifox homepage
    ratenKreditPage = new RatenKreditPage(page);
    await ratenKreditPage.navigateTo('https://www.verivox.de/');

    // Pass the Cookies popup
    await ratenKreditPage.clickAllesAkzeptierenButton()
  });

   // Test for Desktop version
   test('Scenario 1.1: Verify the Banking showcase result list for desktop version', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 }); // Desktop resolution
    const ratenKreditPage = new RatenKreditPage(page);
    await verifyShowcaseResultList(ratenKreditPage, false, '25000');
  });

   // Test for Mobile version
   test('Scenario 1.2: Verify the Banking showcase result list for mobile version', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 }); // Mobile resolution (iPhone X size)
    const ratenKreditPage = new RatenKreditPage(page);
    await verifyShowcaseResultList(ratenKreditPage, true, '25000');
  });


  test('Scenario 2: Jump to the signup funnel', async () => {    
  
    // The same tariff from Scenario 1
    await ratenKreditPage.verifyUrl('https://www.verivox.de/');
    await ratenKreditPage.hoverKredit();
    await ratenKreditPage.clickRatenkredit();
    await ratenKreditPage.typeKreditBetrag('25000');
    await ratenKreditPage.selectAchtJahreOption();
    await ratenKreditPage.clickJetztVergleichenButton();
    await ratenKreditPage.getBankProduct();
    await ratenKreditPage.clickAlleBankenVergleichenButton();

    // Verify that starts with https://www.verivox.de/ratenkredit/vergleich/
    await ratenKreditPage.signUpFunnelUrlStartsWith('https://www.verivox.de/ratenkredit/vergleich/');

    // Verify that ends with /signup10
    await ratenKreditPage.signUpFunnelUrlEndsWith('/signup10');

    // Verify that the Nettokreditbetrag is taken over to the sign up funnel
    await ratenKreditPage.verifyNettoKreditBetragIsFullfilled(ratenKreditPage.requestedKredit);

    // Verify that the Laufzeit is taken over to the sign up funnel
    await ratenKreditPage.verifyLaufZeitIsFullfilled(8);

  
  });

});



