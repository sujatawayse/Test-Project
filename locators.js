module.exports = {
    homePage: {
        match: "//div[@class='ssrcss-1jkg1a7-HeaderWrapper e4zdov50']//h2//a[@class='ssrcss-1fdtnc8-SignpostLink ejnn8gi0']",
        teamNamesXPath: (index) => `//div[@class='ssrcss-1jkg1a7-HeaderWrapper e4zdov50'][${index}]//ul/li/div/a/div/div/div/div/div/span[@class='visually-hidden ssrcss-1f39n02-VisuallyHidden e16en2lz0']`},
        searchbtn:"//span[contains(text(),'Search BBC')]",
        entersearchtext:"//input[@id='searchInput']",
        searchicon:"//button[@id='searchButton']",
        artical:"//div[@class='ssrcss-17vxekx-PromoSwitchLayoutAtBreakpoints et5qctl0']//a",
        ShowScroresCount:"//div[@class='ssrcss-uq6ar7-KeyEventsAway evc6ssb0']",
        ScoreShow:"//button[normalize-space()='Show Scorers']",
        scoreHide:"//button[normalize-space()='Hide Scorers']",

    resultsPage: {
      firstResult: '(//h3)[1]'
    }
  };
  