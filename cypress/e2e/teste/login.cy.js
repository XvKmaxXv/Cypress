import Login from '../../pages/login'
import Inventory from '../../pages/invetory'

describe('Login', ()=> {

    
    beforeEach(() =>{
        //Arrange
        Login.visitarPagina()
    })

    it('Realizar Login com sucesso' , () => {
        //Arrange
        //Act
        Login.preencherCredenciaisValidas()
        //Assert
        Inventory.ValidarAcessoAPagina()
    })    

    it('Realizar Login Invalido' , () => {
        //Arrange
        //Act
        Login.preencherCredenciaisInvalidas()
        //Assert
        Login.validarErroCredenciaisInvalidas()
      
    })
})



