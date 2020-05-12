import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

test('renders blog title and author', () => {
  const blog = {
    title: 'the rich also cry',
    author: 'mike pence',
    url: 'https://mikepencer.co.uk',
  };

  const component = render(<Blog blog={blog} />);

  const input = component.container.querySelector('input');
  console.log(prettyDOM(input));

  //method 1
  expect(component.container).toHaveTextContent('the rich also cry Mike Pence');

  //method 2
  const element = component.getByText('the rich also cry Mike Pence');
  expect(element).toBeDefined();

  //method 3
  const div = component.container.querySelector('.blog-default');
  console.log(prettyDOM(div));
  expect(div).toHaveTextContent('the rich also cry Mike Pence');
});

test('should reveal blog details when view button is clicked', () => {
  const blog = {
    title: 'the rich also cry',
    author: 'mike pence',
    url: 'https://mikepencer.co.uk',
    user: {
      username: 'testuser',
    },
  };

  const user = { username: 'testuser' };

  const mockHandler = jest.fn();

  const component = render(
    <Blog blog={blog} onClick={mockHandler} user={user} />,
  );

  const button = component.getByText('view');
  fireEvent.click(button);

  const div = component.container.querySelector('.blog-details');
  //console.log(prettyDOM(div));
  expect(div).toHaveTextContent('https://mikepencer.co.uk');

  const element = component.getByText('Like');
  console.log(prettyDOM(element));
  expect(element).toBeDefined();
});

test('Like button has been clicked twice', () => {
  const blog = {
    title: 'the rich also cry',
    author: 'mike pence',
    url: 'https://mikepencer.co.uk',
    user: {
      username: 'testuser',
    },
  };

  const user = { username: 'testuser' };
  const likeHandler = jest.fn();
  const mockHandler = jest.fn();

  const component = render(
    <Blog
      blog={blog}
      onClick={mockHandler}
      user={user}
      onUpdateLikes={likeHandler}
    />,
  );

  const button = component.getByText('view');
  fireEvent.click(button);

  const element = component.getByText('Like');
  console.log(prettyDOM(element));

  fireEvent.click(element);
  fireEvent.click(element);

  expect(likeHandler.mock.calls).toHaveLength(2);
});
