/// <reference types="cypress" />

import {Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import Home from '../pages/Home';
import Events from '../pages/Events';

const home = new Home()
const events = new Events()

/* Scenario1: Verify header on home screen */

Given('User is on home screen', () => {
    cy.url().should('eq', Cypress.config().baseUrl)
})

And('User sees the welcome text as {string}', (welcomeText) => {
    home.getWelcomeText().contains(welcomeText)
})

And('User verifies no sticky header is present', () => {
    home.getStickyHeader().should('not.be.visible')  
})

And('User sees the -Medscape LIVE!- logo on header', () => {
    home.getMedscapeLiveLogo().should('be.visible')
    home.getStickyMedscapeLiveLogo().should('not.be.visible')
})

And('User verifies logo is non-clickable', () => {
    home.getMedscapeLiveLogo().should('not.have.attr', 'href')
})

And('User sees the -About Medscape LIVE- button on header', () => {
    home.getAboutButton().should('be.visible')
})

And('User verifies about button is clickable', () => {
    home.getAboutButton()
    .should('have.attr', 'href').then(() => {
        home.getAboutButton().click()
        cy.url().should('contain', 'about').then(() => {
            cy.go('back')
             cy.url().should('eq', Cypress.config().baseUrl)
        })
    })
})

/* Scenario2: Verify sticky header on home screen */

Given('User sees the hero image on home screen', () => {
    home.getHeroImage().should('be.visible')
})

When('User scroll past the hero image', () => {
    cy.scrollTo('bottom')
})

Then('User should see the sticky header', () => {
    home.getStickyHeader().should('be.visible')
})

And('User sees the -Medscape LIVE!- logo on sticky header', () => {
    home.getStickyMedscapeLiveLogo().should('be.visible')
})

And('User verifies logo is clickable', () => {
    home.getStickyMedscapeLiveLogo()
    .should('have.attr', 'href').then(() => {
        home.getStickyMedscapeLiveLogo().click()
        cy.url().should('eq', Cypress.config().baseUrl)
    })
})

And('User sees the -About Medscape LIVE- button on sticky header', () => {
    home.getStickyAboutButton().should('be.visible')
})

And('User verifies about button is clickable on sticky header', () => {
    home.getStickyAboutButton()
    .should('have.attr', 'href').then(() => {
        home.getStickyAboutButton().click()
        cy.url().should('contain', 'about').then(() => {
            cy.go('back')
        })
    })
})

/* Scenario3: Verify sticky header on events screen */

When('User scroll down to the bottom of page', () => {
    cy.scrollTo('bottom')
})

Then('User verifies sticky header does not get hide', () => {
    home.getStickyHeader().should('be.visible')
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





