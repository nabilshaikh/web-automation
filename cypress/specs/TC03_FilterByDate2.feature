# Story : LBU-202 (User can filter events by date picker - Part 2)

Feature: Filter events by date

    @DateFilter
    Scenario: Look & feel of date filter
        Given User verifies date filter is present on home screen 
        And User sees the placeholder text as 'Any dates' 
        When User clicks on date filter
        Then User sees 'Any dates' placeholder text gets changed to 'From' & 'To' date input fields
        And User sees the calendar dropdown

    Scenario: Look & feel of 'From' date input field
        When User clicks on date filter
        Then User should see the calendar dropdown
        And User verifies current date is selectable 
        And User verifies future date is selectable
        But User should not able to select the past date
    
    Scenario: Look & feel of 'To' date input field
        When User clicks on date filter
        And User should see the calendar component
        And User clicks on To date
        Then User should see the calendar dropdown
        And User verifies current date is selectable 
        And User verifies future date is selectable
        But User should not able to select the past date    
    
    @DateFilter
    Scenario: User searches for events - From (current-date) & To (current-date)
        When User clicks on From date 
        And User selects the current date 
        And User clicks on To date
        And User selects the current date 
        And User clicks on Search button
        Then User should navigate to 'events' screen
        And User sees the URL parameter as - specialty='allspecialty'&startDate=current-date&endDate=current-date
        And User verifies the list of returned events is based on - specialty (allspecialty), From (current-date) & To (current-date)
           
    @DateFilter
    Scenario: User searches for events - From (current-date) & To (future-date)
        When User clicks on From date 
        And User selects the current date 
        And User clicks on To date 
        And User selects the future date 
        And User clicks on Search button
        Then User should navigate to 'events' screen
        And User sees the URL parameter as - specialty='allspecialty'&startDate=current-date&endDate=future-date
        And User verifies the list of returned events is based on - specialty (allspecialty), From (current-date) & To (future-date)

    @DateFilter
    Scenario: User searches for events - From (future-date) & To (current-date)
        When User clicks on From date 
        And User selects the future date 
        And User clicks on To date 
        And User selects the current date 
        Then User should see the error message as "Please update your date selections"

    @DateFilter
    Scenario: User searches for events - only From date
        When User clicks on From date
        And User selects the current date
        And User clicks on Search button
        Then User should navigate to 'events' screen
        And User sees the URL parameter as - specialty='allspecialty'&startDate=current-date
        And User verifies the list of returned events is based on - specialty (allspecialty), From (current-date)

    @DateFilter
    Scenario: User searches for events - only end date
        When User clicks on To date
        And User selects the future date
        And User clicks on Search button
        Then User should navigate to 'events' screen
        And User sees the URL parameter as - specialty='allspecialty'&endDate=future-date
        And User verifies the list of returned events is based on - specialty (allspecialty), To (future-date)
