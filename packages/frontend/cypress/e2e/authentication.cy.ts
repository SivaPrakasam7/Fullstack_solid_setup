/// <reference types="cypress" />

import { baseURL } from '../fixtures';
import { register } from '../fixtures/users';

describe('Authentication', () => {
    let token = '';
    it('Create account', () => {
        cy.visit(`${baseURL}/sign-up`);

        // API
        cy.intercept('POST', `/v1/user/create`).as('createAccount');

        // without data
        cy.get('[data-testId="SUBMIT"]').click();
        cy.get('[data-testId="name-error"]').should(
            'include.text',
            'Please enter your name'
        );
        cy.get('[data-testId="email-error"]').should(
            'include.text',
            'Please enter your email'
        );
        cy.get('[data-testId="password-error"]').should(
            'include.text',
            'Please enter your password'
        );
        cy.get('[data-testId="confirmPassword-error"]').should(
            'include.text',
            'Please enter confirmation password'
        );

        // invalid data
        cy.get('[data-testId="email"]').type(register.name);
        cy.get('[data-testId="email-error"]').should(
            'include.text',
            'Invalid email'
        );
        cy.get('[data-testId="password"]').type(register.name);
        cy.get('[data-testId="password-error"]').should(
            'include.text',
            'Password must contain at least one uppercase letter, one lower case, one number, one symbol(@$!%*?&#), and be at least 8 characters long'
        );

        // valid data
        cy.get('[data-testId="name"]').clear().type(register.name);
        cy.get('[data-testId="name-error"]').should('include.text', '');
        cy.get('[data-testId="email"]').clear().type(register.email);
        cy.get('[data-testId="email-error"]').should('include.text', '');
        cy.get('[data-testId="password"]').clear().type(register.password);
        cy.get('[data-testId="password-error"]').should('include.text', '');
        cy.get('[data-testId="confirmPassword"]')
            .clear()
            .type(register.password);
        cy.get('[data-testId="confirmPassword-error"]').should(
            'include.text',
            ''
        );
        cy.get('[data-testId="SUBMIT"]').click();

        cy.wait('@createAccount').then((interception) => {
            token = interception.response?.body?.message;
            expect(interception.response?.statusCode).to.equal(200);
        });
    });

    it('Verify user account', () => {
        cy.visit(`${baseURL}/verify?token=${register.email}`);
        cy.get('[data-testId="MESSAGE"]').should(
            'include.text',
            'Unauthorized'
        );

        cy.visit(`${baseURL}/verify?token=${token}`);

        cy.get('[data-testId="MESSAGE"]').should(
            'include.text',
            'Account verified'
        );
    });

    it('Login account', () => {
        cy.visit(`${baseURL}/sign-in`);

        // API
        cy.intercept('POST', `/v1/user/login`).as('loginAccount');
        cy.intercept('GET', `/v1/user/profile`).as('profileCall');

        // without data
        cy.get('[data-testId="SUBMIT"]').click();
        cy.get('[data-testId="email-error"]').should(
            'include.text',
            'Please enter your email'
        );
        cy.get('[data-testId="password-error"]').should(
            'include.text',
            'Please enter your password'
        );

        // invalid data
        cy.get('[data-testId="email"]').type(register.name);
        cy.get('[data-testId="email-error"]').should(
            'include.text',
            'Invalid email'
        );

        // valid data
        cy.get('[data-testId="email"]').clear().type(register.email);
        cy.get('[data-testId="email-error"]').should('include.text', '');
        cy.get('[data-testId="password"]').clear().type(register.password);
        cy.get('[data-testId="password-error"]').should('include.text', '');
        cy.get('[data-testId="SUBMIT"]').click();

        cy.wait('@loginAccount').then((interception) => {
            expect(interception.response?.statusCode).to.equal(200);
        });
        cy.wait('@profileCall').then((interception) => {
            expect(interception.response?.statusCode).to.equal(200);
            expect(interception.response?.body?.data?.user?.userId).to.be.a(
                'string'
            );
        });
    });

    it('Forgot password', () => {
        cy.visit(`${baseURL}/forgot-password`);

        // API
        cy.intercept('POST', `/v1/user/request-reset-password`).as(
            'forgotPassword'
        );

        // without data
        cy.get('[data-testId="SUBMIT"]').click();
        cy.get('[data-testId="email-error"]').should(
            'include.text',
            'Please enter your email'
        );

        // invalid data
        cy.get('[data-testId="email"]').type(register.name);
        cy.get('[data-testId="email-error"]').should(
            'include.text',
            'Invalid email'
        );

        // valid data
        cy.get('[data-testId="email"]').clear().type(register.email);
        cy.get('[data-testId="email-error"]').should('include.text', '');
        cy.get('[data-testId="SUBMIT"]').click();

        cy.wait('@forgotPassword').then((interception) => {
            token = interception.response?.body?.message;
            expect(interception.response?.statusCode).to.equal(200);
        });
    });

    it('Reset password', () => {
        cy.visit(`${baseURL}/reset-password?token=${token}`);

        // API
        cy.intercept('POST', `/v1/user/change-password`).as('changePassword');

        // without data
        cy.get('[data-testId="SUBMIT"]').click();
        cy.get('[data-testId="password-error"]').should(
            'include.text',
            'Please enter your password'
        );
        cy.get('[data-testId="confirmPassword-error"]').should(
            'include.text',
            'Please enter confirmation password'
        );

        // invalid data
        cy.get('[data-testId="password"]').type(register.name);
        cy.get('[data-testId="password-error"]').should(
            'include.text',
            'Password must contain at least one uppercase letter, one lower case, one number, one symbol(@$!%*?&#), and be at least 8 characters long'
        );

        // valid data
        cy.get('[data-testId="password"]').type(register.newPassword);
        cy.get('[data-testId="password-error"]').should('include.text', '');
        cy.get('[data-testId="confirmPassword"]')
            .clear()
            .type(register.newPassword);
        cy.get('[data-testId="confirmPassword-error"]').should(
            'include.text',
            ''
        );
        cy.get('[data-testId="SUBMIT"]').click();

        cy.wait('@changePassword').then((interception) => {
            expect(interception.response?.statusCode).to.equal(200);
        });
    });
});
