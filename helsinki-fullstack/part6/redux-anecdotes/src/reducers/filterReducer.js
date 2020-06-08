export const filterChange = searchString => {
  return {
    type: 'SET_FILTER',
    searchString,
  };
};

const filterReducer = (state = '', action) => {
  console.log(action, 'ACTION');
  switch (action.type) {
    case 'SET_FILTER':
      return action.searchString;
    default:
      return state;
  }
};

export default filterReducer;
