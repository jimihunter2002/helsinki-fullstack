import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';
import { prettyDOM } from '@testing-library/dom';

describe('<BlogForm>', () => {
  test('updates parent state and call on create', () => {
    const addBlog = jest.fn();
    const titleHandler = jest.fn();
    const authorHandler = jest.fn();
    const urlHandler = jest.fn();
    const createHandler = jest.fn();
    const handler = {
      addBlog,
      titleHandler,
      authorHandler,
      urlHandler,
      createHandler,
    };

    const component = render(<BlogForm handler={handler} />);

    const title = component.container.querySelector('#title');
    const author = component.container.querySelector('#author');
    const url = component.container.querySelector('#url');
    const form = component.container.querySelector('form');
    console.log(prettyDOM(title));

    fireEvent.change(title, {
      target: { value: 'amadilo butterfly' },
    });
    fireEvent.change(author, {
      target: { value: 'kokun olaiya' },
    });
    fireEvent.change(url, {
      target: { value: 'https://naija.co.uk' },
    });

    console.log(prettyDOM(title));
    fireEvent.submit(form);

    expect(handler.addBlog.mock.calls).toHaveLength(1);
    expect(author.value).toBe('kokun olaiya');
    expect(title.value).toBe('amadilo butterfly');
  });
});
