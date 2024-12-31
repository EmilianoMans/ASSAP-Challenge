describe('Registration', () => {
    beforeEach(() => {
        cy.goToHomePage();
        })

    it('User registration successful', () => {
        const uuid = () => Cypress._.random(0, 1e6)
        const id= uuid()
        cy.get('[type="button"]:nth-child(3)').click()
        cy.get('[id="register-username"]').type(`test${id}`)
        cy.get('[id="register-password"]').type(`password${id}`)
        cy.get('div[role="dialog"] span[class="MuiButton-label"]').click()
        cy.login(`test${id}`, `password${id}`)
        cy.get('[type="button"]:nth-child(2)').click() 
        cy.get('[class*="MuiButtonBase-root"]:nth-child(3) span[class="MuiTab-wrapper"]').should.exist;
    })
    
    it('User registration unsuccessful- blank inputs', () => {
        cy.get('[type="button"]:nth-child(3)').click()
        cy.get('[id="register-username"]').type(' ')
        cy.get('[id="register-password"]').type(' ')
        cy.get('div[role="dialog"] span[class="MuiButton-label"]').click()
        cy.get('[class="error_message"]').should.exist;
        cy.login(' ', ' ')
        cy.get('[type="button"]:nth-child(2)').click() 
        cy.get('[class*="MuiButtonBase-root"]:nth-child(3) span[class="MuiTab-wrapper"]').should.not.exist;
    })
    
    it('User registration unsuccessful- blank username', () => {
        cy.get('[type="button"]:nth-child(3)').click()
        cy.get('[id="register-username"]').type('')
        cy.get('[id="register-password"]').type('password')
        cy.get('div[role="dialog"] span[class="MuiButton-label"]').click()
        cy.get('[class="error_message"]').should.exist;
        cy.login(' ', 'password')
        cy.get('[type="button"]:nth-child(2)').click() 
        cy.get('[class*="MuiButtonBase-root"]:nth-child(3) span[class="MuiTab-wrapper"]').should.not.exist;
    })
    
    it('User registration unsuccessful- blank password', () => {
        cy.get('[type="button"]:nth-child(3)').click()
        cy.get('[id="register-username"]').type('User2')
        cy.get('[id="register-password"]').type(' ')
        cy.get('div[role="dialog"] span[class="MuiButton-label"]').click()
        cy.get('[class="error_message"]').should.exist;
        cy.login('User2', ' ')
        cy.get('[type="button"]:nth-child(2)').click() 
        cy.get('[class*="MuiButtonBase-root"]:nth-child(3) span[class="MuiTab-wrapper"]').should.not.exist;
    })
    
    it('User registration unsuccessful - concurrence', () => {
        cy.fixture('data').then(({users}) => {
            cy.get('[type="button"]:nth-child(3)').click()
            cy.get('[id=username]').type(users[0].username)
            cy.get('[id=password]').type(users[0].password)
            cy.get('[type="button"]:nth-child(2)').click()
            cy.get('[class="error_message"]').should.exist.and('have.text', `Username "${users[0].username}" already exists`)
            cy.login(users[0].username, users[0].password)
            cy.get('[type="button"]:nth-child(2)').click() 
            cy.get('[class*="MuiButtonBase-root"]:nth-child(3) span[class="MuiTab-wrapper"]').should.not.exist;
        })
    })
    
})