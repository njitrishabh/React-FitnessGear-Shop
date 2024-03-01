describe('Home Component Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); // Change the URL as per your application's URL
  });

  it('renders the component', () => {
    cy.get('.search-filters').should('exist');
  });

  it('handles product name search', () => {
    cy.intercept('GET', 'http://localhost:8080/product-names', { fixture: 'productNames.json' }).as('productNames');
    cy.get('input.rbt-input-main.form-control.rbt-input').type('boxing bag');
    cy.wait('@productNames').then(() => {
      cy.get('input.rbt-input-main.form-control.rbt-input').should('have.value', "boxing bag"); // Assuming 2 items in the fixture
    });
  });

  it('handles brand selection', () => {
    cy.intercept('GET', 'http://localhost:8080/search-products?productName=boxing%20bag', { fixture: 'searchResults.json' }).as('brands');
    cy.get('input.rbt-input-main.form-control.rbt-input').type('boxing bag');
    cy.wait('@brands').then(() => {
      cy.get('.brand-dropdown .div#brandnames-id').click();
      // cy.get('.brand-dropdown .Select-option').first().click();
      // cy.get('.brand-dropdown .div#brandnames-id').should('have.value', "century");
    });
  });

})