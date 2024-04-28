export default class ListarPage {
  listaUsuarios = "#listaUsuarios";

  buscarUsuarios() {
    cy.get(this.listaUsuarios);
  }
}
