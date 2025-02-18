Feature: Homepage Functionality

    Scenario: Verify allteams which are playing today

         Given User navigates to BBC Sports site
         When Verify user navigates to BBC Sports
         Then Make a record of allteams which are playing today
         Then Close the browser
    
        Scenario: Read about all articles 
        Given User navigates to BBC Sports site
        When Verify user navigates to BBC Sports
        Then Read about all articles related to sports
        Then Close the browser

         Scenario: Verify allteams which are playing today
         Given User navigates to BBC Sports site
         When Verify user navigates to BBC Sports
         Then verify Show and Hide Scorerstoggle on the page
         Then Close the browser
