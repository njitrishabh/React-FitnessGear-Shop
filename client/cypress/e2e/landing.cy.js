describe('Landing Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('Clicking on Search products to navigate to search page', () => {

        cy.visit('http://localhost:3000/')

        cy.get('.main-container').should('be.visible')

        cy.get('button').contains('Search Products').click()

        cy.url().should('include', '/search')
    })
})