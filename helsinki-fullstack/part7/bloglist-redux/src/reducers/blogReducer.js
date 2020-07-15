export const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;
    case 'NEW_BLOG':
      return state.concat(action.data);
    case 'DELETE_BLOG':
      return [...state].filter(blog => blog.id !== action.id);
    case 'LIKE_BLOG':
      return state.map(item =>
        item.id !== action.data.id ? item : action.data,
      );
    default:
      return state;
  }
};
