/// <reference types="cypress" />

describe('Create group conversation flow', () => {
  it('should login in the application', () => {
    cy.loginWithToken();

    cy.get('[data-testid="newConversationIcon"]').click();
    cy.get('[data-testid="selectField"]').click();
    cy.get(':nth-child(1) > input').click();
    cy.get(':nth-child(2) > input').click();
    cy.get('[data-testid="selectField"]').click();

    cy.get('[data-testid="name"]')
      .dblclick({ force: true })
      .type('E2E Validation Group');

    cy.get('[data-testid="createConversationButton"]').click();
    cy.contains('Group Chat: ').should('be.visible');
  });
});
