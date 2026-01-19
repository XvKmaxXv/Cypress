import { elements as el } from "./elements"

class loginDatamais{

    visitarPagina() {
        cy.visit(el.url_Login)
    }

    preencherCredenciaisValidas() {
        cy.get(el.username).type(Cypress.env('usernameDatamais'))
        cy.get(el.password).type(Cypress.env('passwordDatamais'))

        cy.contains(el.btn_Login).should('be.visible').click()
    }

    preencherCredenciaisInValidas() {
        cy.get(el.username).type(Cypress.env('username'))
        cy.get(el.password).type(Cypress.env('password'))

        cy.contains(el.btn_Login).should('be.visible').click()
    }

    verificaUrlHome() {
        cy.url().should('eq', el.url_home)
    }

    validacaoMensagemErro() {
        cy.contains(el.msg_error).should('be.visible')
    }

}

export default new loginDatamais()
