Cypress.Commands.add('dataTest', (value: string) => {
  return cy.get(`[data-test=${value}]`);
});
