
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Sabrina')
    cy.get('input[name="lastName"]').type('Papes')
    cy.get('input[type="email"]').type('qapapes@gmail.com')
    cy.get('textarea[name="open-text-area"]').type('MMentoria Cypress')

    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
})