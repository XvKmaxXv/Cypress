import Login from "../../pages/logindatamais/web"
import Estados from "../../pages/states/web"

describe('Ambientes' , () => {

    beforeEach(() =>{
        Login.visitarPagina()
        Login.preencherCredenciaisValidas()
        Login.verificaUrlHome()
    }) 

    it('Pesquisar Estado por Nome' , () => {
        //Arrenge
        Login.verificaUrlHome()
        //Act
        Estados.acessarEstados()
        Estados.pesquisarNome('Santa Catarina')
        //Assert
        Estados.contemValor('SANTA CATARINA')
        Estados.limpaTeste('Santa Catarina')

    })

    it('Pesquisar Ambiente por Codigo' , () =>{
        //Arrenge
        Login.verificaUrlHome()
        Estados.acessarEstados()
        //Act
        cy.get('[role="combobox"]').click()
        cy.contains('[role="option"]', 'Código').click()
        Estados.pesquisarNome(42)
        //Assert
        Estados.contemValor(42)
        Estados.limpaTeste(42)

    })

    it('Pesquisar Ambiente por SIGLA' , () =>{
        //Arrenge
        Login.verificaUrlHome()
        Estados.acessarEstados()
        //Act
        cy.get('[role="combobox"]').click()
        cy.contains('[role="option"]', 'UF').click()
        Estados.pesquisarNome('SC')
        //Assert
        Estados.contemValor('SC')
        Estados.limpaTeste('SC')

    })



})
