const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  defaultCommandTimeout: 10000,

  reporterOptions: {
    charts: true,
    reportPageTitle: 'Relatorio de testes',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false ,
    
  },

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },

  screenshotsFolder: 'cypress/screenshots',
  video: false
});
