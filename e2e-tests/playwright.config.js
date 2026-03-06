const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './',
  testMatch: '**/*.{test,spec}.{js,ts}',
  fullyParallel: !process.env.CI,  // Disable parallel in CI for stability
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,  // Reduce retries in CI
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',  // Only keep traces on failure
    screenshot: 'only-on-failure',  // Only take screenshots on failure
  },
  projects: process.env.CI ? [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ] : [  // Only run Chromium in CI for speed
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    cwd: '../',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000,  // Reduce timeout to 1 minute
  },
});
