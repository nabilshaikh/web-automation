import {EVENT_SERVICE_SEARCH_FILTERS, EVENT_SERVICE_SEARCH} from '../support/global-constant.js'
import {Before} from "cypress-cucumber-preprocessor/steps";

var locations


Before(() => {
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

module.exports = {
    getLocations(){
        return locations
    }
}