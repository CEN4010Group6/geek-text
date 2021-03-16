import './commands';
import * as config from '../../cypress.json';

Cypress.on('uncaught:exception', (err: any, runnable: any) => {
  return false
});

beforeEach(() => {
  indexedDB.deleteDatabase('geektext');

  cy.intercept('POST', '/api/auth/login', { fixture: 'login.json' });

  cy.intercept('GET', '/api/users/c5c72ba3-7e63-4821-8496-f48e71050f80', { fixture: 'user.json' });

  cy.intercept('/api/books/c152e39b-a19d-400a-8905-043d2960d8ad', { fixture: 'book.json' });

  cy.intercept('/api/books', { fixture: 'books.json' });

  cy.visit('/login');

  cy.get('#email')
    .type('john.doe@gmail.com')
    .should('have.value', 'john.doe@gmail.com');

  cy.get('#password')
    .type('IAmAPassword')
    .should('have.value', 'IAmAPassword');

  cy.get('#submit').click();

  cy.url().should('equal', config.baseUrl + '/');

  cy.get('#logout')
    .should('exist');
});
