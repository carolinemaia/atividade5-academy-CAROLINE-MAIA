export default class CadastroPage {
  inputNome = "#name";
  inputEmail = "#email";
  buttonSalvar = "[type='submit']";
  inputNomeCaractere = "#name";

  typeNome(nome) {
    cy.get(this.inputNome).type(nome);
  }

  typeEmail(email) {
    cy.get(this.inputEmail).type(email);
  }
  clickSalvar() {
    cy.contains("Salvar").click();
  }

  registrarUsuario(nome, email) {
    cypress.get(this.inputNome).type(nome);
    cypress.get(this.inputEmail).type(email);
    cy.contains("Salvar").click();
  }

  clickNovo() {
    cy.contains("Novo").click();
  }
}
