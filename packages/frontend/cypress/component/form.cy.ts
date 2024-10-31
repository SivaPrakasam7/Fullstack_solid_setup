/// <reference types="cypress" />

import Main from 'src/app/components/form/main.vue';

describe('<Main />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(Main, {
            props: {
                form: {
                    name: {
                        label: 'Enter your name',
                        placeHolder: 'John',
                        type: 'text',
                        required: true,
                        value: '',
                        requiredLabel: 'Please enter your name',
                    },
                    email: {
                        label: 'Enter your email',
                        placeHolder: 'example@mail.com',
                        type: 'text',
                        required: true,
                        value: '',
                        requiredLabel: 'Please enter your email',
                    },
                },
                buttonText: 'Login',
            },
        });
    });
});
