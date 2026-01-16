class Cart {

    validarProdutoPResenteNoCarrinho(name) {

        cy.contains(name).should('be.visible')
        cy.screenshot()

    }

}

export default new Cart()
