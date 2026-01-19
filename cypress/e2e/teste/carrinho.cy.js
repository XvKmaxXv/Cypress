import Login from '../../pages/login/web'
import Inventory from '../../pages/invetory'
import Header from '../../pages/header'
import Cart from '../../pages/cart'

describe('Carrinho' , () => {
    beforeEach(() => {
        //Arrange
        Login.visitarPagina()
        Login.preencherCredenciaisValidas()
    })
    
    it ('Adcionar o produto ao carinho' , () =>  {
        //Arrange
        const qtdItensAdicionados  = 1
        //Act
        Inventory.AdicionarProduto('Sauce Labs Backpack')
        //Assert
        Header.validarQueCarrinhoPossuiItens(qtdItensAdicionados)
        Header.navegarParaCarinho()
        Cart.validarProdutoPResenteNoCarrinho('Sauce Labs Backpack')
        
        
    })

    it ('Remover o produto do carinho' , () =>  {
        //Arrange
        Inventory.AdicionarProduto('Sauce Labs Backpack')
        
        //Act
        Inventory.RemoverProduto('Sauce Labs Backpack')

        
        //Assert
        Header.validarQueCarrinhoNaoPossuiItens()
        
   })



    //$ npx cypress open Caso queira browser --browser chrome
    //$ npx cypress run Caso queira browser --browser chrome

})
