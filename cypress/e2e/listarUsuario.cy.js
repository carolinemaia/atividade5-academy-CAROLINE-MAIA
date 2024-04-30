import ListarPage from "../support/lista.page";
const listarPage = new ListarPage();

describe("Cenários de teste para listar usuários", () => {
  beforeEach(() => {
    cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users");
  });

  it("Listar todos usuários quando há usuario cadastrado", () => {
    cy.intercept("GET", "/api/v1/users", {
      statusCode: 200,
      fixture: "/todosUsuarios.json",
    }).as("get");

    cy.contains("Próxima").click();
    cy.wait("@get");
    //cy.contains("Anterior").click();
  });

  it("Deve retornar mensagem informando que nao há usuario registrado", () => {
    cy.intercept("GET", "/api/v1/users", {
      statusCode: 500,
      body: [],
    }).as("listaUser");

    cy.wait("@listaUser");
    cy.contains("Não foi possível consultar os usuários cadastrados.").should(
      "be.visible"
    );
  });
});
