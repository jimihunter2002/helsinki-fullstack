import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Togglable from './Togglable';

describe('<Togglable />', () => {
  let component;

  beforeEach(() => {
    const cancelBlogHandler = jest.fn();

    component = render(
      <Togglable buttonLabel='show...' handleBlogCancel={cancelBlogHandler}>
        <div className='testDiv' />
      </Togglable>,
    );
  });

  test('renders its children', () => {
    const togglable = component.container.querySelector('.testDiv');
    console.log(prettyDOM(togglable));
    expect(component.container.querySelector('.testDiv')).toBeDefined();
  });

  test('at the start blog form not displayed', () => {
    const div = component.container.querySelector('.show-form');
    console.log(prettyDOM(div));
    expect(div).not.toHaveStyle('display: none');
  });

  test('after clicking button blog form is displayed', () => {
    const button = component.getByText('show...');
    fireEvent.click(button);

    const div = component.container.querySelector('.show-form');
    console.log(prettyDOM(div));
    expect(div).toHaveStyle('display: none');
  });

  test('toggled content can be closed', () => {
    const button = component.getByText('show...');
    fireEvent.click(button);

    //get cancel button
    const cancelBtn = component.getByText('cancel');
    console.log(prettyDOM(cancelBtn));
    fireEvent.click(cancelBtn);
    //expect(button).not.toHaveStyle('display: none');

    //get the dispayed div again
    const div = component.container.querySelector('.show-form');
    expect(div).not.toHaveStyle('display: none');
  });
});
