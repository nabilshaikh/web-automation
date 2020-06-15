import {
  Given,
  When,
  Then,
  And
} from 'cypress-cucumber-preprocessor/steps'
import {
  LOCAL_CURRENT_DATE,
  LOCAL_FUTURE_DATE,
  EVENT_SERVICE_CURRENT_DATE,
  EVENT_SERVICE_FUTURE_DATE,
  EVENT_SERVICE_SEARCH
} from '../support/global-constant.js'

import Home from '../pages/Home';
import Events from '../pages/Events';

const home = new Home()
const event = new Events()

/* Scenario1: Look & feel of date filter */

Given('User verifies date filter is present on home screen', () => {
  home.getDateFilter().should('be.visible')
})

And('User sees the placeholder text as {string} on date filter', (anyDates) => {
  home.getDateFilter()
  .invoke('attr', 'placeholder')
  .should('contain', anyDates)
})

When('User clicks on date filter', () => {
  home.getDateFilter().click()
})

Then('User sees {string} placeholder text gets changed to {string} & {string} date input fields', (anyDates, from, to) => {
  home.getDateFilter()
  .invoke('attr', 'placeholder')
  .should('not.contain', anyDates)
  home.getFromDate()
  .invoke('attr', 'placeholder')
  .should('contain', from)
  home.getToDate()
  .invoke('attr', 'placeholder')
  .should('contain', to)
})

And('User sees the calendar dropdown', () => {
  home.getCalendarDropdown()
  .should('be.visible')
})

/* Scenario2: User searches for events - From (current-date) & To (current-date) */

And('User enters the From date as current date', () => {
  home.getFromDate()
  .invoke('removeAttr', 'readonly')
  home.getFromDate()
  .invoke('val', LOCAL_CURRENT_DATE)
  .trigger('input')
  home.getFromDate().click()
})

And('User clicks on To date', () => {
  home.getToDate().click()
})

And('User enters the To date as current date', () => {
  home.getToDate()
  .invoke('removeAttr', 'readonly')
  home.getToDate()
  .invoke('val', LOCAL_CURRENT_DATE)
  .trigger('input')
  home.getToDate().click()
  })

And('User sees the URL parameter as - specialty={string}&startDate=current-date&endDate=current-date',(allspecialty) => {
    cy.url().should('eq',Cypress.config().baseUrl+'events?specialty='+allspecialty+'&startDate='+LOCAL_CURRENT_DATE+'&endDate='+LOCAL_CURRENT_DATE)
  })

And('User verifies the list of returned events is based on {string} and From-To date as current date',(allspecialty) => {
      cy.request(
        EVENT_SERVICE_SEARCH +
          '?specialty=' +
          allspecialty +
          '&startDate=' +
          EVENT_SERVICE_CURRENT_DATE +
          '&endDate=' +
          EVENT_SERVICE_CURRENT_DATE
      ).then((response) => {
        const eventList = response.body.liveEvents
        event.getEvents().should(
          'have.length',
          eventList.length
        )
      })
    })

/* Scenario3: User searches for events - From (current-date) & To (future-date) */

And('User enters the To date as future date', () => {
  home.getToDate()
  .invoke('removeAttr', 'readonly')
  home.getToDate()
  .invoke('val', LOCAL_FUTURE_DATE)
  .trigger('input')
  home.getToDate().click()
  })

  And('User sees the URL parameter as - specialty={string}&startDate=current-date&endDate=future-date',(allspecialty) => {
    cy.url().should('eq',Cypress.config().baseUrl+'events?specialty='+allspecialty+'&startDate='+LOCAL_CURRENT_DATE+'&endDate='+LOCAL_FUTURE_DATE)
  })

And('User verifies the list of returned events is based on {string} and From as current date & To as future date',(allspecialty) => {
      cy.request(
        EVENT_SERVICE_SEARCH +
          '?specialty=' +
          allspecialty +
          '&startDate=' +
          EVENT_SERVICE_CURRENT_DATE +
          '&endDate=' +
          EVENT_SERVICE_FUTURE_DATE
      ).then((response) => {
        const eventList = response.body.liveEvents
        event.getEvents().should(
          'have.length',
          eventList.length
        )
      })
    })

/* Scenario4: User searches for events - From (future-date) & To (current-date) */

And('User enters the From date as future date', () => {
  home.getFromDate()
  .invoke('removeAttr', 'readonly')
  home.getFromDate()
  .invoke('val', LOCAL_FUTURE_DATE)
  .trigger('input')
  home.getFromDate().click()
    })
    
    And('User clicks on To date', () => {
      home.getToDate().click()
    })

Then('User should see the error message as {string}', (errorMessage) => {
  home.getDateErrorMessage().then((captureErrorMessage) => {
    const displayErrorMessage = captureErrorMessage.text()
    expect(displayErrorMessage).to.equal(errorMessage)
  })
})

/* Scenario5: User searches for events - only From date */

And('User sees the URL parameter as - specialty={string}&startDate=current-date',(allspecialty) => {
    cy.url().should('eq',Cypress.config().baseUrl+'events?specialty='+allspecialty+'&startDate='+LOCAL_CURRENT_DATE)
  })

And('User verifies the list of returned events is based on {string} and From date as current date',(allspecialty) => {
      cy.request(
        EVENT_SERVICE_SEARCH +
          '?specialty=' +
          allspecialty +
          '&startDate=' +
          EVENT_SERVICE_CURRENT_DATE
      ).then((response) => {
        const eventList = response.body.liveEvents
        event.getEvents().should(
          'have.length',
          eventList.length
        )
      })
    })

/* Scenario6: User searches for events - only To date */

And('User sees the URL parameter as - specialty={string}&endDate=future-date',(allspecialty) => {
  cy.url().should('eq',Cypress.config().baseUrl+'events?specialty='+allspecialty+'&endDate='+LOCAL_FUTURE_DATE)
})

And('User verifies the list of returned events is based on {string} and To date as future date',(allspecialty) => {
    cy.request(
      EVENT_SERVICE_SEARCH +
        '?specialty=' +
        allspecialty +
        '&endDate=' +
        EVENT_SERVICE_FUTURE_DATE
    ).then((response) => {
      const eventList = response.body.liveEvents
      event.getEvents().should(
        'have.length',
        eventList.length
      )
    })
  })