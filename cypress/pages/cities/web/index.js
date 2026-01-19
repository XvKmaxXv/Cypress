import { elements as el } from "./elements"

class Cities {

    acessarCidade() {
        cy.contains('a', el.desc_tela).should('have.attr', 'href', '/cities').click()
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


export default new Cities()
