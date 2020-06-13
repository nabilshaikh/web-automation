# Author : nabil.shaikh@aptushealth.com
# Story  : 1) LBU-97-Medscape live logo in sticky header
#          2) LBU-98-Create Hamburger menu and add Medscape Live link in sticky header
#        

Feature: Medscape-Live sticky header

    Scenario: Verify header on home screen
        Given User is on home screen
        And User sees the welcome text as 'Hundreds of top live events for medical professionals!'
        And User verifies no sticky header is present
        And User sees the -Medscape LIVE!- logo on header
        And User verifies logo is non-clickable
        And User sees the -About Medscape LIVE- button on header
        And User verifies about button is clickable

    Scenario: Verify sticky header on home screen
        Given User sees the hero image on home screen
        When User scroll past the hero image
        Then User should see the sticky header
        And User sees the -Medscape LIVE!- logo on sticky header 
        And User verifies logo is clickable
        And User sees the -About Medscape LIVE- button on sticky header
        And User verifies about button is clickable on sticky header
    
    Scenario: Verify sticky header on events screen
        Given User is on home screen
        When User clicks on Search button
        And User should navigate to "events" screen
        Then User should see the sticky header
        And User sees the -Medscape LIVE!- logo on sticky header 
        And User verifies logo is clickable
        And User sees the -About Medscape LIVE- button on sticky header
        And User verifies about button is clickable on sticky header
        When User scroll down to the bottom of page
        Then User verifies sticky header does not get hide


    @Logo
    Scenario: Verify 'Medscape LIVE' logo on header
        Given User sees the logo on header
        When User scroll down to the bottom of page
        Then User should see logo on header
        And User click on Search button
        Then User should navigates to Events screen where URL should include "events?specialty=allspecialty"
        And User sees list of events
        When User scroll down to bottom of page
        Then User should see logo on header
        And User click on logo
        Then User should land on home screen

    @AboutPage
    Scenario: Verify 'About Medscape Live' button on header
        Given User should see About Medscape Live button on header
        When User clicks on it
        Then User should navigates to about page where URL should include "about"
        And User sees the content as "About Page"