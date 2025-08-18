// Custom commands for Cypress

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/auth/signin')
  cy.get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
  cy.url().should('not.include', '/auth/signin')
})

Cypress.Commands.add('logout', () => {
  // Add logout logic here if needed
  cy.visit('/')
})
