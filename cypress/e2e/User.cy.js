import { fakerPT_BR } from "@faker-js/faker";

describe("Cenários de criaçao de usuário", () => {});

describe("Cenários de criação inválidas de usuário", () => {
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

  it("Nao deve ser possível novo usuário com nome > 100 caracteres", () => {
    var nomeCaractere = "";
    for (let i = 0; i < 101; i++) {
      nomeCaractere += "a";
    }
    cy.contains("a[href='/users/novo']", "Novo").click();
    cy.get("#name").type(nomeCaractere);
    cy.get("#email").type(email);
    cy.contains("Salvar").click();
    cy.contains("Informe no máximo 100 caracteres para o nome").should(
      "be.visible"
    );
  });

  it("Nao deve ser possível novo usuário com email > 60 caracteres", () => {
    var emailCaractere = "";
    for (let i = 0; i < 61; i++) {
      emailCaractere += "b";
    }
    cy.contains("a[href='/users/novo']", "Novo").click();
    cy.get("#name").type(nome);
    cy.get("#email").type(emailCaractere + "@raro.com");
    cy.contains("Salvar").click();
    cy.contains("Informe no máximo 60 caracteres para o e-mail").should(
      "be.visible"
    );
  });
});
