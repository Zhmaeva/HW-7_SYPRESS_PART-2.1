import loginHappyPath from "../fixtures/loginHappyPath.json";
import selector from "../fixtures/selectors";

describe('Бронирование фильма в доступный зал', () => {
  it("Получение названия из админки и бронирование билета на этот фильм", () => {
    cy.visit('/admin/');
    cy.autorization(loginHappyPath.data.login, loginHappyPath.data.password);
    cy.get(selector.salesHalls).click();
    cy.get(selector.hallStatus).contains('Продажа билетов открыта!!!');
    cy.getSeance('199')
      .should('contain', 'Микки маус')
      .and('contain', '18:00');
    cy.visit('/');
    cy.get(selector.pickDay).click();
    cy.get(selector.mickeyMouse).click();
    cy.get(selector.vipChair).click({ multiple: true });
    cy.get(selector.standartChair).eq(1).click();
    cy.get(selector.btnAccept).click();
    cy.get(selector.ticketTitle)
      .should('have.text', 'Вы выбрали билеты:')
  });
})