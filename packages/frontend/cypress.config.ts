import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        setupNodeEvents() {
            // implement node event listeners here
        },
        specPattern: ['cypress/e2e/sample.cy.ts'],
    },

    component: {
        devServer: {
            framework: 'vue',
            bundler: 'vite',
        },
        specPattern: ['cypress/component/'],
    },
})
