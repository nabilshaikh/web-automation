# Story      : LBU-100 (Filter events by specialty from the home page)

Feature: Filter events by specialty
    
    @SpecialtyFilter
    Scenario: Look & feel of specialty filter
        Given User verifies specialty filter is present on home screen
        And User sees the placeholder text as 'Any specialty'
        When User clicks on specialty filter
        Then User should see the list box which contains all possible specialties
        When User type in incomplete specialty as 'Cardiolo'
        Then User should see only one matching row containing 'Cardiology' in list box
    
    @SpecialtyFilter    
    Scenario: Search for events based on incorrect specialty
        When User type in incorrect specialty as "Caardiology"
        Then User should see the message as "No data available" in list box
        And User clicks on Search button
        Then User should navigate to "events" screen
        And User sees the URL parameter as - specialty='allspecialty'
        And User verifies the list of returned events is based on - specialty='allspecialty'
        But Not based on incorrect specialty "Caardiology"
    
    @SpecialtyFilter
    Scenario Outline: Search for events based on correct specialty
        When User clicks on specialty filter
        And User selects option as "<specialty>"
        And User clicks on Search button
        Then User should navigate to "events" screen
        And User sees the URL parameter as - specialty='<specialty>'
        And User verifies the list of returned events is based on - specialty='<specialty>'
        #Defect:-LBU-132: Not getting response code as 200 while searching events based on specialty
        And User verifies event link returns 200 response code

        Examples:
            |specialty|
            |Cardiology|
            |Gastroenterology|
            |Pediatrics|
           



            


        





