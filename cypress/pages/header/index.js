import { elements as el } from "./elements"
class Header {
    validarQueCarrinhoPossuiItens(quantidade) {
        cy.get(el.cartBadge).should('be.visible').and('have.text' , quantidade.toString())
    }

    validarQueCarrinhoNaoPossuiItens () {
        cy.get(el.cartBadge).should('not.exist')
    }

    navegarParaCarinho() {
        cy.get(el.cartContainer).click()
    }
}

export default new Header()
