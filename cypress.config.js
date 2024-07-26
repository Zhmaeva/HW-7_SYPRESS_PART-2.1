const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "eiggto",
  e2e: {
    baseUrl: "https://qamid.tmweb.ru",
    retries: 2,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
