import Login from "../../pages/logindatamais/web"
import Cidades from "../../pages/cities/web"

describe('Cidades' , () => {

    beforeEach(() =>{
        Login.visitarPagina()
        Login.preencherCredenciaisValidas()
        Login.verificaUrlHome()
    }) 

    it('Pesquisar Cidade por Nome' , () => {
        //Arrenge
        Login.verificaUrlHome()
        //Act
        Cidades.acessarCidade()
        Cidades.pesquisarNome('Indaial')
        //Assert
        Cidades.contemValor('INDAIAL')
        Cidades.limpaTeste('Indaial')

    })

    it('Pesquisar Cidade por Codigo' , () =>{
        //Arrenge
        Login.verificaUrlHome()
        Cidades.acessarCidade()
        //Act
        cy.get('[role="combobox"]').click()
        cy.contains('[role="option"]', 'Código').click()
        Cidades.pesquisarNome(4207502)
        //Assert
        Cidades.contemValor(4207502)
        Cidades.limpaTeste(4207502)

    })

})
