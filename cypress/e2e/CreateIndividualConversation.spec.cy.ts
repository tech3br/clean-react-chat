/// <reference types="cypress" />

describe('Create individual conversation flow', () => {
  it('should login in the application', () => {
    cy.loginWithToken();

    cy.get('[data-testid="newConversationIcon"]').click();
    cy.get('[data-testid="selectField"]').click();
    cy.get(':nth-child(1) > input').click();

    cy.get('[data-testid="createConversationButton"]').click();
    cy.contains('Chat: ').should('be.visible');
  });
});
