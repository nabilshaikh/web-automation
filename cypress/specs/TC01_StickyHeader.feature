# Story  : 1) LBU-97-Medscape live logo in sticky header        

Feature: Medscape-Live sticky header
    
    @HomePage @Header
    Scenario: Verify header on home screen
        Given User is on home screen
        And User sees the welcome text as 'Hundreds of top live events for medical professionals!'
        And User verifies no sticky header is present
        And User sees the -Medscape LIVE!- logo on header
        And User verifies logo is non-clickable
        And User sees the -About Medscape LIVE- button on header
        And User verifies about button is clickable
    
    @HomePage @Header
    Scenario: Verify sticky header on home screen
        Given User sees the hero image on home screen
        When User scroll past the hero image
        Then User should see the sticky header
        And User sees the -Medscape LIVE!- logo on sticky header 
        And User verifies logo is clickable
        And User sees the -About Medscape LIVE- button on sticky header
        And User verifies about button is clickable on sticky header
    
    @EventsPage @Header
    Scenario: Verify sticky header on events screen
        Given User is on home screen
        When User clicks on Search button
        And User should navigate to "events" screen
        Then User should see the sticky header
        When User scroll down to the bottom of page
        Then User verifies sticky header does not get hide
        And User sees the -About Medscape LIVE- button on sticky header
        And User verifies about button is clickable on sticky header
        And User sees the -Medscape LIVE!- logo on sticky header 
        And User verifies logo is clickable