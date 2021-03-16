import * as user from '../fixtures/user.json';
import * as login from '../fixtures/login.json';
import { createYield } from 'typescript';

describe('Book component (e2e)', () => {
  beforeEach(() => {
    cy.visit('/books/c152e39b-a19d-400a-8905-043d2960d8ad');
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
    cy.visit('/logout');

    cy.visit('/books/c152e39b-a19d-400a-8905-043d2960d8ad')

    cy.get('#submit-review').should('be.disabled');
  });

  it('should enable the review button when the user is logged in', () => {
    cy.get('#submit-review')
      .should('not.be.disabled');
  });
});
