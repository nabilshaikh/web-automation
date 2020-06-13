# Story:-
# 1) LBU-97-Medscape live logo in sticky header
# 2) LBU-98-Create Hamburger menu and add Medscape Live link in sticky header

Feature: Medscape-Live sticky header

    @Logo
    Scenario: Verify 'Medscape-LIVE' logo on header
        Given User should see logo on header
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