describe('Login', () => {
    beforeEach(() => {
    cy.goToHomePage();
    })
  
    it('Login successful', () => {
      cy.fixture('data').then(({users}) => {
          cy.login(users[0].username, users[0].password);  
          cy.get('[class*="MuiButtonBase-root"]:nth-child(3) span[class="MuiTab-wrapper"]').should.exist;
      })
    })
    
    it('Login unsuccessful - Wrong Password', () => {
      cy.fixture('data').then(({users}) => {
        cy.login(users[0].username, 'WrongPassword');
        cy.get('[class="error_message"]').should('be.visible').and('have.text', 'Incorrect Username or Password')
      })
    })
  
    it('Login unsuccessful - Wrong Username', () => {
      cy.fixture('example').then(({users}) => {
        cy.login('WrongUsername', users[0].password)
        cy.get('[id=username]').type('WrongUsername')
        cy.get('[id=password]').type(users[0].password)
        cy.get('[type="button"]:nth-child(2)').click();
        cy.get('[class="error_message"]').should('have.text', 'Incorrect Username or Password');
      })
    })
  
    it('Login unsuccessful - blank inputs', () => {
      cy.get('[type="button"]:nth-child(2)').click();
      cy.get('[class="error_message"]').should('have.text', 'Incorrect Username or Password');
    })
})