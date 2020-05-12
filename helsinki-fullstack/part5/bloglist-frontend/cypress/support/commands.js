///<reference types="cypress"/>
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body));

    cy.visit('http://localhost:3000');
  });
});

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  let reqBody = { title, author, url };

  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: reqBody,
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedBlogAppUser')).token
      }`,
    },
  }).then(({ body }) => {
    cy.request({
      url: `http://localhost:3001/api/blogs/${body.id}`,
      method: 'PUT',
      body: { ...reqBody, likes },
    });
  });
  cy.visit('http://localhost:3000');
});
