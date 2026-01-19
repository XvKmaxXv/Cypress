import Paises from '../../pages/countries/api'

describe('Cidades', () => {
    
    let loginPayload
    let unitPayload // fixture de ambientes

    before(() => {
        // Carrega fixtures uma vez
        cy.fixture('login').then((data) => {
            loginPayload = data
        })

        cy.fixture('cards_brands').then((data) => {
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

    it('Deve criar uma Bandeira com sucesso', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/financial/card_brands`,
            headers: {
                Authorization: `Bearer ${Cypress.env('accessToken')}`
            },
            body: unitPayload.valid
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.status).to.eq('success')
            expect(response.body.data).to.have.property('card_brand')
            expect(response.body.data.card_brand).to.have.property('id')

            // Salva o environmentId para usar nos próximos testes
            Cypress.env('cardBrandId', response.body.data.card_brand.id)
        })
    })

    it.skip('Deve atualizar cidade', () => {
        // Pega o ambiente atual para obter o environment_code
        cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/financial/card_brands/${Cypress.env('cardBrandId')}`,
            headers: {
                Authorization: `Bearer ${Cypress.env('accessToken')}`
            }
        }).then((getResponse) => {
            expect(getResponse.status).to.eq(200)

            // Monta o payload de update incluindo o environment_code
            const updatePayload = {
                ...unitPayload.update,
                city_code: getResponse.body.data.city.city_code
            }

            // Executa o PUT para atualizar o ambiente
            cy.request({
                method: 'PUT',
                url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/financial/card_brands/${Cypress.env('cardBrandId')}`,
                headers: {
                    Authorization: `Bearer ${Cypress.env('accessToken')}`
                },
                body: updatePayload
            }).then((response) => {
                expect(response.status).to.eq(204)
            })
        })
    })

    
    it.skip('Traz cidade por codigo', () => {
        // Pega o ambiente atual para obter o environment_code
        cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/financial/card_brands/${Cypress.env('cardBrandId')}`,
            headers: {
                Authorization: `Bearer ${Cypress.env('accessToken')}`
            }
        }).then((getResponse) => {
            expect(getResponse.status).to.eq(200)

            // Monta o payload de update incluindo o environment_code
            const city_code = getResponse.body.data.city.city_code

            cy.request({
                method: 'GET',
                url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/financial/card_brands/${city_code}/by_code`,
                headers: {
                    Authorization: `Bearer ${Cypress.env('accessToken')}`
                },
            }).then((response) => {
                expect(response.status).to.eq(200) , 
                expect(response.body.data.city.city_name).to.eq(unitPayload.update.city_name)
                
            })
        })
    })

    it.skip('Deve excluir a cidade', () => {
    
        cy.request({
        method: 'DELETE',
        url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/financial/card_brands/${Cypress.env('cardBrandId')}`,
        headers: {
            Authorization: `Bearer ${Cypress.env('accessToken')}`
        },
        
        }).then((response) => {
        expect(response.status).to.eq(204)
        })

    })


})
