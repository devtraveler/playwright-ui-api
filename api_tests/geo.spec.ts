import { test, expect,request as playwrightRequest } from '@playwright/test';


test.describe('API Tests', () => {

  test('Scenario 1.1: Verify that the API call for postcode 10409', async ({ request }) => {
    
    //geoService.verifyBerlinIsOnlyOneCity('10409');
  
    // Get request to the service
    const response = await request.get('https://service.verivox.de/geo/latest/cities/10409');

    // Verify the endpoint runs successfully and the response code is 200 and 
    expect(response.status()).toBe(200);
    
    // Parse the response JSON  
    const responseData = await response.json();

    // Verify the response has a list of city
    expect(Array.isArray(responseData)).toBe(true);
    
    // Verify the array has only one city
    expect(responseData.length).toBe(1);

    // Verify the city is Berlin
    expect(responseData[0].Name).toBe('Berlin');
  });

  test('Scenario 1.1: Verify that the API call for postcode 77716', async ({ request }) => {    
     
    // Get request to the service
    const response = await request.get('https://service.verivox.de/geo/latest/cities/77716');

    // Verify the endpoint runs successfully and the response code is 200 and 
    expect(response.status()).toBe(200);
    
    // Parse the response JSON
    const responseData = await response.json();
    
    // Verify the response has a list of city
    expect(Array.isArray(responseData)).toBe(true);
    
    // Verify the multiple cities are returned
    expect(responseData.length).toBeGreaterThan(1);

    //expect(responseData.map(city => city.Name)).toEqual(expect.arrayContaining(['Fischerbach', 'Haslach', 'Hofstetten']));

  });
});
