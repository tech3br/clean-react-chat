/// <reference types="cypress" />

describe('Create individual conversation flow', () => {
  it('should login in the application', () => {
    const validationText = 'Hello! This is a E2E validation test';
    cy.loginWithToken();
    cy.get('[data-testid="viewConversationIconContainer"]').first().click();
    cy.get('[data-testid="chatInputMessage"]').click().type(validationText);
    cy.get('[data-testid="chatInpuButton"]').click();
    cy.contains(validationText).should('be.visible');
  });
});
