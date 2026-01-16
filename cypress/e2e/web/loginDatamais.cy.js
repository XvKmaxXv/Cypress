import Login from '../../pages/logindatamais'

describe('Login', ()=> {

    beforeEach(() =>{
        //Arrange
        Login.visitarPagina()
    })

    it('Realizar Login com sucesso' , () => {
        //Act
        Login.preencherCredenciaisValidas()
        //Assert
        Login.verificaUrlHome()
        
    })    

    it('Realizar Login Invalido' , () => {
        //Act
        Login.preencherCredenciaisInValidas()
        //Assert
        Login.validacaoMensagemErro()
        Login.visitarPagina()        
    })
})



