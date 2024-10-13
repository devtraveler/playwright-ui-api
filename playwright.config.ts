import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // Set timeout to 1 minute (120000 ms)
  timeout: 120000,

  // Default test directory for UI tests
  testDir: './ui_tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  /* Shared settings for all the projects below. */
  use: {
    trace: 'on-first-retry', // Collect trace on first retry
  },

  // Projects for UI, Mobile, and API tests
  projects: [
    // UI Tests for different browsers
    {
      name: 'UI - Chromium',
      testDir: './ui_tests',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'UI - Firefox',
      testDir: './ui_tests',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'UI - Webkit',
      testDir: './ui_tests',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile Web Tests
    {
      name: 'Mobile Chrome',
      testDir: './ui_tests',
      use: { ...devices['Pixel 5'] }, // Emulate mobile browser on Pixel 5
    },
    {
      name: 'Mobile Safari',
      testDir: './ui_tests',
      use: { ...devices['iPhone 12'] }, // Emulate mobile browser on iPhone 12
    },

    // API Tests
    {
      name: 'API tests',
      testDir: './api_tests',
      use: {
        baseURL: 'https://service.verivox.de', // Base URL for API tests
      },
    },
  ],

  /* Local development server (if needed) */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});