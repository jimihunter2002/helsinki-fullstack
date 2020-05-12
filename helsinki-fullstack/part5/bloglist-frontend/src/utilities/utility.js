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
export default { capitalizeString, blogSort };
