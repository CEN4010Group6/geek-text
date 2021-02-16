import { getGreeting } from '../support/app.po';

describe('geek-text-frontend', () => {
    beforeEach(() => cy.visis('/'))

    it('should display a proper welcome message', () => {
        getGreeting().contains('Welcome');
    })
})