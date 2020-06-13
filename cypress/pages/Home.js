/// <reference types="cypress" />

class Home{

    getMedscapeLiveLogo(){
        return cy.get('[data-test=header__medscape-icon]')
    }

    getSpecialtyFilter(){
        return cy.get('[data-test=live-event-search__specialty-option]')
    }

    getLocationFilter(){
        return cy.get('[data-test=live-event-search__location-option]')
    }

    getFilterListBox(){
        return cy.get('.v-select-list:visible').find('.v-list-item')//.find('.v-list-item__content:visible')
    }

    getSearchButton(){
        return cy.get('[data-test=live-event-search__button]')
    }

    getAboutButton(){
        return cy.get('[data-test=header__about-button]')
    }    
}

export default Home