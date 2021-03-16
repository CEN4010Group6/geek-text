describe('Reviews component (e2e)', () => {

  beforeEach(() => {
    cy.visit('/books/c152e39b-a19d-400a-8905-043d2960d8ad');

    cy.get('#submit-review').click();
  });

  it('should display the review page', () => {
    cy.get('h1').contains('A Book');
    cy.get('.lightbox-single')
      .should('have.attr', 'src')
      .should('include', 'https://via.placeholder.com/320');
  });
});
