import { elements as el } from "./elements"

class environments {

    acessarEstados() {
        cy.contains('a', el.desc_tela).should('have.attr', 'href', '/states').click()
    }

    pesquisarNome(itemName) {
        cy.get(el.placeholder_pesquisar).type(itemName)
    }

    limpaTeste(itemName) {
        cy.get(`input[value="${itemName}"]`).clear()
    }

    contemValor(itemName) {
        cy.contains(itemName).should('be.visible')
    }
}

export default new environments()
