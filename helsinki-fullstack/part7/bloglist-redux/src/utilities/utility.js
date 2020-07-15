const capitalizeString = str => {
  return str
    .split(' ')
    .map(name => (name = name[0].toUpperCase().concat(name.slice(1))))
    .join(' ');
};

const blogCompare = (a, b) => {
  return b.likes - a.likes;
};

const blogSort = arr => {
  return arr.sort(blogCompare);
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('loggedBlogAppUser');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('loggedBlogAppUser', serializedState);
  } catch (err) {
    //ignore the error for now
  }
};

export const clearState = () => {
  try {
    localStorage.removeItem('loggedBlogAppUser');
  } catch (err) {
    console.log('cannot remove state in local storage');
  }
};

export default { capitalizeString, blogSort };
