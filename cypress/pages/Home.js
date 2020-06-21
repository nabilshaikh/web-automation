/// <reference types="cypress" />

class Home{    

    getMedscapeLiveLogo(){
        return cy.get('[data-test=home-search__header]')
        .find('[aria-label="Home Search Medscape Live Logo"]')
    }

    getAboutButton(){
        return cy.get('[data-test=home-search__header-about]')
    }

    getHeroImage(){
        return cy.get('[data-test=home-search__hero-img]')
    }

    getWelcomeText(){
        return cy.get('[data-test=home-search__hero-img]')
        .find('.home-search__welcome-text')
    }

    getStickyHeader(){
        return cy.get('[data-test=medscape-live-header]')
    }

    getStickyMedscapeLiveLogo(){
        return cy.get('[data-test=header__medscape-icon-router]')
    }    

    getStickyAboutButton(){
        return cy.get('[data-test=header__about-button]')
    }    

    /*                                               */

    getSpecialtyFilter(){
        return cy.get('[data-test=live-event-search__specialty-option]')
    }

    getLocationFilter(){
        return cy.get('[data-test=live-event-search__location-option]')
    }

    getFilterListBox(){
        return cy.get('div.v-select-list:visible')//.find('.v-list-item__content:visible')
    }

    getDateFilter(){
        return cy.get('[data-test=live-event-search__start-date-select]')
    }

    getFromDate(){
        return cy.get('[data-test=live-event-search__start-date-select]')
    }

    getToDate(){
        return cy.get('[data-test=live-event-search__end-date-select]')
    }

    getCalendarDropdown(){
        return cy.get('[data-test=live-event-search__date-picker]')
        .find('.v-date-picker-table')
    }

    getDateErrorMessage(){
        return cy.get('[data-test=home-search__hero-img]')
        .find('.v-messages__message')
    }

    getSearchButton(){
        return cy.get('[data-test=live-event-search__button]')
    } 
}

export default Home