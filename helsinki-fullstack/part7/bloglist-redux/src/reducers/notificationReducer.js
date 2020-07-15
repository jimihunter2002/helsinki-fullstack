import {
  showNotification,
  hideNotification,
} from '../actions/notificationActions';

//debounce notification
let nextNotification = 0;
export const setNotification = (message, delay, status) => {
  let timeout;
  return async dispatch => {
    const id = nextNotification++;

    dispatch(showNotification(id, message, status));
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch(hideNotification(id));
    }, delay * 1000);
  };
};

export const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      console.log('ACTION', action.status);
      return { message: action.message, status: action.status };
    case 'HIDE_NOTIFICATION':
      return null;
    default:
      return state;
  }
};
