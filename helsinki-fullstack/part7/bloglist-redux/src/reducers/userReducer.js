export const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_USERS':
      return action.data;
    default:
      return state;
  }
};
