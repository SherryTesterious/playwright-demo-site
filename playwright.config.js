// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  timeout: 30 * 1000,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'always' }]
  ],

  use: {
    baseURL: 'http://localhost:3000',
    headless: false,
    screenshot: 'on',
    video: 'on',
    trace: 'on',
    viewport: { width: 1280, height: 720 }
  },

  webServer: {
    command: 'node server.js',
    port: 3000,
    reuseExistingServer: true,
    timeout: 10 * 1000
  }
});
