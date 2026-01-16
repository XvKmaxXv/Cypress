import { elements as el } from "./elements"

class Country {

    acessarPais() {
        cy.contains('a', el.desc_tela).should('have.attr', 'href', '/country').click()
    }

    pesquisaNome() {
        cy.get(el.placeholder_pesquisar).type(el.nome_pesquisa)
    }
    



}


export default new Country()
