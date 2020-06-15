/// <reference types="cypress" />

import {Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import Home from '../pages/Home';

const home = new Home()

/* Scenario1: Verify header on home screen */

Given('User is on home screen', () => {
    cy.url().should('eq', Cypress.config().baseUrl)
})

And('User sees the welcome text as {string}', (welcomeText) => {
    home.getWelcomeText().then((captureWelcomeText) => {
        const displayWelcomeText = captureWelcomeText.text()
        expect(displayWelcomeText.trim()).to.equal(welcomeText)
    })
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



