describe('App Component (e2e)', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should properly load the storefront', () => {
    cy.get('.card-header').contains('A Book');
  });
});
