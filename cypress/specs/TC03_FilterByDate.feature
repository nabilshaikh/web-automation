# Story      : LBU-202 (User can filter events by date picker - Part 2)

Feature: Filter events by date

    @DateFilter
    Scenario: Look & feel of date filter
        Given User verifies date filter is present on home screen 
        And User sees the placeholder text as 'Any date' 
        When User clicks on date filter
        Then User should see the date input fields as 'Start Date' & 'End Date' 
        And User sees the calendar component highlighting the current date
        And User verifies current date is selectable 
        And User verifies future date is selectable
        But User should not able to select the past date
        And User clears the Start Date
    
    Scenario: Look & feel of Start date input field
        When User clicks on date filter
        Then User should see the calendar component highlighting the current date
        And User verifies current date is selectable 
        And User verifies future date is selectable
        But User should not able to select the past date
        And User clears the Start Date
    
    Scenario: Look & feel of End date input field
        When User clicks on date filter
        Then User should see the calendar component highlighting the current date
        And User verifies current date is selectable 
        And User verifies future date is selectable
        But User should not able to select the past date
        And User clears the Start Date


        Given User verifies date filter is present on home screen 
        And User sees the placeholder text as 'Any date' 
        When User clicks on date filter
        Then User should see the date input fields as 'Start Date' & 'End Date'
         
        
        
        Then User should see the calendar component highlighting the current date
        And User verifies current date is selectable 
        And User verifies future date is selectable
        But User should not able to select the past date
        And User clears the Start Date
        When User clicks on End date 
        Then User should see the date picker highlighting the current date
        And User verifies current date is selectable on end date field
        And User verifies future date is selectable on end date field
        But User should not able to select past date
        And User clears the End Date
    
    
    @DateFilter
    Scenario: User searches for events - start date <current-date> & end date <current-date>
        When User clicks on Start date 
        And User selects the current date 
        And User clicks on End date 
        And User selects the current date 
        And User clicks on Search button
        #Then User should navigates to 'events' screen
        #And User sees the URL parameter as - specialty='allspecialty'&startDate='current-date'&endDate='current-date'
        #And User verifies the list of returned events is based on - specialty 'allspecialty', start date 'current-date' & end date 'current-date'
    @focus       
    @DateFilter
    Scenario: User searches for events - start date <current-date> & end date <future-date>
        When test
        #When User clicks on Start date 
        #And User selects the current date 
        #And User clicks on End date 
        #And User selects the future date 
        #And User clicks on Search button
        #Then User should navigate to "events" screen
        #And User sees the URL parameter as - specialty='allspecialty'&startDate='current-date'&endDate='future-date'
        #And User verifies the list of returned events is based on - specialty 'allspecialty', start date 'current-date' & end date 'future-date'

    @DateFilter
    Scenario: User searches for events - start date <future-date> & end date <current-date>
        When User clicks on Start date 
        And User selects the 'future' date 
        And User clicks on End date 
        And User selects the 'current' date 
        Then User sees the error message as "Please update your date selections"

    @DateFilter
    Scenario: User searches for events - only start date
        When User clicks on Start date 
        And User selects the 'current' date 
        And User clicks on Search button
        Then User should navigate to "events" screen
        And User sees the URL parameter as - specialty='allspecialty'&startDate='current-date'
        And User verifies the list of returned events is based on - specialty 'allspecialty', start date 'current-date'

    @DateFilter
    Scenario: User searches for events - only end date
        When User clicks on End date
        And User selects the 'future' date 
        And User clicks on Search button
        Then User should navigate to "events" screen
        And User sees the URL parameter as - specialty='allspecialty'&endDate='future-date'
        And User verifies the list of returned events is based on - specialty 'allspecialty' & end date 'future-date'
