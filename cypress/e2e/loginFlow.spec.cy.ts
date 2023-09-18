/// <reference types="cypress" />

describe('Login flow', () => {
  it('should login in the application', () => {
    cy.visit(Cypress.env('baseUrl') + '/login');

    cy.get('[data-testid="username"]').click().type(Cypress.env('user').username);
    cy.get('[data-testid="password"]')
      .click()
      .type(Cypress.env('user').password);
    cy.get('[data-testid="loginButton"]').click();
    cy.get('[data-testid="viewConversationIconContainer"]').should('be.visible');
  });
});
