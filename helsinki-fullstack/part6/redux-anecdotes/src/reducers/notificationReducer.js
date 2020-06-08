//before redux thunk usage
// export const setNotification = message => {
//   return {
//     type: 'SET_NOTIFICATION',
//     message,
//   };
// };

let showNotification = (id, message) => {
  return {
    type: 'SET_NOTIFICATION',
    id,
    message,
  };
};

export const hideNotification = id => {
  return {
    type: 'HIDE_NOTIFICATION',
    id,
  };
};

//debouncing a function
let nextNotification = 0;
export const setNotification = (message, delay) => {
  let timeout;
  return async dispatch => {
    const id = nextNotification++;

    dispatch(showNotification(id, message));
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch(hideNotification(id));
    }, delay * 1000);
  };
};

//previos before thunk
// export const removeNotification = id => {
//   return {
//     type: 'REMOVE_NOTIFICATION',
//     //message: null,
//     id,
//   };
// };

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message;
    case 'HIDE_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

export default notificationReducer;
