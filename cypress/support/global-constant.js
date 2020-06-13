

module.exports = {
EVENT_SERVICE_SEARCH : 'https://events-service.k8s.devint.medscape.com/events/search',
EVENT_SERVICE_SEARCH_FILTERS : 'https://events-service.k8s.devint.medscape.com/events/search/filters',

LOCAL_CURRENT_DATE : Cypress.moment().format('YYYY-MM-DD'),
EVENT_SERVICE_CURRENT_DATE : Cypress.moment().format('MM-DD-YYYY'),
EVENT_SERVICE_FUTURE_DATE : Cypress.moment().add(45, 'days').format('MM-DD-YYYY')
}