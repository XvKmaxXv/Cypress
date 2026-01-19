import { elements as el } from "./elements"

class unityofmeasure {

    acessarUnidadeMedia() {
        cy.contains('a', el.desc_tela).should('have.attr', 'href', '/units-of-measure').click()
    }

    pesquisaNome(itemName) {
        cy.get(el.placeholder_pesquisar).type(itemName)
    }

    limpaTeste(itemName) {
        cy.get(`input[value="${itemName}"]`).clear()
    }

    contemValor(itemName) {
        cy.contains(itemName).should('be.visible')
    }
}

export default new unityofmeasure()
