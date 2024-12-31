describe('cart', () => {
    beforeEach(() => {
        cy.initApp();
    })

    it('Positive e2e flow', () => {
        cy.addItemsToCart('Pens', 1)
        cy.goToCart()
        cy.completeTransaction()
    })
})
