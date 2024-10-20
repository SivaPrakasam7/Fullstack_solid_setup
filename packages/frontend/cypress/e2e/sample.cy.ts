/// <reference types="cypress" />

import { baseURL } from '../fixtures';

describe('Sample test case', () => {
    it('Check initial app text', () => {
        cy.visit(baseURL);
        cy.get('[data-testId="INIT"]').should(
            'include.text',
            'Fullstack solid setup'
        );
    });
});
