import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import BlogForm from './BlogForm';
const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const handleLoginCancel = props.handleLoginCancel;
  const handleBlogCancel = props.handleBlogCancel;

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  //for toggling
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  const createHandler = () => {
    toggleVisibility();
  };

  const loginCancelHandle = () => {
    toggleVisibility();
    handleLoginCancel();
  };

  const blogCancelHandle = () => {
    toggleVisibility();
    handleBlogCancel();
  };

  const handler = {
    ...props.handler,
    createHandler,
  };

  if (props.buttonLabel === 'login') {
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility} style={{ cursor: 'pointer' }}>
            {props.buttonLabel}
          </button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <button id='cancel-login' onClick={loginCancelHandle}>
            cancel
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div style={showWhenVisible} className='hide-form'>
          <BlogForm handler={handler} />
          <button onClick={blogCancelHandle} data-testid='blog-cancel'>
            cancel
          </button>
        </div>
        <div style={hideWhenVisible} className='show-form'>
          <button onClick={toggleVisibility} style={{ cursor: 'pointer' }}>
            {props.buttonLabel}
          </button>
          {props.children}
        </div>
      </div>
    );
  }
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';
export default Togglable;
