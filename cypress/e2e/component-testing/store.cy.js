describe('cart', () => {
    beforeEach(() => {
        cy.initApp();
    })

    it('ASSAP Pens Messaje', () => {
        cy.get('[class*="MuiPaper-root"]:nth-child(1) h2').should('be.visible').and('have.text', 'ASAPP Pens')
        cy.get('[class*="MuiPaper-root"]:nth-child(1) p').should('be.visible').and('have.text', 'State of the art pen, hand-crafted by the internationally famous D. Lacy. We guarantee it will never run out of ink.')
    })

    it('ASSAP Stickers Messaje', () => {
        cy.get('[class*="MuiPaper-root"]:nth-child(2) h2').should('be.visible').and('have.text', 'ASAPP Stickers')
        cy.get('[class*="MuiPaper-root"]:nth-child(2) p').should('be.visible').and('have.text', 'Be the envy of your colleagues with these amazing stickers.')
    })

    it('ASSAP Water Bottle Messaje', () => {
        cy.get('[class*="MuiPaper-root"]:nth-child(3) h2').should('be.visible').and('have.text', 'ASAPP Water Bottle')
        cy.get('[class*="MuiPaper-root"]:nth-child(3) p').should('be.visible').and('have.text', 'Ever been thirsty at work? No more, our new state of the art bottles will keep you hydrated 24/7. Water not included.')
    })

    it('Add Pens to cart', () => {
        cy.get('[class*="MuiPaper-root"]:nth-child(1) [class*="MuiInputBase-root"]').click()
        cy.get('li').eq(1).click()
        cy.contains('Add to Cart').click()
        cy.goToCart()
        cy.get('tr td:nth-child(1)').should('have.text', 'ASAPP Pens')
        cy.get('tr td:nth-child(2)').should('have.text', '1')
    })

    it('Add Stickers to cart', () => {
        cy.get('[class*="MuiPaper-root"]:nth-child(2) [class*="MuiInputBase-root"]').scrollIntoView().click()
        cy.get('li').eq(1).click()
        cy.scrollTo('bottom')
        cy.get('[class*="MuiPaper-root"]:nth-child(2) [class*="MuiButtonBase-root"]:nth-child(1) span[class="MuiButton-label"]:nth-child(1)').click()
        cy.goToCart()
        cy.get('tr td:nth-child(1)').should('have.text', 'ASAPP Stickers')
        cy.get('tr td:nth-child(2)').should('have.text', '1')
    })

    it('Add Water Bottle to cart', () => {
        cy.get('[class*="MuiPaper-root"]:nth-child(3) [class*="MuiInputBase-root"]').click()
        cy.get('li').eq(1).click()
        cy.get('[class*="MuiPaper-root"]:nth-child(3) [class*="MuiButtonBase-root"]:nth-child(1) span[class="MuiButton-label"]:nth-child(1)').click()
        cy.goToCart()
        cy.get('tr td:nth-child(1)').should('have.text', 'ASAPP Water Bottle')
        cy.get('tr td:nth-child(2)').should('have.text', '1')
    })

    it('Pens out of stock', () => {
        cy.addItemsToCart('Pens', 50)
        cy.goToCart()
        cy.completeTransaction()
        cy.get('[class*="MuiButtonBase-root"]:nth-child(3) span[class="MuiTab-wrapper"]').should.exist;
        cy.contains('Out of Stock!').should.exist;
    })

    it('Stickers out of stock', () => {
        cy.addItemsToCart('Stickers', 200)
        cy.goToCart()
        cy.completeTransaction()
        cy.get('[class*="MuiButtonBase-root"]:nth-child(3) span[class="MuiTab-wrapper"]').should.exist;
        cy.get('[class*="MuiPaper-root"]:nth-child(2) div:nth-child(2) button:nth-child(3) span:nth-child(1)').should('be.visible').and('have.text', 'Out of Stock!');
    })

    it('Water Bottle out of stock', () => {
        cy.addItemsToCart('Water Bottle', 25)
        cy.goToCart()
        cy.completeTransaction()
        cy.get('[class*="MuiButtonBase-root"]:nth-child(3) span[class="MuiTab-wrapper"]').should.exist;
        cy.get('[class*="MuiPaper-root"]:nth-child(3) div:nth-child(2) button:nth-child(3) span:nth-child(1)').should('be.visible').and('have.text', 'Out of Stock!');
    })
})