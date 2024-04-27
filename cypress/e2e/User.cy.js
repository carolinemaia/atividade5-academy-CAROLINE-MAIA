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
      cy.intercept("POST", "/users").as("postUsuario");
      cadastroPage.typeEmail(email);
      cadastroPage.clickSalvar();

      cy.contains("O campo nome é obrigatório.").should("be.visible");
    });

    it("Nao deve ser possível cadastrar usuário sem Email preenchido", () => {
      cadastroPage.clickNovo();
      cy.intercept("POST", "/users").as("postUsuario");
      cadastroPage.typeNome(nome);
      cadastroPage.clickSalvar();
      //cy.wait("@postUsuario"); pq ta quebrando???

      cy.contains("O campo e-mail é obrigatório.").should("be.visible");
    });

    it("Nao deve ser possível novo usuário com nome > 100 caracteres", () => {
      var nomeCaractere = "";
      for (let i = 0; i < 101; i++) {
        nomeCaractere += "a";
      }
      cadastroPage.clickNovo();
      cy.get("#name").type(nomeCaractere);
      cadastroPage.typeEmail(email);
      cadastroPage.clickSalvar();

      cy.contains("Informe no máximo 100 caracteres para o nome").should(
        "be.visible"
      );
    });

    it("Nao deve ser possível novo usuário com email > 60 caracteres", () => {
      var emailCaractere = "";
      for (let i = 0; i < 61; i++) {
        emailCaractere += "b";
      }
      cadastroPage.clickNovo();
      cadastroPage.typeNome(nome);
      cy.get("#email").type(emailCaractere + "@raro.com");
      cadastroPage.clickSalvar();

      cy.contains("Informe no máximo 60 caracteres para o e-mail").should(
        "be.visible"
      );
    });
  });

  describe("Cenários de registro de usuário com credenciais válidas", () => {
    beforeEach(() => {
      cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users");
    });

    it("Deve registrar com sucesso o novo usuário", () => {
      cadastroPage.clickNovo();
      cy.intercept("POST", "/users").as("postUsuario");
      cadastroPage.typeNome(nome);
      cadastroPage.typeEmail(email);
      cadastroPage.clickSalvar();

      cy.get("#name").invoke("val").should("be.empty");
      cy.get("#email").invoke("val").should("be.empty");

      cy.contains("Usuário salvo com sucesso!").should("be.visible");
    });

    it.only("Deve retornar mensagem informando que usuário já está registrado", () => {
      cadastroPage.clickNovo();
      cy.intercept("POST", "/users", {
        statusCode: 422,
        body: {
          error: "User already exists.",
        },
      }).as("postUsuario");
      cadastroPage.typeNome("Carol da Silva");
      cadastroPage.typeEmail("caroldasilva@ja.existe");
      cadastroPage.clickSalvar();
      //cy.wait("@postUsuario"); quebrando pq meu deus????
      cy.wait(1000);
      cy.contains("Este e-mail já é utilizado por outro usuário.").should(
        "be.visible"
      );
    });
  });
});

describe("Cenários para listar usuários", () => {});
