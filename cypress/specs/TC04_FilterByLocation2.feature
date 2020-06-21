# Story      : LBU-101-Filter events by location from homepage

Feature: Filter events by location
    @focus
    @LocationFilter
    Scenario: Look & feel of location filter
        Given User verifies location filter is present on home screen
        And User sees the location placeholder text as 'Any location' 
        When User clicks on location filter
        Then User should see the list box which contains all possible locations
        When User type in incomplete location as 'Onli'
        Then User should see only one matching row containing 'Online' in list box
    
    @LocationFilter
    Scenario: Search for events based on incorrect location
        When User type in incorrect location as 'Onnline'
        Then User should see the message as "No data available" in list box
        And User clicks on Search button
        Then User should navigate to 'events' screen
        And User sees the URL parameter as - specialty='allspecialty'
        And User verifies the list of returned events is based on - specialty='allspecialty'
        But Not based on incorrect location 'Onnline'
    
    @LocationFilter
    Scenario: Search for events based on correct location        
        When User clicks on location filter
        And User selects the -2- option from list-box
        And User clicks on Search button
        Then User should navigate to 'events' screen 
        And User sees the URL parameter as - specialty='allspecialty'&location=2
        And User verifies the list of returned events is based on selected location -2- 
            
    @LocationFilter @SpecialtyFilter
    Scenario Outline: Search for events based on specialty + location
        When User clicks on specialty filter
        And User selects option as '<SPECIALTY>'
        And User clicks on location filter
        And User selects the -2- option from list-box
        And User clicks on Search button
        Then User should navigate to 'events' screen  
        And User sees the URL parameter as - specialty='<SPECIALTY>'&location=2
        And User verifies the list of returned events is based on selected '<SPECIALTY>' & location -2-
    
    Examples:
        |SPECIALTY|      
        |Cardiology|     

    #@LocationFilter @DateFilter
    #Scenario: User searches for events based on start date + location
    #    When User selects the start date with current date
    #    And User selects the third location from list-box
    #   And User click on Search button
    #    Then User should navigate to "events" screen
    #    And User verifies the list of returned events is based on selected start date & selected location
    #    And User sees the query parameter as "specialty="+"allspecialty"+"&startDate="+"<currentDate>"+"&location="+"<third-location>" attached to the end of url

    #@LocationFilter  @DateFilter
    #Scenario: User searches for events based on end date + location
    #    When User selects the end date with current date
    #    And User selects the fourth location from list-box
    #    And User click on Search button
    #    Then User should navigate to "events" screen
    #    And User verifies the list of returned events is based on selected end date & selected location
    #    And User sees the query parameter as "specialty="+"allspecialty"+"&startDate="+"<blank>"+"&endDate="+"<currentDate>"+"&location="+"<fourth-location>" attached to the end of url

    



    


        