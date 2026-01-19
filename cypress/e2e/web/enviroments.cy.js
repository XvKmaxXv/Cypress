import Login from "../../pages/logindatamais/web"
import Ambientes from "../../pages/enviroments/web"

describe('Ambientes' , () => {

    beforeEach(() =>{
        Login.visitarPagina()
        Login.preencherCredenciaisValidas()
        Login.verificaUrlHome()
    }) 

    it('Pesquisar Ambiente por Nome' , () => {
        //Arrenge
        Login.verificaUrlHome()
        //Act
        Ambientes.acessarAmbientes()
        Ambientes.pesquisarNome('ATENDIMENTO')
        //Assert
        Ambientes.contemValor('ATENDIMENTO')
        Ambientes.limpaTeste('ATENDIMENTO')

    })

    it('Pesquisar Ambiente por Codigo' , () =>{
        //Arrenge
        Login.verificaUrlHome()
        Ambientes.acessarAmbientes()
        //Act
        cy.get('[role="combobox"]').click()
        cy.contains('[role="option"]', 'Código').click()
        Ambientes.pesquisarNome(1)
        //Assert
        Ambientes.contemValor(1)
        Ambientes.limpaTeste(1)

    })



})
