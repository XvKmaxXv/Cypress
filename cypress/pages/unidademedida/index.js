import { elements as el } from "./elements"

class unityofmeasure {

    acessarUnidadeMedia() {
        cy.contains('a', el.desc_tela).should('have.attr', 'href', '/units-of-measure').click()
    }

    pesquisaNome() {
        cy.get(el.placeholder_pesquisar).type(el.nome_pesquisa)
    }
    



}


export default new UnityMeasure()
