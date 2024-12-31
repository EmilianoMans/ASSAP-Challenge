describe('cart', () => {
    beforeEach(() => {
        cy.initApp();
    })
  
    it('Empty cart message', () => {
        cy.goToCart()
        cy.get('[class="MuiButton-label"]').should('be.visible').and('have.text', 'OH NO YOUR CART IS EMPTY')
    })
    
    it('Empty cart button', () => {
        cy.goToCart()
        cy.get('[class="MuiButton-label"]').should('be.visible').and('have.text', 'OH NO YOUR CART IS EMPTY').click()
        cy.get('[class*="MuiButtonBase-root"]:nth-child(3) span[class="MuiTab-wrapper"]').should.exist
    })
    
    it('Remove items from cart', () => {
        cy.addItemsToCart('Pens', 1)
        cy.goToCart()
        cy.get('tr:nth-child(1) td:nth-child(1)').should('have.text', 'ASAPP Pens')
        cy.get('tr:nth-child(1) td:nth-child(2)').should('have.text', '1')
        cy.contains('x').click()
        cy.get('[class="MuiButton-label"]').should('be.visible').and('have.text', 'OH NO YOUR CART IS EMPTY')
    })
    
    it('Checkout', () => {
        cy.addItemsToCart('Pens', 1)
        cy.goToCart()
        cy.get('tr:nth-child(1) td:nth-child(1)').should('have.text', 'ASAPP Pens')
        cy.get('tr:nth-child(1) td:nth-child(2)').should('have.text', '1')
        cy.contains('BUY!').click()
        cy.get('h2[class*="h6"]').should('have.text', 'Thank you!')
        cy.get('p[class*="MuiTypography-root"]').should('have.text', 'We\'ll be sending you a link by e-mail to complete payment. We only accept DLacy Coins!!')
        cy.contains('Awesome').click()
        cy.get('[class*="MuiButtonBase-root"]:nth-child(3) span[class="MuiTab-wrapper"]').should.exist;
    })

    it('Cart with one item', () => {
        cy.addItemsToCart('Pens', 1)
        cy.goToCart()
        cy.get('tr td:nth-child(1)').should('have.text', 'ASAPP Pens')
        cy.get('tr td:nth-child(2)').should('have.text', '1')
    })
        
    it('Cart with max items', () => {
        cy.addItemsToCart('Pens', 50)
        cy.addItemsToCart('Stickers', 200)
        cy.addItemsToCart('Water Bottle', 25)
        cy.goToCart()
        cy.get('tr:nth-child(1) td:nth-child(1)').should('have.text', 'ASAPP Pens')
        cy.get('tr:nth-child(1) td:nth-child(2)').should('have.text', '50')
        cy.get('tr:nth-child(2) td:nth-child(1)').should('have.text', 'ASAPP Stickers')
        cy.get('tr:nth-child(2) td:nth-child(2)').should('have.text', '200')
        cy.get('tr:nth-child(3) td:nth-child(1)').should('have.text', 'ASAPP Water Bottle')
        cy.get('tr:nth-child(3) td:nth-child(2)').should('have.text', '25')
    })
})
