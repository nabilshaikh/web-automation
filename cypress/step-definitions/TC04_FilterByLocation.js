/* 
import { Before, Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
var matchingLocation
var secondLocation
var thirdLocation
var fourthLocation

//Scenario1

Given('User verifies location filter is present on home screen', () => {
    cy.get('[data-test=live-event-search__location-option]')
      .should('be.visible')
})

And('User sees the location placeholder text as {string}', (placeholder) => {
    cy.get('[data-test=live-event-search__location-option]')
      .should('have.value', placeholder)
})

When('User clicks on location filter', () => {
    cy.get('[data-test=live-event-search__location-option]')
      .click()
})

Then('User should see the list box which contains all possible locations', () => {
    cy.request('https://events-service.qa.medscape.com/events/search/filters')
      .then((response) => {
          var specialties = response.body.searchFilters
          var locations = specialties.map(function(item) {
              return item.locations;
            });        
            console.log(locations[0]);
            locations[0].forEach(($loc) => {
            console.log($loc)
            cy.get('.v-select-list').contains($loc).should('exist')
        })
    })    
})

When('User starts typing the correct location name as {string}', (location) => {
    matchingLocation = location
    cy.get('[data-test=live-event-search__location-option]')
      .click()
      .type(location)   
})

Then('User should see the matching string appears in list box', () => {
    cy.get('.v-list-item__mask')
      .contains(matchingLocation)
})

//Scenario2

When('User enters the incorrect location as {string} in location typeahead', (incorrectLocation) => {
    cy.get('[data-test=live-event-search__location-option]')
      .click()
      .focused()
      .clear()
      .type(incorrectLocation)   
})

Then('User should see the message as {string} in list box', (message) => {
    cy.get('.v-list-item__title')
      .contains(message)
})

Then('User should navigate to {string} screen', (events) => {
    cy.url()
      .should('include', Cypress.config().baseUrl+events)
})

And('User sees the query parameter as {string}+{string} attached to the end of url', (specialty_key, specialty_value) => {
    cy.url()
      .should('include', specialty_key+specialty_value)
})

And('User verifies the list of returned events is based on any location', () => {
    cy.request('https://events-service.qa.medscape.com/events/search').then((response) => {
        const eventList = response.body.liveEvents
        cy.get('[data-test=live-event-preview]').should('have.length', eventList.length)
    })
})

But('Not based on incorrect location {string}', (incorrectLocation) => {
    cy.url()
      .should('not.contain', incorrectLocation)
})

//Scenario3

And('User selects the second location from list-box', () => {
    cy.get('[data-test=live-event-search__location-option]')
      .click()
    cy.get('[role=listbox] > div')
      .eq(1)
      .click()
})

And('User verifies the list of returned events is based on second location from list-box', () => {
    cy.get('.v-list-item > .v-list-item__content').then((loc) => {
        secondLocation = loc.text()
    var location = secondLocation
    location = location.replace(",", "%2C");  
    location=location.replace(" ", "%20");
    console.log("location1: " + location)
    cy.request('https://events-service.qa.medscape.com/events/search?location='+location).then((response) => {
        const eventList = response.body.liveEvents
        //cy.wait(3000)
        cy.get('[data-test=live-event-preview]').should('have.length', eventList.length)
    })
})
})

And('User sees the query parameter as {string} attached to the end of url', () => {
    var location = secondLocation.replace(" ", "%20");
    cy.url()
      .should('include', 'specialty=allspecialty&location='+location)
})

//Scenario4 

When('User selects the specialty as {string}', (specialty) => {
    cy.get('[data-test=live-event-search__specialty-option]')
      .click()
    cy.get('[role=listbox]')
      .contains(specialty)
      .click()
})

And('User verifies the list of returned events is based on {string} & second location from list-box', (specialty) => {
    cy.get('#list-item-189-1 > .v-list-item__content').then((loc) => {
        secondLocation = loc.text()
    var location = secondLocation
    var location = location.replace(",", "%2C");  
    location=location.replace(" ", "%20");
    console.log("location2: " + location)
    cy.request('https://events-service.qa.medscape.com/events/search?specialty='+specialty.toLowerCase()+'&location='+location).then((response) => {
        const eventList = response.body.liveEvents
        cy.wait(3000)
        cy.get('[data-test=live-event-preview]').should('have.length', eventList.length)
    })
})
})

And('User sees the query parameter as {string}+{string}+{string} attached to the end of url', (string1, specialty, string3) => {
    var location = secondLocation.replace(" ", "%20");
    cy.url()
      .should('contains', 'specialty='+specialty.toLowerCase()+'&location='+location)
    console.log(location)
})

//Scenario5

And('User selects the third location from list-box', () => {
    cy.get('[data-test=live-event-search__location-option]')
      .click()
    cy.get('[role=listbox] > div')
      .eq(2)
      .click()
})

When('User selects the start date with current date', () => {
    cy.get('[data-test=live-event-search__specialty-option]').clear().type('Any Specialty')
    cy.get('#list-item-208-0 > .v-list-item__content > .v-list-item__title').click()
    cy.get('[data-test=live-event-search__location-option]').clear().type('Any location')
    cy.get('#list-item-189-0 > .v-list-item__content > .v-list-item__title').click()

    cy.get('[data-test=live-event-search__start-date-select]').click()
    cy.get('.v-date-picker-table__current').should('not.be.disabled').click()
})

And('User verifies the list of returned events is based on selected start date & selected location', () => {
    var startDate = Cypress.moment().format('MM-DD-YYYY')

    cy.get('#list-item-189-1 > .v-list-item__content').then((loc) => {
        secondLocation = loc.text()
    var location = secondLocation
    var location = location.replace(",", "%2C");  
    location=location.replace(" ", "%20");
    console.log("location3: " + location)
    cy.request('https://events-service.qa.medscape.com/events/search?startDate='+startDate+'&location='+location).then((response) => {
        const eventList = response.body.liveEvents
        cy.wait(2000)
        cy.get('[data-test=live-event-preview]').should('have.length', eventList.length)
    })
})
})

And('User sees the query parameter as {string}+{string}+{string}+{string}+{string}+{string} attached to the end of url', (string1, specialty, string3, startDate, string5, location) => {
    cy.get('#list-item-189-2 > .v-list-item__content').then((loc) => {
    thirdLocation = loc.text()
    var location = thirdLocation
    var location = location.replace(",", "%2C");  
    location=location.replace(" ", "%20");
    console.log("location1: " + location)

    var startDate = Cypress.moment().format('YYYY-MM-DD')
    cy.url()
      .should('contains', 'specialty='+specialty.toLowerCase()+'&startDate='+startDate+'&location='+location)
    console.log(location)
})

//Scenario6

When('User selects the end date with current date', () => {
    cy.get('[data-test=live-event-search__location-option]').clear().type('Any location')
    cy.get('#list-item-189-0 > .v-list-item__content > .v-list-item__title').click()
    cy.get('.v-input__icon--clear').first().click()
    cy.get('[data-test=live-event-search__end-date-select]').click()
    cy.get('.v-date-picker-table__current').should('not.be.disabled').click()
})

And('User selects the fourth location from list-box', () => {
    cy.get('[data-test=live-event-search__location-option]')
      .click()
    cy.get('[role=listbox] > div')
      .eq(3)
      .click()
})

And('User verifies the list of returned events is based on selected end date & selected location', () => {
    var endDate = Cypress.moment().format('MM-DD-YYYY')

    cy.get('#list-item-189-1 > .v-list-item__content').then((loc) => {
        secondLocation = loc.text()
    var location = secondLocation
    var location = location.replace(",", "%2C");  
    location=location.replace(" ", "%20");
    console.log("location3: " + location)
    cy.request('https://events-service.qa.medscape.com/events/search?endDate='+endDate+'&location='+location).then((response) => {
        const eventList = response.body.liveEvents
        cy.wait(3000)
        cy.get('[data-test=live-event-preview]').should('have.length', eventList.length)
    })
})
})
})

And('User sees the query parameter as {string}+{string}+{string}+{string}+{string}+{string}+{string}+{string} attached to the end of url', (string1, specialty, string3, startDate, string5, endDate, string7, location) => {
    cy.get('#list-item-189-3 > .v-list-item__content').then((loc) => {
    fourthLocation = loc.text()
    var location = fourthLocation
    //location = location.replace(",", "%2C");  
    location=location.replace(" ", "%20");
    console.log("location1: " + location)

    var endDate = Cypress.moment().format('YYYY-MM-DD')
    cy.url()
      .should('contains', 'specialty='+specialty.toLowerCase()+'&endDate='+endDate+'&location='+location)
    console.log(location)
})
})

//Scenario7

When('User selects the specialty', () => {
    cy.get('[data-test=live-event-search__specialty-option]')
      .click()
    cy.get('#list-72 > div')
      .eq(4)
      .click()
})

And('User selects the location from list-box', () => {
    cy.get('[data-test=live-event-search__location-option]')
      .click()
    cy.get('[role=listbox] > div')
      .eq(1)
      .click()
})

And('User selects the start date with current date & end date with future', () => {
    var currentDate = Cypress.moment().format('YYYY-MM-DD')
    var futureDate = Cypress.moment().add(45, 'days').format('YYYY-MM-DD')
    console.log('currentDate' + currentDate)
    cy.visit('/events?specialty=allspecialty&startDate='+currentDate+'&endDate='+futureDate)
})

  */