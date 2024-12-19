const { defineConfig } = require("cypress");

module.exports = defineConfig({
  "viewportHeight": 667,
  "viewportWidth": 375,
  video: true,
  projectId: 'sxp1dt',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
