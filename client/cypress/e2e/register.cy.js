describe('Registration page', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('render the component', () => {
        cy.get('div#root').should('exist');
    });

    it('register a new user successfully', () => {

        cy.window().then((win) => {
            cy.stub(win, 'alert').as('windowAlert')
        });
        cy.visit('http://localhost:3000/register');
        cy.get('input[type="text"]').type('John Doe');
        cy.get('input[type="email"]').type('john@example.com');
        cy.get('input[type="password"]').type('password123');

        cy.get('button').click();

        cy.get('@windowAlert');
    });

})