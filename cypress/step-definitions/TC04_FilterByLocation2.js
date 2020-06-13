import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps";
import {EVENT_SERVICE_SEARCH_FILTERS, EVENT_SERVICE_SEARCH} from '../support/global-constant.js'
import Home from '../pages/Home';
import Events from '../pages/Events';

const home = new Home()
const events = new Events() 

var matchingLocation
var secondLocation
var thirdLocation
var fourthLocation
var getSecondLocation
 

//Scenario-1

Given('User verifies location filter is present on home screen', () => {
  home.getLocationFilter().should('be.visible')
})

And('User sees the location placeholder text as {string}', (placeholder) => {
  home.getLocationFilter().should('be.visible').should('have.value', placeholder)
})

When('User clicks on location filter', () => {
  home.getLocationFilter().should('be.visible').click()
})

Then('User should see the list box which contains all possible locations', () => {
    cy.request(EVENT_SERVICE_SEARCH_FILTERS)
      .then((response) => {
          var specialties = response.body.searchFilters
          var locations = specialties.map(function(item) {
              return item.locations;
            });
            locations[0].forEach(($loc) => {
            home.getFilterListBox().contains($loc).should('exist')
        })
    })    
})

When('User type in incomplete location as {string}', (location) => {
    home.getLocationFilter().click().type(location)   
})

Then('User should see only one matching row containing {string} in list box', (location) => {
    home.getFilterListBox().then((elem) => {
      home.getFilterListBox().invoke('text').should('eq', location)
      const listCount = Cypress.$(elem).length;
      expect(listCount).to.equal(1)
  })
})

//Scenario-2

When('User type in incorrect location as {string}', (incorrectLocation) => {
  home.getLocationFilter()
  .click()
  .focused()
  .clear()
  .type(incorrectLocation)   
})

Then('User should see the message as {string} in list box', (message) => {
    home.getFilterListBox().invoke('text').should('eq', message)
})

But('Not based on incorrect location {string}', (incorrectLocation) => {
    cy.url()
      .should('not.contain', incorrectLocation)
})

//Scenario3

And('User selects the second -{int}- option from list-box', (index) => {
    home.getLocationFilter().then(() => {
      home.getFilterListBox().eq(index-1).then((el) => {
        getSecondLocation = el.text()
      })
      home.getFilterListBox().eq(index-1).click()
    })    
})

And('User sees the URL parameter as - specialty={string}&location=SECOND-OPTION', (specialty) => {
  var location = getSecondLocation.replace(" ", "%20");
  cy.url()
    .should('include', 'specialty='+specialty.toLowerCase()+'&location='+location)
})

And('User verifies the list of returned events is based on selected location', () => {
    var location = getSecondLocation
    cy.request(EVENT_SERVICE_SEARCH+'?location='+location).then((response) => {
      const eventList = response.body.liveEvents
      events.getEvents().should('have.length', eventList.length)
  })
})

//Scenario-4 

And('User selects option as {string}', (specialty) => {
    home.getFilterListBox().click().then(() => {
      home.getFilterListBox()
      .contains(specialty)
      .click()
    })    
})

And('User verifies the list of returned events is based on selected {string} & location', (specialty) => {
  var location = getSecondLocation
  cy.request(EVENT_SERVICE_SEARCH+'?specialty='+specialty+'&location='+location).then((response) => {
    const eventList = response.body.liveEvents
    events.getEvents().should('have.length', eventList.length)
})
})

//Scenario5

And('User selects the third location from list-box', () => {
    home.getLocationFilter()
    //cy.get('[data-test=live-event-search__location-option]')
      .click()
    //cy.get('[role=listbox] > div')
    home.getFilterListBox()
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
    cy.request('https://events-service.k8s.devint.medscape.com/events/search?startDate='+startDate+'&location='+location).then((response) => {
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
    cy.request('https://events-service.k8s.devint.medscape.com/events/search?endDate='+endDate+'&location='+location).then((response) => {
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

