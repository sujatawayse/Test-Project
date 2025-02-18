const { test, expect } = require('@playwright/test');

const baseURL = 'https://v6.exchangerate-api.com/v6/1fc80820c72b0163bc9c7536/latest/USD';

  test('should verify HTTP status is 200 and response time is below 10 seconds', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get(baseURL);
    const responseTime = Date.now() - startTime;

    expect(response.status()).toBe(200);
    expect(responseTime).toBeLessThan(10000); 
    console.log('response time is below 10 seconds');

  });

  test('should count the total number of currencies returned within the response', async ({ request }) => {
    const response = await request.get(baseURL);
    const responseBody = await response.json();
    const currencyCount = Object.keys(responseBody.conversion_rates).length;

    console.log(`Total number of currencies: ${currencyCount}`);
    expect(currencyCount).toBeGreaterThan(0);
  });

  test('should verify the currency GBP is shown within the response', async ({ request }) => {
    const response = await request.get(baseURL);
    const responseBody = await response.json();

    expect(responseBody.conversion_rates).toHaveProperty('GBP');
    console.log(`GBP exchange rate: ${responseBody.conversion_rates.GBP}`);
  });

  test('should verify response has all the expected currencies', async ({ request }) => {
    const expectedCurrencies = ['GBP', 'EUR', 'JPY', 'AUD', 'CAD',]; // Add more expected currencies as needed
    const response = await request.get(baseURL);
    const responseBody = await response.json();

    for (const currency of expectedCurrencies) {
      expect(responseBody.conversion_rates).toHaveProperty(currency);
    }
    console.log('Expected curriencies verified');

  });

