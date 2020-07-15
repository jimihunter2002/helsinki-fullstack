import blogService from '../services/blogService';
import actionTypes from './actionTypes';

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: actionTypes.INIT_BLOGS,
      data: blogs,
    });
  };
};

export const createBlog = newBlog => {
  return async dispatch => {
    const blog = await blogService.create(newBlog);
    dispatch({
      type: actionTypes.NEW_BLOG,
      data: blog,
    });
  };
};

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.deleteBlog(id);
    dispatch({
      type: actionTypes.DELETE_BLOG,
      id,
    });
  };
};

export const likeBlog = (id, updatedBlog) => {
  return async dispatch => {
    const data = await blogService.update(id, updatedBlog);
    dispatch({
      type: actionTypes.LIKE_BLOG,
      data,
    });
  };
};
