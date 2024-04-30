import { fakerPT_BR } from "@faker-js/faker";
import CadastroPage from "../support/cadastro.page";

const cadastroPage = new CadastroPage();

describe("Cenários de teste para procurar usuário por nome ou email", () => {
  var nome = fakerPT_BR.person.fullName();
  var email = fakerPT_BR.internet.email();

  beforeEach(() => {
    cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users");
  });

  it("Deve localizar usuario cadastrado pelo email", () => {
    cy.intercept("POST", "/api/v1/users");
    cadastroPage.registrarUsuario(nome, email);
    cy.contains("Usuário salvo com sucesso!").should("be.visible");
    cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users");

    cy.get(".sc-dcJsrY").click().type(email);
    cy.get('[data-test="userDataName"]').contains(nome);
    cy.get('[data-test="userDataEmail"]').should(
      "contain.text",
      "E-mail: ",
      email
    );
  });

  it("Deve retornar usuário nao cadastrado e sugerir novo cadastro", () => {
    cy.intercept("GET", "/api/v1/users", {
      statusCode: 200,
      body: [],
    }).as("findUsers");

    cy.contains("Ops! Não existe nenhum usuário para ser exibido.").should(
      "be.visible"
    );
    cy.contains("Cadastre um novo usuário");
  });
});
