import {Given, When, Then, And, Before} from "cypress-cucumber-preprocessor/steps";
import {EVENT_SERVICE_SEARCH_FILTERS, EVENT_SERVICE_SEARCH} from '../support/global-constant.js'
import {getLocations} from '../support/networking.js'

import Home from '../pages/Home';
import Events from '../pages/Events';

const home = new Home()
const events = new Events() 

//var getSecondLocation
 
Before(() => {
  //cy.server()
  //cy.route(EVENT_SERVICE_SEARCH_FILTERS).as('searchFilters')    
  //console.log('during visit')
  cy.visit('/')
  //cy.wait('@searchFilters')
})

/* Scenario1: Look & feel of location filter */

Given('User verifies location filter is present on home screen', () => {
  home.getLocationFilter().should('be.visible')
})

And('User sees the location placeholder text as {string}', (placeholder) => {
  home.getLocationFilter().should('be.visible').should('have.value', placeholder)
})

When('User clicks on location filter', () => {
  cy.scrollTo('top')
  home.getLocationFilter().should('be.visible').click()

  console.log(cy.getAllLocation())
  //cy.log('locations: ' + locations)
})

Then('User should see the list box which contains all possible locations', () => {
  //const locations = getLocations()
  cy.getAllLocation().then((locations) => {
    cy.log('locations: ' + locations)
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

/* Scenario2: Search for events based on incorrect location */

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

/* Scenario3: Search for events based on correct location */

And('User selects the -{int}- option from list-box', (index) => {
  
  /* home.getFilterListBox().find('.v-list-item:visible')
  .eq(index-1)
  .then((el) => {
    getSecondLocation = el.text()
    cy.log('getSecondLocation' + getSecondLocation)
  }) */
  home.getFilterListBox().find('.v-list-item:visible').contains(getLocations()[0][index-1]).click({force:true})
  /* home.getLocationFilter().siblings()
  .invoke('removeAttr', 'type')
  .invoke('attr', 'value').then((el) => {
    getSecondLocation = el
    cy.log(getSecondLocation)
  }) */


  // from other workspace

  /* 
cy.getAllLocation().then((locations) => {
  console.log('location[0]: ' + locations[0][index - 1])
  home
    .getFilterListBox()
    //.find('.v-list-item:visible')
    .contains(locations[0][index - 1])
    .click({ force: true })
  })

   */
  /* home.getFilterListBox().find('.v-list-item:visible')
  .eq(index-1)
  .then((el) => {
    getSecondLocation = el.text()
    cy.log('getSecondLocation' + getSecondLocation)
  }) */

  //

  /* home
    .getFilterListBox()
    .find('.v-list-item:visible')
    //.contains(getLocations()[0][index - 1])
    .contains(getLocations()[0][index - 1])
    .click({ force: true }) */

  //

  /* home.getLocationFilter().siblings()
  .invoke('removeAttr', 'type')
  .invoke('attr', 'value').then((el) => {
    getSecondLocation = el
    cy.log(getSecondLocation)
  }) */



})

And('User sees the URL parameter as - specialty={string}&location={int}', (specialty, index) => {
  //var location = getSecondLocation.replace(" ", "%20");
  var location = encodeURI(getLocations()[0][index-1])
  cy.url()
    .should('include', 'specialty='+specialty.toLowerCase()+'&location='+location)
})

And('User verifies the list of returned events is based on selected location -{int}-', (index) => {
    var location = getLocations()[0][index-1]
    cy.request(EVENT_SERVICE_SEARCH+'?location='+location).then((response) => {
      const eventList = response.body.liveEvents
      events.getEvents().should('have.length', eventList.length)
  })
})

/* Scenario4: Search for events based on specialty + location */

And('User selects option as {string}', (specialty) => {
    home.getFilterListBox().click().then(() => {
      home.getFilterListBox()
      .contains(specialty)
      .click()
    })    
})

And('User verifies the list of returned events is based on selected {string} & location -{int}-', (specialty, index) => {
  var location = getLocations()[0][index-1]
  cy.request(EVENT_SERVICE_SEARCH+'?specialty='+specialty+'&location='+location).then((response) => {
    const eventList = response.body.liveEvents
    events.getEvents().should('have.length', eventList.length)
})
})