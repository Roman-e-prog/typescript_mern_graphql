import '../support/commands';

describe('home has its elements', ()=>{
    beforeEach(()=>{
        cy.visit('/')
    })
    it('navbar is in the page', ()=>{
        cy.getTestId('navbar')
        .should('be.visible')
    })
    it('click the navlinks', ()=>{
        cy.getTestId('navlink')
        .should('have.length', 5)
        .each(($el)=>{
            cy.wrap($el).eq(0).click()
            cy.url({timeout:5000}).should('include', '/uebermich')
        })
    })
})