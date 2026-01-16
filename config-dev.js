const { defineConfig } = require('cypress')
const baseConfig = require('./cypress.config')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
    path: path.resolve(__dirname,'./.env.dev')
})
const e2e = {
    baseUrl: process.env.BASEURL, 
    setupNodeEvents(on, config) {
        require('cypress-mochawesome-reporter/plugin')(on);
        return config;
    },
    env: {
        username: process.env.USER , 
        password: process.env.PASSWORD ,

        usernameDatamais: process.env.USER_DATAMAIS ,
        passwordDatamais: process.env.PASSWORD_DATAMAIS ,

        companyid: process.env.COMPANY_ID ,

        baseUrl: 'aatest697.datamais.inf.br', // <<<<<< adicionar isso
    }
}

module.exports = defineConfig({
    ...baseConfig , 
    e2e
})
