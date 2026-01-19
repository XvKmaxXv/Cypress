import Login from "../../pages/logindatamais/web"
import Paises from "../../pages/countries/web"
describe('Paises', ()=> {

    
    beforeEach(() =>{
        //Arrange
        Login.visitarPagina()
        Login.preencherCredenciaisValidas()
        Login.verificaUrlHome()
    })

    it('Pesquisar Algo Nome' , () => {
        //Arrange
        Login.verificaUrlHome()
        Paises.acessarPais()

        //Act
        Paises.pesquisaNome()
        //Assert
        cy.contains('BRASIL').should('be.visible')
        cy.get('input[value="Brasil"]').clear()
    })    

    it('Pesquisar Algo Codigo' , () => {
        //Arrange
        cy.visit('https://datamais.bluelogic.com.br/home')
        cy.contains('a', 'Cadastro de País').should('have.attr', 'href', '/country').click()
        //Act
        cy.get('[role="combobox"]').click()
        cy.contains('[role="option"]', 'Código').click()
        cy.get('input[placeholder="Pesquisar"]').type('1058')
        //Assert
        cy.contains('BRASIL').should('be.visible')
        cy.get('input[value="1058"]').clear()
    }) 

    it.skip('Cadastrar Novo Pais' , () => {
        //Arrange
        cy.visit('https://datamais.bluelogic.com.br/home')
        
        cy.contains('a', 'Cadastro de País').should('have.attr', 'href', '/country').click()

        //Act
        cy.contains('button', 'Novo').click()
        
        //Assert
        //cy.contains('BRASIL').should('be.visible')
        //cy.get('input[value="1058"]').clear()
        
    }) 



})



