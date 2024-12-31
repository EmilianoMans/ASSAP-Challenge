describe('API Sanity Check', () => {
    before(() => {
      const uuid = () => Cypress._.random(0, 1e6);
      Cypress.env("uuid", uuid());
      Cypress.env('username', `TestUser${Cypress.env("uuid")}`);
      Cypress.env('password', `TestPass${Cypress.env("uuid")}`);
      Cypress.env("url", "http://localhost:5000");
      Cypress.env("register_url", "/users/register");
      Cypress.env("login_url", "/users/login");
      Cypress.env("products_url", `/TestUser${Cypress.env("uuid")}/products`);
      Cypress.env("", "/users/register");
    })
  
    it("Register new user", () => {
      cy.api("POST", Cypress.env('url') + Cypress.env('register_url'), {
        "username": `${Cypress.env('username')}`,
        "password": `${Cypress.env('password')}`,
        }).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq('User created successfully');
      });
    });
  
    it("Login user", () => {
      cy.api("POST", Cypress.env('url') + Cypress.env('login_url'), {
        "username": `${Cypress.env('username')}`,
        "password": `${Cypress.env('password')}`,
        }).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq('Login succeeded.');
      });
    });
  
    it("Get products", () => {
      cy.api("GET", Cypress.env('url') + Cypress.env('products_url')).should((response) => {
      expect(response.status).to.eq(200);
      Cypress.env('firstProduct_url', `/${response.body[0].product_name}`);
      });
    });
  
    it("Get first product", () => {
      cy.api("GET", Cypress.env('url') + Cypress.env('products_url') + Cypress.env('firstProduct_url')).should((response) => {
      expect(response.status).to.eq(200);
      });
    });
  
    it("Add first product", () => {
      cy.api("POST", Cypress.env('url') + Cypress.env('products_url') + Cypress.env('firstProduct_url') + '/add', {
        "quantity": 1,
      }).should((response) => {
      expect(response.status).to.eq(200);
      });
    }); 
  
    it("Get user's cart", () => {
      cy.api("GET", Cypress.env('url') + Cypress.env('products_url') + '/cart').should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body[0].product_qty).to.eq(1);
      });
    }); 
  
    it("Checkout", () => {
      cy.api("POST", Cypress.env('url') + Cypress.env('products_url') + '/cart/checkout').should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq('Checkout successful! Thank you for shopping with us.');
      });
    }); 
  });