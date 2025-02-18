const { Given, When, Then, Before, After, setDefaultTimeout } = require("@cucumber/cucumber");

const { chromium, expect } = require("@playwright/test");

const { Page } = require("playwright");
const locators = require('./locator/locators.js');

setDefaultTimeout(60 * 1000);

let page, browser;


Before(async function () {

    browser = await chromium.launch({ headless: false });

    const context = await browser.newContext();

    page = await context.newPage();

});


Given(/^User navigates to BBC Sports site$/, async() => {
    await page.goto('https://www.bbc.com/sport/football/scores-fixtures');

});

When(/^Verify user navigates to BBC Sports$/,async () => {
	// Verify the page title
    const actualTitle = await page.title();
    console.log(actualTitle);
    const expectedTitle = "Scores & Fixtures - Football - BBC Sport";
    await expect(actualTitle).toBe(expectedTitle);
    
});

Then(/^Make a record of allteams which are playing today$/, async() => {
	
    //const matches = await page.locator("//div[@class='ssrcss-1jkg1a7-HeaderWrapper e4zdov50']//h2//a[@class='ssrcss-1fdtnc8-SignpostLink ejnn8gi0']").allTextContents();
  //const matches= await this.page.allTextContents(locators.homepage.match);
    // Check if there are no matches
    const matches = await page.locator(locators.homePage.match).allTextContents();
  console.log(matches)

  if (matches.length === 0) {
    console.log("There are no Matches today");
  } else {
    for (let i = 0; i < matches.length; i++) {
      console.log(`Match ${i + 1}: ${matches[i]}`);

      // Construct the dynamic XPath
      const teamNamesXPath = `//div[@class='ssrcss-1jkg1a7-HeaderWrapper e4zdov50'][${i + 1}]//ul/li/div/a/div/div/div/div/div/span[@class='visually-hidden ssrcss-1f39n02-VisuallyHidden e16en2lz0']`;
      const teamNames = await page.locator(teamNamesXPath).allTextContents();

      for (let j = 0; j < teamNames.length; j++) {
        console.log(`- Team ${j + 1}: ${teamNames[j]}`);
      }
    }
  }

});


Then(/^Read about all articles related to sports$/, async() => {
	
    const searchbtn= await page.locator("//span[contains(text(),'Search BBC')]");
    await searchbtn.click();
    const entersearchtext= await page.locator("//input[@id='searchInput']");
    await entersearchtext.fill('Sports Articals');
    const searchicon= await page.locator("//button[@id='searchButton']");
    await searchicon.click();
 
 const articals= await page.locator("//div[@class='ssrcss-17vxekx-PromoSwitchLayoutAtBreakpoints et5qctl0']//a").allTextContents();
 console.log(articals);
 if (articals.length > 0) {
    console.log(`First article: ${articals[0]}`);
    console.log(`Last article: ${articals[articals.length - 1]}`);
  } else {
    console.log("No articles found.");
  }

 
});



Then(/^verify Show and Hide Scorerstoggle on the page$/, async() => {
	const ShowScroresCount= await page.locator("//div[@class='ssrcss-uq6ar7-KeyEventsAway evc6ssb0']");
  const ScoreShow= await page.locator("//button[normalize-space()='Show Scorers']");
  const scoreHide = await page.locator("//button[normalize-space()='Hide Scorers']");
  
if (await ScoreShow.isVisible()) {
  await ScoreShow.click();
  console.log('Clicked the "Show Scorers" button.');

  // Verify the ShowScrores elements' visibility after clicking
  const showScroresElements = await page.locator("//div[@class='ssrcss-uq6ar7-KeyEventsAway evc6ssb0']").all();
  for (const element of showScroresElements) {
    const isVisible = await element.isVisible();
   // console.log(`Scroe elements are visible: ${isVisible}`);
  }
} else if (await scoreHide.isVisible()) {
  await scoreHide.click();
 // console.log('Clicked the "Hide Scorers" button.');

  // Verify the ShowScrores elements' visibility after clicking
  const showScroresElements = await page.locator("//div[@class='ssrcss-uq6ar7-KeyEventsAway evc6ssb0']").all();
  for (const element of showScroresElements) {
    const isVisible = await element.isVisible();
    if (isVisible) {
      console.error(`Test failed: ShowScrores element should not be visible but is visible.`);
    } 
  }
}
});


Then(/^Close the browser$/, async() => {
    await browser.close();
});


