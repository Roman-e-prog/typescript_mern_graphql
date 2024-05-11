import { aliasQuery, aliasMutation } from '../../../backend/utils/graphql-test-utils';

import '../support/commands';
describe('test the register function', ()=>{
    beforeEach(()=>{
        cy.visit('/register')
    })
    it('test the functionallity', ()=>{
        cy.getTestId('vorname')
        .should('be.visible')
        .type('Mari')
        cy.getTestId('nachname')
        .should('be.visible')
        .type('Mustermann')
        cy.getTestId('username')
        .should('be.visible')
        .type('TestMari')
        cy.intercept('POST', 'http://localhost:5000/graphql', (req)=>{
            aliasMutation(req, 'uniqueUsername')
        })
        cy.getTestId('email')
        .should('be.visible')
        .type('mari@test.de')
        cy.intercept('POST', 'http://localhost:5000/graphql', (req)=>{
            aliasMutation(req, 'uniqueEmail')
        })
        cy.getTestId('password')
        .should('be.visible')
        .type('12345678')
        cy.getTestId('passwordValidation')
        .should('be.visible')
        .type('12345678')
        cy.getTestId('registerButton')
        .should('be.visible')
        .should('be.enabled')
        .click()
        .should('be.disabled')
        cy.url({timeout:10000}).should('include', '/login')

    })
})