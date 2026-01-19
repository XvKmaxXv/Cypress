import Ambientes from '../../pages/enviroments/api'

describe('Ambientes', () => {
    
    let loginPayload
    let unitPayload // fixture de ambientes

    before(() => {
        // Carrega fixtures uma vez
        cy.fixture('login').then((data) => {
            loginPayload = data
        })

        cy.fixture('enviroments').then((data) => {
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

    it('Deve criar um ambiente com sucesso', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/automations/environments`,
            headers: {
                Authorization: `Bearer ${Cypress.env('accessToken')}`
            },
            body: unitPayload.valid
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.status).to.eq('success')
            expect(response.body.data).to.have.property('environment')
            expect(response.body.data.environment).to.have.property('id')

            // Salva o environmentId para usar nos próximos testes
            Cypress.env('environmentId', response.body.data.environment.id)
        })
    })

    it('Deve atualizar o ambiente', () => {
        // Pega o ambiente atual para obter o environment_code
        cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/automations/environments/${Cypress.env('environmentId')}`,
            headers: {
                Authorization: `Bearer ${Cypress.env('accessToken')}`
            }
        }).then((getResponse) => {
            expect(getResponse.status).to.eq(200)

            // Monta o payload de update incluindo o environment_code
            const updatePayload = {
                ...unitPayload.update,
                environment_code: getResponse.body.data.environment.environment_code
            }

            // Executa o PUT para atualizar o ambiente
            cy.request({
                method: 'PUT',
                url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/automations/environments/${Cypress.env('environmentId')}`,
                headers: {
                    Authorization: `Bearer ${Cypress.env('accessToken')}`
                },
                body: updatePayload
            }).then((response) => {
                expect(response.status).to.eq(204)
            })
        })
    })

    
    it('Traz ambiente por codigo', () => {
        // Pega o ambiente atual para obter o environment_code
        cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/automations/environments/${Cypress.env('environmentId')}`,
            headers: {
                Authorization: `Bearer ${Cypress.env('accessToken')}`
            }
        }).then((getResponse) => {
            expect(getResponse.status).to.eq(200)

            // Monta o payload de update incluindo o environment_code
            const environmentCode = getResponse.body.data.environment.environment_code


            // Executa o PUT para atualizar o ambiente
            cy.request({
                method: 'GET',
                url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/automations/environments/${environmentCode}/by_code`,
                headers: {
                    Authorization: `Bearer ${Cypress.env('accessToken')}`
                },
            }).then((response) => {
                expect(response.status).to.eq(200) , 
                expect(response.body.data.environment.environment_name).to.eq(unitPayload.update.environment_name)
                
            })
        })
    })

    it('Deve excluir o ambiente', () => {
        cy.fixture('enviroments').then((unitPayload) => {
    
            cy.request({
            method: 'DELETE',
            url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/automations/environments/${Cypress.env('environmentId')}`,
            headers: {
                Authorization: `Bearer ${Cypress.env('accessToken')}`
            },
            
            }).then((response) => {
            expect(response.status).to.eq(204)
            })
    
        })
    })


})
