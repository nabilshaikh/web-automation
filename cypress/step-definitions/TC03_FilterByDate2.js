import {
  Before,
  Given,
  When,
  Then,
  And
} from 'cypress-cucumber-preprocessor/steps'
import {
  LOCAL_CURRENT_DATE,
  EVENT_SERVICE_CURRENT_DATE,
  EVENT_SERVICE_SEARCH
} from '../support/global-constant.js'

const localCurrentDate = Cypress.moment().format('DD')
let futureDate
let pastDate

/* Scenario1: Look & feel of date filter */

Given('User verifies date filter is present on home screen', () => {
  cy.get('[data-test=live-event-search__start-date-select]')
  .should('be.visible')
})

And('User sees the placeholder text as {string} on date filter', (anyDates) => {
  cy.get('[data-test=live-event-search__start-date-select]')
    .invoke('attr', 'placeholder')
    .should('contain', anyDates)
})

When('User clicks on date filter', () => {
  cy.get('[data-test=live-event-search__start-date-select]').click()
})

Then('User sees {string} placeholder text gets changed to {string} & {string} date input fields', (anyDates, from, to) => {
  cy.get('[data-test=live-event-search__start-date-select]')
    .invoke('attr', 'placeholder')
    .should('not.contain', anyDates)
  cy.get('[data-test=live-event-search__start-date-select]')
    .invoke('attr', 'placeholder')
    .should('contain', from)
  cy.get('[data-test=live-event-search__end-date-select]')
    .invoke('attr', 'placeholder')
    .should('contain', to)
})

And('User sees the calendar dropdown', () => {
  cy.get('[data-test=live-event-search__date-picker]')
  .find('.v-date-picker-table')
  .should('be.visible')
})

/* Scenario2: User searches for events - From (current-date) & To (current-date) */





When('test', () => {

  cy.get('[data-test=live-event-search__start-date-select]').click()
  cy.get('[data-test=live-event-search__start-date-select]').invoke(
    'removeAttr',
    'readonly'
  )
  
  cy.get('[data-test=live-event-search__start-date-select]')
    .clear()
    .invoke('val', '2020-06-10')
    .trigger('input')
  cy.get('[data-test=live-event-search__button]').click()

  /* 
    //Solution1

    cy.get('[data-test=live-event-search__end-date-select]').click()
    cy.get('.v-date-picker-table__current').click()
    
    cy.get('[data-test=live-event-search__end-date-select]').invoke(
        'removeAttr',
        'readonly'
      ).then(() => {
        cy.get('.v-input__icon--clear').last().click()
        cy.get('[data-test=live-event-search__end-date-select]').type('@')
        .type('2020-06-08')
        
        .type('{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}')
        .type('{backspace}{backspace}{backspace}{backspace}')
        
      })

 */


/* 
 // solution2 
  cy.get('[data-test=live-event-search__end-date-select]').click()
  cy.get('.v-date-picker-table__current').click()

  cy.get('[data-test=live-event-search__end-date-select]').invoke(
    'removeAttr',
    'readonly'
  )
  cy.get('.v-input__icon--clear')
    .last()
    .click()
  cy.get('[data-test=live-event-search__end-date-select]')
    .clear()
    .invoke('val', '2020-06-10')
    .trigger('input')
  cy.get('[data-test=live-event-search__button]').click()

 */


  // cy.get('[data-test=live-event-search__end-date-select]').clear().type('2020-06-08')

  /* 

  cy.get('[data-test=live-event-search__end-date-select]').invoke(
    'removeAttr',
    'readonly'
  )
  cy.get('[data-test=live-event-search__end-date-select]').invoke(
    'prop',
    'typeable',
    'true'
  )
  cy.get('[data-test=live-event-search__end-date-select]').clear().then((el) => {

        Cypress.$("input:text").val('2020-06-08')
  })

 */

  // cy.get('[data-test=live-event-search__button]').click()

  // .clear().invoke('val', '2020-06-08')

  /* .type('2020-06-03')
    cy.get('.v-input__icon--clear').last().click() */

  // cy.get('[data-test=live-event-search__end-date-select]').type('2020-06-03')
  // .clear().invoke('val', '2020-06-03')//.clear().invoke('val', '2020-06-03')

  // cy.wait(2000)
  // cy.get('[data-test=live-event-search__button]').click()
  // trigger('2020-06-03');//type('2020-06-03')
})

// Scenario1

Given(
  'User sees the date input field having labels as {string} & {string}',
  (startDate, endDate) => {
    cy.contains(startDate).should('be.visible')
    cy.contains(endDate).should('be.visible')
  }
)

And('User sees the placeholder text as {string}', (anyDate) => {
  cy.get('[data-test=live-event-search__start-date-select]')
    .invoke('attr', 'placeholder')
    .should('contain', anyDate)
})



Then('User should see the date picker highlighting the current date', () => {
  cy.get('.v-date-picker-table__current > div').should(($div) => {
    const captureCurrentDate = $div.text()
    expect(captureCurrentDate.trim()).to.equal(localCurrentDate)
  })
})

And('User verifies current date is selectable on start date field', () => {
  cy.get('.v-date-picker-table__current')
    .should('not.be.disabled')
    .click()
})

And('User verifies future date is selectable on start date field', () => {
  cy.get('[data-test=live-event-search__start-date-select]').click()
  futureDate = localCurrentDate
  cy.get('[data-test=live-event-search__date-picker]')
    .find('.v-btn__content')
    .contains(++futureDate)
    .parent()
    .should('not.be.disabled')
    .click()
  // cy.get('.v-btn__content').contains(++futureDate).parent().should('not.be.disabled').click()
  cy.get('[data-test=live-event-search__start-date-select]').click()

  // Daniel comment
})

But('User should not able to select past date', () => {
  pastDate = localCurrentDate
  cy.get('.v-btn__content')
    .contains(--pastDate)
    .parent()
    .should('have.class', 'v-btn--disabled')
})

And('User clears the Start Date', () => {
  cy.get('[data-test=live-event-search__start-date-select]').click()
  cy.get('.v-input__icon--clear')
    .first()
    .click()
})

When('User clicks on End date', () => {
  cy.get('[data-test=live-event-search__end-date-select]').click()
})

And('User verifies current date is selectable on end date field', () => {
  cy.get('.v-date-picker-table__current')
    .should('not.be.disabled')
    .click()
})

And('User verifies future date is selectable on end date field', () => {
  cy.get('[data-test=live-event-search__end-date-select]').click()
  futureDate = localCurrentDate
  cy.get('.v-btn__content')
    .contains(++futureDate)
    .parent()
    .should('not.be.disabled')
    .click()
})

And('User clears the End Date', () => {
  cy.get('.v-input__icon--clear')
    .last()
    .click()
})

// Scenario2

When('User clicks on Start date ', () => {
  cy.get('[data-test=live-event-search__start-date-select]').click()
  cy.get('[data-test=live-event-search__start-date-select]')
    .invoke('removeAttr', 'readonly')
    .click()
})

And('User selects the current date', () => {
  cy.get('.v-date-picker-table__current').click()
})

And('User clicks on End date ', () => {
  cy.get('[data-test=live-event-search__end-date-select]').click()
  // $('[data-test=live-event-search__start-date-select]').removeAttr('readonly');
  // $('#input-260').prop('readonly',false);
})

And('User clicks on Search button', () => {
  cy.get('[data-test=live-event-search__button]').click()
})

Then('User should navigate to {string} screen', (events) => {
  cy.url().should('include', Cypress.config().baseUrl + events)
})

And(
  'User sees the URL parameter as - specialty={string}&startDate={string}&endDate={string}',
  (allspecialty) => {
    cy.url().should(
      'eq',
      Cypress.config().baseUrl +
        'events?specialty=' +
        allspecialty +
        '&startDate=' +
        LOCAL_CURRENT_DATE +
        '&endDate=' +
        LOCAL_CURRENT_DATE
    )
  }
)

And(
  'User verifies the list of returned events is based on - specialty {string}, start date {string} & end date {string}',
  (allspecialty) => {
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
      cy.get('[data-test=live-event-preview]').should(
        'have.length',
        eventList.length
      )
    })
  }
)

// Scenario3

And('User selects the future date', () => {
  cy.get('.v-date-picker-table__current').click()
})

When(
  'User searches for event by providing start date with current date and end date with future date',
  () => {
    const currentDate = Cypress.moment().format('YYYY-MM-DD')
    const futureDate = Cypress.moment()
      .add(45, 'days')
      .format('YYYY-MM-DD')
    console.log('currentDate' + currentDate)
    cy.visit(
      '/events?specialty=allspecialty&startDate=' +
        currentDate +
        '&endDate=' +
        futureDate
    )
  }
)

Then('User navigates to Events screen and sees the URL as {string}', () => {
  const currentDate = Cypress.moment().format('YYYY-MM-DD')
  const futureDate = Cypress.moment()
    .add(45, 'days')
    .format('YYYY-MM-DD')
  cy.url().should(
    'eq',
    Cypress.config().baseUrl +
      '/events?specialty=allspecialty&startDate=' +
      currentDate +
      '&endDate=' +
      futureDate
  )
})

And('User verifies the list of events returned', () => {
  const startDate = Cypress.moment().format('MM-DD-YYYY')
  const endDate = Cypress.moment()
    .add(45, 'days')
    .format('MM-DD-YYYY')
  cy.request(
    'https://events-service.qa.medscape.com/events/search?specialty=allspecialty&startDate=' +
      startDate +
      '&endDate=' +
      endDate
  ).then((response) => {
    const eventList = response.body.liveEvents
    cy.get('[data-test=live-event-preview]').should(
      'have.length',
      eventList.length
    )
  })
})

// Scenario4

When(
  'User searches for event by providing start date with future date and end date with current date',
  () => {
    const currentDate = Cypress.moment().format('YYYY-MM-DD')
    const futureDate = Cypress.moment()
      .add(45, 'days')
      .format('YYYY-MM-DD')
    cy.visit(
      '/events?specialty=allspecialty&startDate=' +
        futureDate +
        '&endDate=' +
        currentDate
    )
  }
)

Then('User sees the error message as {string}', (errorMessage) => {
  cy.contains(errorMessage).should('be.visible')
})

// Scenario5

When('User searches for event by providing only start date', () => {
  const currentDate = Cypress.moment().format('YYYY-MM-DD')
  cy.visit('/events?specialty=allspecialty&startDate=' + currentDate)
})

Then(
  'User navigates to Events screen and sees the URL contains only start date as {string}',
  () => {
    const currentDate = Cypress.moment().format('YYYY-MM-DD')
    cy.url().should(
      'eq',
      Cypress.config().baseUrl +
        '/events?specialty=allspecialty&startDate=' +
        currentDate
    )
  }
)

And('User verifies the list of returned events is based on start date', () => {
  const startDate = Cypress.moment().format('MM-DD-YYYY')
  cy.request(
    'https://events-service.qa.medscape.com/events/search?specialty=allspecialty&startDate=' +
      startDate
  ).then((response) => {
    const eventList = response.body.liveEvents
    cy.get('[data-test=live-event-preview]').should(
      'have.length',
      eventList.length
    )
  })
})

// Scenario6

When('User searches for event by providing only end date', () => {
  const futureDate = Cypress.moment()
    .add(45, 'days')
    .format('YYYY-MM-DD')
  cy.visit('/events?specialty=allspecialty&endDate=' + futureDate)
})

Then(
  'User navigates to Events screen and sees the URL contains only end date as {string}',
  () => {
    const futureDate = Cypress.moment()
      .add(45, 'days')
      .format('YYYY-MM-DD')
    cy.url().should(
      'eq',
      Cypress.config().baseUrl +
        '/events?specialty=allspecialty&endDate=' +
        futureDate
    )
  }
)

And('User verifies the list of returned events is based on end date', () => {
  const futureDate = Cypress.moment()
    .add(45, 'days')
    .format('MM-DD-YYYY')
  cy.request(
    'https://events-service.qa.medscape.com/events/search?specialty=allspecialty&endDate=' +
      futureDate
  ).then((response) => {
    const eventList = response.body.liveEvents
    cy.get('[data-test=live-event-preview]').should(
      'have.length',
      eventList.length
    )
  })
})
