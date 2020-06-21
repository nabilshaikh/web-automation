/// <reference types="cypress" />
import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps";
import {EVENT_SERVICE_SEARCH_FILTERS, EVENT_SERVICE_SEARCH} from '../support/global-constant.js'
import Home from '../pages/Home';
import Events from '../pages/Events';

const home = new Home()
const events = new Events() 

/* Scenario1: Look & feel of specialty filter */

Given('User verifies specialty filter is present on home screen', () => {
    home.getSpecialtyFilter().should('be.visible')
})

And('User sees the placeholder text as {string}', (placeholder) => {
    home.getSpecialtyFilter().should('have.value', placeholder)
})

When('User clicks on specialty filter', () => {
    home.getSpecialtyFilter().click()
})

Then('User should see the list box which contains all possible specialties', () => {
    cy.request(EVENT_SERVICE_SEARCH_FILTERS)
      .then((response) => {
          var specialties = response.body.searchFilters
          var specDisp = specialties.map(function(item) {
              return item.specialtyDisplay;
            });
            specDisp.forEach(($specialty) => {
                home.getFilterListBox().then((el) => {
                expect(el).to.contain($specialty)
            })
        })
    })    
})

When('User type in incomplete specialty as {string}', (specialty) => {
    home.getSpecialtyFilter().click().type(specialty)
})

Then('User should see only one matching row containing {string} in list box', (specialty) => {
    home.getFilterListBox().then((elem) => {
        home.getFilterListBox().invoke('text').should('eq', specialty)
        const listingCount = Cypress.$(elem).length;
        expect(listingCount).to.equal(1)
    })
})

/* Scenario2: Search events based on incorrect specialty */

When('User type in incorrect specialty as {string}', (incorrectSpecialty) => {
    home.getSpecialtyFilter()
      .click()
      .focused()
      .clear()
      .type(incorrectSpecialty)   
})

Then('User should see the message as {string} in list box', (message) => {
    home.getFilterListBox().invoke('text').should('eq', message)
})

Then('User should navigate to {string} screen', (events) => {
    cy.url()
      .should('include', Cypress.config().baseUrl+events)
})

And('User sees the URL parameter as - specialty={string}', (specialty) => {
    cy.url()
      .should('include', 'specialty='+specialty.toLowerCase())
})

And('User verifies the list of returned events is based on - specialty={string}', (specialty) => {
    cy.request(EVENT_SERVICE_SEARCH+'?specialty='+specialty.toLowerCase()).then((response) => {
        const eventList = response.body.liveEvents
        events.getEvents().should('have.length', eventList.length)
    })
})

But('Not based on incorrect specialty {string}', (incorrectSpecialty) => {
    cy.url()
      .should('not.contain', incorrectSpecialty)
})

/* Scenario3: Search events based on correct specialty */

And('User selects option as {string}', (specialty) => {
    cy.get('.v-select-list')
    .contains(specialty)
    .click()
})

And('User verifies event link returns {int} response code', (respCode) => {
    events.getEvents()
        .should ('have.attr', 'href')
        .then((href) => {
            cy.request(href).then((response) => {
            expect(response.status).to.eq(respCode)            
        })
    })
})
