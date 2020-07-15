import actionTypes from './actionTypes';

// const notifyStyle = {
//   background: 'lightgrey',
//   fontSize: 20,
//   borderStyle: 'solid',
//   borderRadius: 5,
//   padding: 10,
//   marginBottom: 10,
//   color: '',
// };

export const showNotification = (id, message, status) => {
  return async dispatch => {
    // status === 'success'
    //?
    dispatch({
      type: actionTypes.SET_NOTIFICATION,
      id,
      message,
      //   style: { ...notifyStyle, color: 'green' },
      status,
    });
    //   : dispatch({
    //       type: actionTypes.SET_NOTIFICATION,
    //       id,
    //       message,
    //       style: { ...notifyStyle, color: 'red' },
    //     });
  };
};

export const hideNotification = id => {
  return async dispatch => {
    dispatch({
      type: actionTypes.HIDE_NOTIFICATION,
      id,
    });
  };
};
