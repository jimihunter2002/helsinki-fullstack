import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import utility from '../utilities/utility';
// import Button from './Button';

const BlogDetails = ({ user, blogs, onUpdateLikes, onDeleteHandler }) => {
  //   const [details, setDetails] = useState(false);
  const [bgCorlor, setBgColor] = useState('');
  const id = useParams().id;
  const blog = blogs.find(n => n.id === id);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    paddingBottom: 10,
  };

  //   const showBlogDetails = () => {
  //     setDetails(!details);
  //   };

  const addLikes = async () => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 };

    onUpdateLikes(blog.id, blogToUpdate);
  };

  const deleteHandler = () => {
    setBgColor('#429bf5');
    setTimeout(() => {
      let result = window.confirm(
        `Remove Blog You're NOT gonna need it! by ${blog.author}`,
      );
      result ? onDeleteHandler(blog) : setBgColor('');
    }, 0);
  };

  return (
    <>
      <div style={blogStyle} className='blog-details'>
        <h3>
          {blog.title} {utility.capitalizeString(blog.author)}
        </h3>{' '}
        {/* <Button action='hide' onClick={showBlogDetails} /> */}
        <br />
        <a href={blog.url}>{blog.url}</a>
        <br />
        <br />
        <span>{blog.likes}</span>
        <button
          className='like'
          type='button'
          onClick={addLikes}
          style={{ cursor: 'pointer' }}>
          Like
        </button>
        <br />
        added by {utility.capitalizeString(blog.author)}
        <br />
        {blog.user.username === user.username ? (
          <button
            className='remove-btn'
            type='button'
            onClick={deleteHandler}
            style={{ cursor: 'pointer', backgroundColor: bgCorlor }}>
            Remove
          </button>
        ) : null}
      </div>
    </>
  );
};

export default BlogDetails;
