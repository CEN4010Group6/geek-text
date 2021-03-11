import * as user from '../fixtures/user.json';
import * as login from '../fixtures/login.json';

describe('Book component (e2e)', () => {
  beforeEach(() => {
    cy.intercept('/api/books/c152e39b-a19d-400a-8905-043d2960d8ad', { fixture: 'book.json' });

    cy.intercept('POST', '/api/auth/login', { fixture: 'login.json' });

    cy.intercept('GET', '/api/users/c5c72ba3-7e63-4821-8496-f48e71050f80', { fixture: 'user.json' });

    cy.visit('/books/c152e39b-a19d-400a-8905-043d2960d8ad');

    indexedDB.deleteDatabase('geektext');
  });

  it('should properly display the book', () => {
    cy.get('#title')
      .should('contain', 'A Book');

    cy.get('#price')
      .should('contain', '$1.50');

    cy.get('#average-rating')
      .should('exist');
  });

  it('should not have an enabled button for reviewing when a user is not logged in', () => {
    cy.get('#submit-review')
      .should('be.disabled');
  });

  it('should enable the review button when the user is logged in', () => {

    cy.visit('/login');

    cy.get('#email')
      .type('john.doe@gmail.com')
      .should('have.value', 'john.doe@gmail.com');

    cy.get('#password')
      .type('IAmAPassword')
      .should('have.value', 'IAmAPassword');

    cy.get('#submit')
      .click();

    cy.get('#logout')
      .should('exist');

    cy.visit('/books/c152e39b-a19d-400a-8905-043d2960d8ad');

    cy.get('#submit-review')
      .should('not.be.disabled');
  });
});
