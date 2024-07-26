import loginHappyPath from "../fixtures/loginHappyPath.json";
import loginSadPath from "../fixtures/loginSadPath.json";

describe('Тесты для проверки админки сайта "ИДЁМВКИНО"', () => {
  beforeEach(() => {
    cy.visit('/admin/');
  });

  // тест на проверку авторизации в админке с валидными логином и паролем.
  loginHappyPath.forEach((test) => {
    it(test.name, () => {
      test.data.forEach((admin) => {
        cy.autorization(admin.login, admin.password);
      })
      cy.get(".conf-step").should("have.length", 5);
      cy.get("#hall-control").contains("Управление залами");
    })
  });

  // тесты на проверку авторизации в админке с не валидными логином и паролем.
  loginSadPath.forEach((test) => {
    it(test.name, () => {
      test.data.forEach((admin) => {
        cy.autorization(admin.login, admin.password);
      })
      cy.get("body").contains("Ошибка авторизации!");
    })
  });

  // тесты на проверку авторизации в админке с пустыми полями.
  it("Тест на пустое поле логин", () => {
    cy.autorization("", "qamid");
    cy.get("input[name='email']")
      .invoke('prop', 'validationMessage')
      .should('equal', 'Заполните это поле.');
  });

  it("Тест на пустое поле пароль", () => {
    cy.autorization("qamid@qamid.ru", "");
    cy.get("input[name='password']")
      .invoke('prop', 'validationMessage')
      .should('equal', 'Заполните это поле.');
  });
})

