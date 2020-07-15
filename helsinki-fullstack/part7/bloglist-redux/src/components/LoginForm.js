import React from 'react';
import PropTypes from 'prop-types';
import SubmitButton from './SubmitButton';

const LoginForm = ({
  username,
  password,
  handleLogin,
  usernameHandler,
  passwordHandler,
}) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username{' '}
          <input id='username' value={username} onChange={usernameHandler} />
        </div>
        <div>
          password{' '}
          <input
            id='password'
            type='password'
            value={password}
            onChange={passwordHandler}
          />
        </div>
        <SubmitButton id='login-button' action='login' />
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  usernameHandler: PropTypes.func.isRequired,
  passwordHandler: PropTypes.func.isRequired,
};

export default LoginForm;
