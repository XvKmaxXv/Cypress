import { elements as el} from "./elements"
class Invetory {

    ValidarAcessoAPagina() {
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
        cy.screenshot('acesso a pagina de inventario')
    }
    AdicionarProduto(itemName) {

        cy.get(el.addToCart(itemName)).click()

    }

    RemoverProduto(itemName) {
        cy.get(el.removeFromCart(itemName)).click()
        cy.screenshot('produto removido')

    }

}

export default new Invetory()
