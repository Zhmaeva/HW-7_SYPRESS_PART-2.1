import loginHappyPath from "../fixtures/loginHappyPath.json";
import loginSadPath from "../fixtures/loginSadPath.json";
import selectors from "../fixtures/selectors";

describe('Тесты для проверки админки сайта "ИДЁМВКИНО"', () => {
  beforeEach(() => {
    cy.visit('/admin/');
  });

  // тест на проверку авторизации в админке с валидными логином и паролем.

  it(loginHappyPath.name, () => {
    cy.autorization(loginHappyPath.data.login, loginHappyPath.data.password);
    cy.get(selectors.adminSections).should("have.length", 5);
    cy.get(selectors.hallControl).contains("Управление залами");
  })

  // тесты на проверку авторизации в админке с не валидными логином и паролем.
  loginSadPath.forEach((test) => {
    it(test.name, () => {
      test.data.forEach((admin) => {
        cy.autorization(admin.login, admin.password);
      })
      cy.get(selectors.body).contains("Ошибка авторизации!");
    })
  });

  // тесты на проверку авторизации в админке с пустыми полями.
  it("Тест на пустое поле логин", () => {
    cy.autorization("", "qamid");
    cy.get(selectors.inputEmail)
      .invoke('prop', 'validationMessage')
      .should('equal', 'Заполните это поле.');
  });

  it("Тест на пустое поле пароль", () => {
    cy.autorization("qamid@qamid.ru", "");
    cy.get(selectors.inputPassword)
      .invoke('prop', 'validationMessage')
      .should('equal', 'Заполните это поле.');
  });
})

