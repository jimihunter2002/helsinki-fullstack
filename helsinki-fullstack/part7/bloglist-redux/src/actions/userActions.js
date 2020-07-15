import loginService from '../services/login';
import userService from '../services/usersService';
import actionTypes from './actionTypes';

// export const loginUser = userObj => {
//   return async dispatch => {
//     const data = await loginService.login(userObj);
//     console.log(data, 'USERINFO');
//     dispatch({
//       type: actionTypes.LOGIN_USER,
//       data,
//     });
//   };
// };

export const loginUser = userObj => {
  return dispatch => {
    // const data = await loginService.login(userObj);
    loginService.login(userObj).then(data => {
      console.log(data, 'DATATA');
      if (data !== 401) {
        dispatch({
          type: actionTypes.LOGIN_SUCCEEDED,
          data,
        });
      } else {
        dispatch({
          type: actionTypes.FAILED_LOGIN,
          error: 'login failed',
        });
      }
    });
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.USER_LOGGED_OUT,
    });
  };
};

export const getAllUser = () => {
  return async dispatch => {
    const data = await userService.getAllUsers();
    dispatch({
      type: actionTypes.GET_ALL_USERS,
      data,
    });
  };
};
// export const failedLogin = (userObj) =>
