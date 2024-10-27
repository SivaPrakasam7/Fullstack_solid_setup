/// <reference types="cypress" />

import { baseURL } from '../fixtures';
import { register } from '../fixtures/users';

describe('Authentication', () => {
    it('Create account', () => {
        cy.visit(`${baseURL}/sign-up`);

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
    });

    it('Login account', () => {
        cy.visit(`${baseURL}/sign-in`);

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
    });

    it('Forgot password', () => {
        cy.visit(`${baseURL}/forgot-password`);

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
    });

    it('Reset password', () => {
        cy.visit(`${baseURL}/reset-password`);

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
        cy.get('[data-testId="password"]').type(register.password);
        cy.get('[data-testId="password-error"]').should('include.text', '');
        cy.get('[data-testId="confirmPassword"]')
            .clear()
            .type(register.password);
        cy.get('[data-testId="confirmPassword-error"]').should(
            'include.text',
            ''
        );
        cy.get('[data-testId="SUBMIT"]').click();
    });
});
