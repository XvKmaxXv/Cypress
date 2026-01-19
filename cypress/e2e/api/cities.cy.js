import Paises from '../../pages/countries/api'

describe('Cidades', () => {
    
    let loginPayload
    let unitPayload // fixture de ambientes

    before(() => {
        // Carrega fixtures uma vez
        cy.fixture('login').then((data) => {
            loginPayload = data
        })

        cy.fixture('cities').then((data) => {
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

    it('Deve criar uma Cidade com sucesso', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/addresses/cities`,
            headers: {
                Authorization: `Bearer ${Cypress.env('accessToken')}`
            },
            body: unitPayload.valid
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.status).to.eq('success')
            expect(response.body.data).to.have.property('city')
            expect(response.body.data.city).to.have.property('id')

            // Salva o environmentId para usar nos próximos testes
            Cypress.env('citiesId', response.body.data.city.id)
        })
    })

    it('Deve atualizar cidade', () => {
        // Pega o ambiente atual para obter o environment_code
        cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/addresses/cities/${Cypress.env('citiesId')}`,
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
                url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/addresses/cities/${Cypress.env('citiesId')}`,
                headers: {
                    Authorization: `Bearer ${Cypress.env('accessToken')}`
                },
                body: updatePayload
            }).then((response) => {
                expect(response.status).to.eq(204)
            })
        })
    })

    
    it('Traz cidade por codigo', () => {
        // Pega o ambiente atual para obter o environment_code
        cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/addresses/cities/${Cypress.env('citiesId')}`,
            headers: {
                Authorization: `Bearer ${Cypress.env('accessToken')}`
            }
        }).then((getResponse) => {
            expect(getResponse.status).to.eq(200)

            // Monta o payload de update incluindo o environment_code
            const city_code = getResponse.body.data.city.city_code

            cy.request({
                method: 'GET',
                url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/addresses/cities/${city_code}/by_code`,
                headers: {
                    Authorization: `Bearer ${Cypress.env('accessToken')}`
                },
            }).then((response) => {
                expect(response.status).to.eq(200) , 
                expect(response.body.data.city.city_name).to.eq(unitPayload.update.city_name)
                
            })
        })
    })

    it('Deve excluir a cidade', () => {
    
        cy.request({
        method: 'DELETE',
        url: `${Cypress.env('baseUrl')}/companies/${Cypress.env('companyid')}/addresses/cities/${Cypress.env('citiesId')}`,
        headers: {
            Authorization: `Bearer ${Cypress.env('accessToken')}`
        },
        
        }).then((response) => {
        expect(response.status).to.eq(204)
        })

    })


})
