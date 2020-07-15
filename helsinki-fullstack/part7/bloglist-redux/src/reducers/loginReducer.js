const initialState = {
  isLoggedIn: false,
  username: '',
  token: '',
  name: '',
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCEEDED':
      return { ...state, ...action.data, isLoggedIn: true };
    case 'FAILED_LOGIN':
      return { ...state, error: action.error };
    default:
      return state;
  }
};
