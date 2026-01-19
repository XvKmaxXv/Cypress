import Paises from '../../pages/countries/api'

describe('Estados', () => {
    
    let loginPayload
    let unitPayload // fixture de ambientes

    before(() => {
        // Carrega fixtures uma vez
        cy.fixture('login').then((data) => {
            loginPayload = data
        })

        cy.fixture('states').then((data) => {
            unitPayload = data
        })
    })

    beforeEach(() => {
        // Login antes de cada teste
        cy.request({
            method: 'POST',
            url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/auth/login`,
            body: loginPayload.valid
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('status', 'success')
            expect(response.body.data).to.have.property('access_token')

            // Salva tokens no Cypress.env para usar depois
            Cypress.env('accessToken', response.body.data.access_token)
            Cypress.env('refreshToken', response.body.data.refresh_token)
        })
    })

    it('Deve criar um Estado com sucesso', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/addresses/states`,
            headers: {
                Authorization: `Bearer ${Cypress.env('accessToken')}`
            },
            body: unitPayload.valid
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.status).to.eq('success')
            expect(response.body.data).to.have.property('state')
            expect(response.body.data.state).to.have.property('id')

            // Salva o environmentId para usar nos próximos testes
            Cypress.env('statesId', response.body.data.state.id)
        })
    })

    it('Deve atualizar o estado', () => {
        // Pega o ambiente atual para obter o environment_code
        cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/addresses/states/${Cypress.env('statesId')}`,
            headers: {
                Authorization: `Bearer ${Cypress.env('accessToken')}`
            }
        }).then((getResponse) => {
            expect(getResponse.status).to.eq(200)

            // Monta o payload de update incluindo o environment_code
            const updatePayload = {
                ...unitPayload.update,
                state_code: getResponse.body.data.state.state_code
            }

            // Executa o PUT para atualizar o ambiente
            cy.request({
                method: 'PUT',
                url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/addresses/states/${Cypress.env('statesId')}`,
                headers: {
                    Authorization: `Bearer ${Cypress.env('accessToken')}`
                },
                body: updatePayload
            }).then((response) => {
                expect(response.status).to.eq(204)
            })
        })
    })

    
    it('Traz estado por codigo', () => {
        // Pega o ambiente atual para obter o environment_code
        cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/addresses/states/${Cypress.env('statesId')}`,
            headers: {
                Authorization: `Bearer ${Cypress.env('accessToken')}`
            }
        }).then((getResponse) => {
            expect(getResponse.status).to.eq(200)

            // Monta o payload de update incluindo o environment_code
            const state_code = getResponse.body.data.state.state_code


            // Executa o PUT para atualizar o ambiente
            cy.request({
                method: 'GET',
                url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/addresses/states/${state_code}/by_code`,
                headers: {
                    Authorization: `Bearer ${Cypress.env('accessToken')}`
                },
            }).then((response) => {
                expect(response.status).to.eq(200) , 
                expect(response.body.data.state.state_name).to.eq(unitPayload.update.state_name)
                
            })
        })
    })

    it('Deve excluir o pais', () => {
    
        cy.request({
        method: 'DELETE',
        url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/addresses/states/${Cypress.env('statesId')}`,
        headers: {
            Authorization: `Bearer ${Cypress.env('accessToken')}`
        },
        
        }).then((response) => {
        expect(response.status).to.eq(204)
        })

    })


})
