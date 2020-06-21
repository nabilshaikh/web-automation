// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import {EVENT_SERVICE_SEARCH_FILTERS, EVENT_SERVICE_SEARCH} from '../support/global-constant.js'

var locations

before(() => {
    console.log('after initiation')
    cy.request(EVENT_SERVICE_SEARCH_FILTERS)
    .then((response) => {
    var specialties = response.body.searchFilters
    console.log('locations')
    locations = specialties.map(function(item) {
        return item.locations;
    });
}) 

})
Cypress.Commands.add('getAllLocation', () => {
    return locations
})
