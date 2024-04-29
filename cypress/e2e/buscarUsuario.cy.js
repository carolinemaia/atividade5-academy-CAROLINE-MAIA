describe("Cenários de teste para procurar usuário por nome ou email", () => {
  beforeEach(() => {
    cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users");
  });

  it("Deve localizar usuario cadastrado pelo nome", () => {
    cy.intercept("POST", "/api/v1/users", {
      statusCode: 201,
      fixture: "/usuarioCriado.json",
    });
    cy.get('.sc-dcJsrY').click().type("Buscar Uusuario");
    cy.contains("Buscar Uusuario").should("be.visible");
    
  });


it("Deve localizar usuario cadastrado pelo email", () => {
  cy.intercept("POST", "/api/v1/users", {
    statusCode: 201,
    fixture: "/usuarioCriado.json",
  });
 
  cy.get('.sc-dcJsrY').click().type("buscarusuario@localizar.com");
 
  cy.contains("Buscar Uusuario").should("be.visible");
  
});

it("Deve retornar usuário nao cadastrado e sugerir novo cadastro" , () => {
  cy.intercept("GET", "/api/v1/users", {
    statusCode: 200,
    body: [],
  }).as("findUsers");

   cy.contains("Ops! Não existe nenhum usuário para ser exibido.").should("be.visible");
  cy.contains("Cadastre um novo usuário");
  
})



});
