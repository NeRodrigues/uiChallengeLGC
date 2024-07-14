import {
  defineConfig,
  devices
} from '@playwright/test';

export const baseURL = 'https://todomvc.com/examples/react/dist/';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 3,
  fullyParallel: true,
  reporter: [
    ['allure-playwright', {
      outputFolder: './allure-results',
      detail: true,
      suiteTitle: true
    }]
  ],
  use: {
    baseURL: baseURL,
    screenshot: 'on',
    video: 'on'
  },
  projects: [{
    name: 'LGC UI challenge',
    use: {
      ...devices['Desktop Chrome']
    },
  }, ],
})
