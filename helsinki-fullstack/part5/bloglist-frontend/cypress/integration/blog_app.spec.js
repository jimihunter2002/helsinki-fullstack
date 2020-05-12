describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'test user',
      username: 'root',
      password: 'secret',
    };
    cy.request('POST', 'http://localhost:3001/api/users', user);

    cy.visit('http://localhost:3000');
  });

  it('login form is shown', function () {
    cy.contains('login').click();
    cy.contains('Login');
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  it('login form can be cancel', function () {
    cy.contains('login').click();
    cy.contains('cancel').click();
    cy.contains('blogs');
    cy.contains('login');
    cy.get('#username').should('not.be.visible');
  });

  describe('Login', function () {
    it('succeeds with valid credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('root');
      cy.get('#password').type('secret');
      cy.get('#login-button').click();

      cy.contains('Test User logged in');
    });
    it('fails with invalid credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('ruth');
      cy.get('#password').type('secret');
      cy.get('#login-button').click();

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.get('html').should('not.contain', 'Test User logged in');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'secret' });
      cy.createBlog({
        title: 'first blog created',
        author: 'first blog',
        url: 'http://firstblog.co.uk',
        likes: 4,
      });
      cy.createBlog({
        title: 'second blog created',
        author: 'second blog',
        url: 'http://secondblog.co.uk',
        likes: 6,
      });
      cy.createBlog({
        title: 'third blog created',
        author: 'third blog',
        url: 'http://thirdblog.co.uk',
        likes: 3,
      });
    });
    it('a new blog can be created', function () {
      cy.contains('new note').click();
      cy.get('#title').type('end to end testing with cypress');
      cy.get('#author').type('glen bamutov');
      cy.get('#url').type('http://cypress.test.com');
      cy.get('#create-btn').click();

      cy.contains('end to end testing with cypress');
      cy.get('.blog-default').should('have.length', 4);
    });
    it('a user can like a blog', function () {
      cy.contains('new note').click();
      cy.get('#title').type('end to end testing with cypress');
      cy.get('#author').type('glen bamutov');
      cy.get('#url').type('http://cypress.test.com');
      cy.get('#create-btn').click();

      cy.contains('end to end testing with cypress');

      cy.get('.blog-default')
        .contains('end to end testing with cypress')
        .within(el => {
          cy.get('#view-btn').click();
          cy.get('span').invoke('text').then(parseFloat).should('be', 0);
          cy.get('.like').click();
          cy.get('span').invoke('text').then(parseFloat).should('be', 1);
        });
    });
    it('sorts blogs in descending order', function () {
      cy.get('.show-form')
        .children('.blog-default')
        .first()
        .contains('second blog created');
    });
  });
});

describe('blogs', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'test user',
      username: 'root',
      password: 'secret',
    };

    const secondUser = {
      name: 'second user',
      username: 'admin',
      password: 'secret',
    };
    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.request('POST', 'http://localhost:3001/api/users', secondUser);

    cy.visit('http://localhost:3000');
  });

  it('create a blog and delete it by owner', function () {
    cy.login({ username: 'root', password: 'secret' });
    cy.createBlog({
      title: 'first blog created',
      author: 'first blog',
      url: 'http://firstblog.co.uk',
      likes: 4,
    });
    cy.contains('first blog created').within(el => {
      el.find('input').click();
      cy.contains('Remove').click();
      cy.get('html').should('not.have.class', 'blog-default');
    });
  });
  it.only('cannot delete blog if its not by owner', function () {
    cy.login({ username: 'root', password: 'secret' });
    cy.createBlog({
      title: 'first blog created',
      author: 'first blog',
      url: 'http://firstblog.co.uk',
      likes: 4,
    });
    cy.get('#logout-btn').click();
    cy.login({ username: 'admin', password: 'secret' });
    cy.contains('first blog created').within(el => {
      el.find('input').click();
      cy.get('.blog-default').should('not.have.class', 'remove-btn');
    });
  });
});
