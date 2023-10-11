it('Debería regresar a la pantalla de inicio de sesión desde la pantalla de registro', () => {
  cy.visit('http://localhost:19006');

  cy.contains('aquí').click();

  cy.contains('Registro').should('be.visible');

  cy.get('button').contains('Enviar').click();

  cy.get('[data-test="back-to-login"]').click();

  cy.contains('Login').should('be.visible');
});
