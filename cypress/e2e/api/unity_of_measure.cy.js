import UnidadeMedida from '../../pages/unityofmeasure/api'

describe('Unidade de Medida', ()=> {
        
    let loginPayload
    let unitPayload // variável local

    before(() => {
        // 1️⃣ Carrega fixture **uma vez** antes de todos os testes
        cy.fixture('login').then((data) => {
            loginPayload = data
        })

        cy.fixture('unitOfMeasure').then((data) => {
            unitPayload = data
        })

    })

    beforeEach(() => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/auth/login`,
            body: loginPayload.valid
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('status', 'success')
            expect(response.body.data).to.have.property('access_token')

            // salvar token no env para usar depois
            Cypress.env('accessToken', response.body.data.access_token)
            Cypress.env('refreshToken', response.body.data.refresh_token)
        })

        
    })

it('Deve criar uma unidade de medida com sucesso', function () {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/inventories/units_of_measure`,
        headers: {
            Authorization: `Bearer ${Cypress.env('accessToken')}`
        },
        body: unitPayload.valid
        }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.status).to.eq('success')
        
        expect(response.body.data).to.have.property('unit_of_measure')
        expect(response.body.data.unit_of_measure).to.have.property('id')
        
        // salva o id para usar depois (GET / PUT / DELETE)
        Cypress.env(
            'unitOfMeasureId',
            response.body.data.unit_of_measure.id
        )
    })
    })


    it('Deve atualizar a unidade de medida', () => {
    cy.fixture('unitOfMeasure').then((unitPayload) => {

        cy.request({
        method: 'PUT',
        url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/inventories/units_of_measure/${Cypress.env('unitOfMeasureId')}`,
        headers: {
            Authorization: `Bearer ${Cypress.env('accessToken')}`
        },
        body: unitPayload.update
        }).then((response) => {
        expect(response.status).to.eq(204)
        })

    })
    })

    it('Deve trazer uma unidade de medida com sucesso', function () {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/inventories/units_of_measure/${Cypress.env('unitOfMeasureId')}`,
            headers: {
                Authorization: `Bearer ${Cypress.env('accessToken')}`
            },
            
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.status).to.eq('success')
        
            expect(response.body.data).to.have.property('unit_of_measure')
            expect(response.body.data.unit_of_measure).to.have.property('unit_of_measure_id')
        
        })
    })

    it('Deve excluir a unidade de medida', () => {
        cy.fixture('unitOfMeasure').then((unitPayload) => {
    
            cy.request({
            method: 'DELETE',
            url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/inventories/units_of_measure/${Cypress.env('unitOfMeasureId')}`,
            headers: {
                Authorization: `Bearer ${Cypress.env('accessToken')}`
            },
            
            }).then((response) => {
            expect(response.status).to.eq(204)
            })
    
        })
        })

})

