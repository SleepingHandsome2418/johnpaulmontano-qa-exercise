// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('Set_JobTitle_Skills_Or_Company', (JobTitle_Skills_Company) => {
    cy.get('[data-testid="findJobsKeywordInput"]').then($textbox => {
        cy.get($textbox).click()
        cy.get($textbox).type('{selectall}{backspace}')
        cy.get($textbox).should('not.have.text')
        cy.get($textbox).type(JobTitle_Skills_Company)
    })
})
