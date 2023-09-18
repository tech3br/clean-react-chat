/// <reference types="cypress" />

Cypress.Commands.add('loginWithToken' as any, () => {
  // Store the token in a browser storage (e.g., localStorage)
  cy.window().then((win) => {
    win.localStorage.setItem(
      'account',
      JSON.stringify({
        accessToken: 'X2gbLGTEBAyOOtT1XlY1BLCLj5BbnfYY',
        name: 'Rubem',
        userId: 1,
      })
    );
  });

  cy.visit(Cypress.env('baseUrl'));
});
