import tests from "../fixtures/movies.json";

describe('Тесты для проверки главной страницы сайта "ИДЁМВКИНО"', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Отображение недели из 7 дней', () => {
    cy.get('.page-nav__day').should("have.length", 7);
  });

  // Тесты выбора мест в кинозале с использованием фикстур
  tests.forEach((test) => {
    it(test.name, () => {
      cy.get('.page-nav__day:nth-of-type(4)').click();
      cy.get('.movie').contains('18:00').click();
      test.data.forEach((seat) => {
        cy.get(`.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`).click();
      });
      cy.get('.acceptin-button').click();
      cy.contains('Вы выбрали билеты:').should('be.visible');
    });
  });
})