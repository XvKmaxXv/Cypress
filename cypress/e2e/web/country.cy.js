import logindatamais from "../../pages/logindatamais"
import country from "../../pages/country"
describe('Paises', ()=> {

    
    beforeEach(() =>{
        //Arrange
        logindatamais.visitarPagina()
        logindatamais.preencherCredenciaisValidas()
        logindatamais.verificaUrlHome()
    })

    it('Pesquisar Algo Nome' , () => {
        //Arrange
        logindatamais.verificaUrlHome()
        country.acessarPais()

        //Act
        country.pesquisaNome()
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



