# Story      : LBU-101-Filter events by location from homepage

Feature: Filter events by location

    @LocationFilter
    Scenario: User verifies the look & feel of location filter
        Given User verifies location filter is present on home screen
        And User sees the location placeholder text as 'Any location'
        When User clicks on location filter
        Then User should see the list box which contains all possible locations
        When User starts typing the correct location name as 'Online'
        Then User should see the matching string appears in list box

    @LocationFilter
    Scenario: User searches for events based on incorrect location
        When User enters the incorrect location as "Onnline" in location typeahead
        Then User should see the message as "No data available" in list box
        And User click on Search button
        Then User should navigate to "/events" screen
        And User sees the query parameter as "specialty="+"allspecialty" attached to the end of url
        And User verifies the list of returned events is based on any location
        But Not based on incorrect location "Onnline"
    
    @LocationFilter
    Scenario: User searches for events based on correct location        
        When User clicks on location filter
        Then User should see the list box which contains all possible locations
        And User selects the second location from list-box
        And User click on Search button
        Then User should navigate to "/events" screen 
        And User verifies the list of returned events is based on second location from list-box
        And User sees the query parameter as "specialty=allspecialty&location=<SECOND-LOCATION>" attached to the end of url
    
    @LocationFilter @SpecialtyFilter
    Scenario Outline: User searches for events based on specialty + location
        When User selects the specialty as "<SPECIALTY>"
        And User selects the second location from list-box
        And User click on Search button
        Then User should navigate to "/events" screen   
        And User verifies the list of returned events is based on "<SPECIALTY>" & second location from list-box
        And User sees the query parameter as "specialty="+"<SPECIALTY>"+"&location=<SECOND-LOCATION>" attached to the end of url
    
    Examples:
        |SPECIALTY|      
        |Cardiology|     

    @LocationFilter @DateFilter
    Scenario: User searches for events based on start date + location
        When User selects the start date with current date
        And User selects the third location from list-box
        And User click on Search button
        Then User should navigate to "/events" screen
        And User verifies the list of returned events is based on selected start date & selected location
        And User sees the query parameter as "specialty="+"allspecialty"+"&startDate="+"<currentDate>"+"&location="+"<third-location>" attached to the end of url

    @LocationFilter  @DateFilter
    Scenario: User searches for events based on end date + location
        When User selects the end date with current date
        And User selects the fourth location from list-box
        And User click on Search button
        Then User should navigate to "/events" screen
        And User verifies the list of returned events is based on selected end date & selected location
        And User sees the query parameter as "specialty="+"allspecialty"+"&startDate="+"<blank>"+"&endDate="+"<currentDate>"+"&location="+"<fourth-location>" attached to the end of url

    



    


        