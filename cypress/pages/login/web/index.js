import { elements as el } from "./elements"

class Login {

    visitarPagina() {
        cy.visit('https://www.saucedemo.com/')  
    }
    preencherCredenciaisValidas() {
        cy.get(el.username).type(Cypress.env('username'))
        cy.get(el.password).type(Cypress.env('password'))
        cy.get(el.btn_login).click()
    }
    preencherCredenciaisInvalidas() {
        cy.get(el.username).type('User_Invalid')
        cy.get(el.password).type('Password_Invalid')
        cy.get(el.btn_login).click()
    }

    validarErroCredenciaisInvalidas() {
        cy.get(el.message_erro).should('contain.text', 'Epic sadface: Username and password do not match any user in this service')
        cy.url().should('eq', 'https://www.saucedemo.com/')
        cy.screenshot('erro credencias invalidas')

    }
}

export default new Login()
