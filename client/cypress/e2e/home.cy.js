describe('Home Page Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/search');
  });

  it('render the component', () => {
    cy.get('div#root').should('exist');
  });

  it('handles product name search', () => {
    cy.intercept('GET', 'http://localhost:8080/product-names', { fixture: 'productNames.json' }).as('productNames');
    cy.get('input.rbt-input-main.form-control.rbt-input').type('boxing bag');
    cy.wait('@productNames').then(() => {
      cy.get('input.rbt-input-main.form-control.rbt-input').should('have.value', "boxing bag");
    });
  });

})