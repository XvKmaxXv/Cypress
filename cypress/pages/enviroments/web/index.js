import { elements as el } from "./elements"

class environments {

    acessarAmbientes() {
        cy.contains('a', el.desc_tela).should('have.attr', 'href', '/environments').click()
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
