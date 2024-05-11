import '../support/commands'

describe('test the login', ()=>{
    beforeEach(()=>{
        cy.visit('/login')
    })
    it('test the login', ()=>{
        cy.getTestId('username')
        .should('be.visible')
        .type('TestMari')
        cy.getTestId('email')
        .should('be.visible')
        .type('mari@test.de')
        cy.getTestId('password')
        .should('be.visible')
        .type('12345678')
        cy.getTestId('loginButton')
        .should('be.visible')
        .should('be.enabled')
        .click()
        .should('be.disabled')
        cy.url({timeout:20000}).should('not.include', '/dashboard')
        // cy.contains('Das hat nicht geklappt')
        cy.url({timeout:20000}).should('not.include', '/login')
    })
})