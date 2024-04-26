import { fakerPT_BR } from "@faker-js/faker";

describe("Cenários de criação de usuário", () => {
  beforeEach(() => {
    cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users");
  });

  var nome = fakerPT_BR.person.fullName();
  var email = fakerPT_BR.internet.email();

  it("Nao deve ser possível cadastrar usuário sem Nome preenchido", () => {
    cy.contains("a[href='/users/novo']", "Novo").click();

    cy.get("#email").type(email);

    cy.contains("Salvar").click();
    cy.contains("O campo nome é obrigatório.").should("be.visible");
  });

  it("Nao deve ser possível cadastrar usuário sem Nome preenchido", () => {
    cy.contains("a[href='/users/novo']", "Novo").click();

    cy.get("#name").type(nome);

    cy.contains("Salvar").click();
    cy.contains("O campo e-mail é obrigatório.").should("be.visible");
  });
});
