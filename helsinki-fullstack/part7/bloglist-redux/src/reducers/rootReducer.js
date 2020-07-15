import { combineReducers } from 'redux';
import { blogReducer } from './blogReducer';
import { notificationReducer } from './notificationReducer';
import { loginReducer } from './loginReducer';
import { userReducer } from './userReducer';

const appReducers = combineReducers({
  blogs: blogReducer,
  notificationDisplay: notificationReducer,
  userInfo: loginReducer,
  users: userReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGGED_OUT') {
    localStorage.removeItem('loggedBlogAppUser');
    state = undefined;
  }
  return appReducers(state, action);
};
