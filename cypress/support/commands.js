// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
Cypress.Commands.add('TEST', () => {
    cy.visit('http://localhost:5000/api/docs');
})

Cypress.Commands.add('goToHomePage', () => {
    cy.fixture('data.json').then((data) => {
        console.log(data.baseUrl);
        cy.visit(data.baseUrl);
    })
})

Cypress.Commands.add('registerNewUser', () => {
    const uuid = () => Cypress._.random(0, 1e6)
    const id= uuid()
    cy.writeFile("cypress/fixtures/users.json", {
        newUsers: {
            'username': `username${id}`,
            'password': `password${id}`,
        }
    })
    cy.get('[type="button"]:nth-child(3)').click()
    cy.get('[id="register-username"]').type(`username${id}`)
    cy.get('[id="register-password"]').type(`password${id}`)
    cy.get('div[role="dialog"] span[class="MuiButton-label"]').click()
})

Cypress.Commands.add('login', (username, password) => {
    cy.get('[id=username]').type(username);
    cy.get('[id=password]').type(password);
    cy.get('[type="button"]:nth-child(2)').click();
})

Cypress.Commands.add('initApp', () => {
    cy.goToHomePage()
    cy.registerNewUser()
    cy.fixture('users.json').then((data) => {
        cy.log(data.newUsers.username)
        cy.log(data.newUsers.password)
        cy.login(data.newUsers.username, data.newUsers.password)
    })
})

Cypress.Commands.add('goToCart', () => {
    cy.get('button[class*="MuiButtonBase-root"]:nth-child(2) [class="MuiTab-wrapper"]').click()
})

Cypress.Commands.add('addItemsToCart', (item, quantity) => {
    if(item === 'Pens') {
        cy.get('[class*="MuiPaper-root"]:nth-child(1) [class*="MuiInputBase-root"]').click()
        cy.get('li').eq(quantity).click()
        cy.contains('Add to Cart').click()
    } else if (item === 'Stickers') {
        cy.get('[class*="MuiPaper-root"]:nth-child(2) [class*="MuiInputBase-root"]').scrollIntoView().click()
        cy.get('li').eq(quantity).click()
        cy.scrollTo('bottom')
        cy.get('[class*="MuiPaper-root"]:nth-child(2) [class*="MuiButtonBase-root"]:nth-child(1) span[class="MuiButton-label"]:nth-child(1)').click()
    } else if (item === 'Water Bottle') {
        cy.get('[class*="MuiPaper-root"]:nth-child(3) [class*="MuiInputBase-root"]').click()
        cy.get('li').eq(quantity).click()
        cy.get('[class*="MuiPaper-root"]:nth-child(3) [class*="MuiButtonBase-root"]:nth-child(1) span[class="MuiButton-label"]:nth-child(1)').click()
    }
    cy.contains('Close').click()
})

Cypress.Commands.add('completeTransaction', () => {
    cy.contains('BUY!').click()
    cy.get('h2[class*="h6"]').should('have.text', 'Thank you!')
    cy.get('p[class*="MuiTypography-root"]').should('have.text', 'We\'ll be sending you a link by e-mail to complete payment. We only accept DLacy Coins!!')
    cy.contains('Awesome').click()
    cy.get('[class*="MuiButtonBase-root"]:nth-child(3) span[class="MuiTab-wrapper"]').should.exist;
})
