describe('App Component (e2e)', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.intercept('/api/books', { fixture: 'books.json' });

    cy.intercept('POST', '/api/auth/login', { fixture: 'login.json' });

    cy.intercept('GET', '/api/users/c5c72ba3-7e63-4821-8496-f48e71050f80', { fixture: 'user.json' });
  });

  it('should properly load the storefront', () => {
    cy.get('.card-header').contains('A Book');
  });

  it('should log in a user', async () =>  {
    await indexedDB.deleteDatabase('geektext');

    cy.visit('/login');

    cy.get('#email')
      .type('john.doe@gmail.com')
      .should('have.value', 'john.doe@gmail.com');

    cy.get('#password')
      .type('IAmAPassword')
      .should('have.value', 'IAmAPassword');

    cy.get('#submit').click();

    cy.url().should('equal', '/');

    cy.get('#logout')
      .should('exist');
  });
});
