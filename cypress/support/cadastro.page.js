export default class CadastroPage {
  inputNome = "#name";
  inputEmail = "#email";
  buttonSalvar = "[type='submit']";

  typeNome(nome) {
    cy.get(this.inputNome).type(nome);
  }

  typeEmail(email) {
    cy.get(this.inputEmail).type(email);
  }

  registrarUsuario(nome, email) {
    cy.contains("Novo").click();
    cy.get(this.inputNome).type(nome);
    cy.get(this.inputEmail).type(email);
    cy.contains("Salvar").click();
  }

  clickSalvar() {
    cy.contains("Salvar").click();
  }

  clickNovo() {
    cy.contains("Novo").click();
  }
}
