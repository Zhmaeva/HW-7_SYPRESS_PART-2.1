import tests from "../fixtures/movies.json";
import selectors from "../fixtures/selectors";

describe('Тесты для проверки главной страницы сайта "ИДЁМВКИНО"', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Отображение недели из 7 дней', () => {
    cy.get(selectors.week).should("have.length", 7);
  });

  // Тесты выбора мест в кинозале с использованием фикстур
  tests.forEach((test) => {
    it(test.name, () => {
      cy.get(selectors.pickDay).click();
      cy.get(selectors.movie).contains('18:00').click();
      test.data.forEach((seat) => {
        cy.get(selectors.selectSeed).click();
      });
      cy.get(selectors.btnAccept).click();
      cy.contains('Вы выбрали билеты:').should('be.visible');
    });
  });
})