import selector from "../fixtures/selectors"

Cypress.Commands.add('autorization', (login, password) => {
  if (login) {
    cy.get(selector.inputEmail).type(login);
  }
  if (password) {
    cy.get(selector.inputPassword).type(password);
  }
  cy.get(selector.btnLogin).click();
});

Cypress.Commands.add('getSeance', (id) => {
  if (id) {
    cy.get(`div[data-seance-id=${id}]`);
  }
});
