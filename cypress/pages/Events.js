/// <reference types="cypress" />

class Events{

    getEvents(){
        return cy.get('[data-test=live-event-preview]')
    }
}

export default Events