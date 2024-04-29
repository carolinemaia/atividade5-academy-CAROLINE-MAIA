describe("Cenários de teste para listar usuários", () => {
  beforeEach(() => {
    cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users");
  });

  it("Listar todos usuários quando há usuario cadastrado", () => {
    cy.intercept("GET", "/api/v1/users", {
      statusCode: 200,
      fixture: "/todosUsuarios.json",
    });
    cy.contains("Próxima").click();
    //cy.contains("Anterior").click();
  });

  it("Deve retornar mensagem informando que nao há usuario registrado", () => {
    cy.intercept("GET", "/api/v1/users", {
      statusCode: 500,
      body: [],
    });

    cy.contains("Não foi possível consultar os usuários cadastrados.").should(
      "be.visible"
    );
  });
});
