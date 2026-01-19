import logindatamais from "../../pages/logindatamais/web"
import unidademedida from "../../pages/unityofmeasure/web"
describe('Unidade de Medida', ()=> {

    
    beforeEach(() =>{
        //Arrange
        logindatamais.visitarPagina()
        logindatamais.preencherCredenciaisValidas()
        logindatamais.verificaUrlHome()
    })

    it('Pesquisar Algo Descricao' , () => {
        //Arrange
        logindatamais.verificaUrlHome()
        unidademedida.acessarUnidadeMedia()

        //Act
        unidademedida.pesquisaNome('UNIDADE TESTE')
        //Assert
        unidademedida.contemValor('UNIDADE TESTE')
        unidademedida.limpaTeste('UNIDADE TESTE')
        
        
    })    

    it('Pesquisar Algo Codigo' , () => {
        //Arrange
        logindatamais.verificaUrlHome()
        unidademedida.acessarUnidadeMedia()
        //Act
        
        cy.get('[role="combobox"]').click()
        cy.contains('[role="option"]', 'Sigla').click()
        unidademedida.pesquisaNome('UN')
        //cy.get('input[placeholder="Pesquisar"]').type('UN')
        //Assert
        //cy.contains('UNIDADE TESTE').should('be.visible')
        unidademedida.contemValor('UN')
        unidademedida.limpaTeste('UN')
        
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



