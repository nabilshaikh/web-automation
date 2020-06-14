/* /// <reference types="cypress" />

import { Before, Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import Home from '../pages/Home';
import Events from '../pages/Events';

const home = new Home()
const events = new Events()

/* Before(() => {
    cy.visit('/')
}) 

Given('User should see logo on header', () => {
    home.getMedscapeLiveLogo().should('be.visible')
    //homepage.verifyMedscapeLiveLogo()
})

And('User clicks on Search button', () => {
    home.getSearchButton().click()
    //homepage.clickSearchButton()
})

Then('User should navigates to Events screen where URL should include {string}', (query) => {
    cy.url().should('eq', Cypress.config().baseUrl+query)
    //events.verifyEventsScreenURL(query)
})

And('User sees list of events', () => {
    cy.request('https://events-service.qa.medscape.com/events/search')
        .then((response) => {
            const eventList = response.body.liveEvents
            events.getEvents().should('have.length', eventList.length)
        })
    //events.verifyEventList()
})

When('User scroll down to bottom of page', () => {
    cy.scrollTo('bottom')
    //eventpage.ScrollDown()
})

Then('User should see logo on header', () => {
    home.getMedscapeLiveLogo().should('be.visible')
    //eventpage.verifyMedscapeLiveLogo()
})

And('User click on logo', () => {
    home.getMedscapeLiveLogo().click()
    //eventpage.clickMedscapeLiveLogo()
})

Then('User should land on home screen', () => {
    home.getMedscapeLiveLogo().should('be.visible')
    cy.url().should('eq', Cypress.config().baseUrl)
    //homepage.verifyHomeScreen()
})

Given('User should see About Medscape Live button on header', () => {
    home.getAboutButton().should('be.visible')
    //homepage.verifyAboutButton()
})

When('User clicks on it', () => {
    home.getAboutButton().click()
    //homepage.clickAboutButton()
})

Then('User should navigates to about page where URL should include {string}', (about) => {
    cy.url().should('eq', Cypress.config().baseUrl+about)
    //homepage.verifyAboutPage(about)
})

And('User sees the content as {string}', (about) => {
    cy.contains(about).should('be.visible')
    //homepage.verifyAboutPageContent(about)
})





 */