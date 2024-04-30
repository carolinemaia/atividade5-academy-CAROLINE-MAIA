import { fakerPT_BR } from "@faker-js/faker";
import CadastroPage from "../support/cadastro.page";

const cadastroPage = new CadastroPage();

describe("Cenários de criaçao de usuário", () => {
  var nome = fakerPT_BR.person.fullName();
  var email = fakerPT_BR.internet.email();

  describe("Cenários de criação inválidas de usuário", () => {
    beforeEach(() => {
      cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users");
    });

    it("Nao deve ser possível cadastrar usuário sem Nome preenchido", () => {
      cadastroPage.clickNovo();

      cadastroPage.typeEmail(email);
      cadastroPage.clickSalvar();

      cy.contains("O campo nome é obrigatório.").should("be.visible");
    });

    it("Nao deve ser possível cadastrar usuário sem Email preenchido", () => {
      cadastroPage.registrarUsuario(nome, " ");
      cy.contains("O campo e-mail é obrigatório.").should("be.visible");
    });

    it("Nao deve ser possível novo usuário com nome > 100 caracteres", () => {
      var nomeCaractere = "";
      for (let i = 0; i < 101; i++) {
        nomeCaractere += "a";
      }

      cadastroPage.registrarUsuario(nomeCaractere, email);
      cy.contains("Informe no máximo 100 caracteres para o nome").should(
        "be.visible"
      );
    });

    it("Nao deve ser possível novo usuário com email > 60 caracteres", () => {
      var emailCaractere = "";
      for (let i = 0; i < 61; i++) {
        emailCaractere += "b";
      }

      cadastroPage.registrarUsuario(nome, emailCaractere + "@raro.com");
      cy.contains("Informe no máximo 60 caracteres para o e-mail").should(
        "be.visible"
      );
    });

    it("Cadastrar usuário com menos de 4 caractere", () => {
      cadastroPage.registrarUsuario("abc", email);
      cy.contains("Informe pelo menos 4 letras para o nome.").should(
        "be.visible"
      );
    });

    it("Cadastrar usuário com formato de email invalido", () => {
      cadastroPage.registrarUsuario(nome, "abcdcom");
      cy.contains("Formato de e-mail inválido").should("be.visible");
    });
  });

  describe("Cenários de registro de usuário com credenciais válidas", () => {
    beforeEach(() => {
      cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users");
    });

    it.only("Deve registrar com sucesso o novo usuário", () => {
      cy.intercept("POST", "/api/v1/users").as("post");
      cadastroPage.registrarUsuario(nome, email);
      cy.wait("@post");
      cy.get("#name").invoke("val").should("be.empty");
      cy.get("#email").invoke("val").should("be.empty");
      cy.contains("Usuário salvo com sucesso!").should("be.visible");
    });

    it("Deve retornar mensagem informando que usuário já está registrado", () => {
      cy.intercept("POST", "/api/v1/users", {
        statusCode: 422,
        body: {
          error: "User already exists.",
        },
      }).as("post");
      cadastroPage.registrarUsuario("Carol da Silva", "caroldasilva@ja.existe");
      cy.wait("@post");
      cy.contains("Este e-mail já é utilizado por outro usuário.").should(
        "be.visible"
      );
    });
  });
});
