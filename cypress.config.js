const { defineConfig } = require("cypress"); //Intelligent Code Completion

module.exports = defineConfig({
  defaultCommandTimeout: 6000,
  reporter: 'cypress-mochawesome-reporter',
  retries: {
    runMode: 1,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    specPattern: 'cypress/e2e/*.cy.js',
    baseUrl: "http://www.uitestingplayground.com/",
  },
});
