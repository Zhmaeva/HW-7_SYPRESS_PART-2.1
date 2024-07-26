// -- This is a parent command --
Cypress.Commands.add('autorization', (login, password) => {
    if(login) {
        cy.get("input[name='email']").type(login);
    }
    if(password) {
        cy.get("input[name='password']").type(password);
    }
    cy.get("input[value='Авторизоваться']").click();
})
