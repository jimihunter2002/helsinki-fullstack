import React from 'react';
import utility from '../utilities/utility';
// import Button from './Button';
import { Link } from 'react-router-dom';

const Blog = ({ blog, user, onDeleteHandler, onUpdateLikes }) => {
  // const [details, setDetails] = useState(false);
  //const [bgCorlor, setBgColor] = useState('');

  console.log('BLOGGER', blog);
  console.log('USERRE', user);

  console.log(`BLOG: ${blog.user.username} : USER: ${user.username}`);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    paddingBottom: 10,
  };

  // const deleteHandler = () => {
  //   //setBgColor('#429bf5');
  //   setTimeout(() => {
  //     let result = window.confirm(
  //       `Remove Blog You're NOT gonna need it! by ${blog.author}`,
  //     );
  //     // result ? onDeleteHandler(blog) : setBgColor('');
  //   }, 0);
  // };

  // const addLikes = async () => {
  //   const blogToUpdate = { ...blog, likes: blog.likes + 1 };

  //   onUpdateLikes(blog.id, blogToUpdate);
  // };

  // const showBlogDetails = () => {
  //   setDetails(!details);
  // };
  //if (details === false) {
  return (
    <div style={blogStyle} className='blog-default'>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {utility.capitalizeString(blog.author)}
      </Link>{' '}
      &nbsp;
      {/* <Button id='view-btn' action='view' onClick={showBlogDetails} /> */}
    </div>
  );
  //}
  // } else {
  //   return (
  //     // <div style={blogStyle} className='blog-details'>
  //     //   {blog.title} {utility.capitalizeString(blog.author)} &nbsp;
  //     //   <Button action='hide' onClick={showBlogDetails} />
  //     //   <br />
  //     //   {blog.url}
  //     //   <br />
  //     //   <span>{blog.likes}</span>
  //     //   <button
  //     //     className='like'
  //     //     type='button'
  //     //     onClick={addLikes}
  //     //     style={{ cursor: 'pointer' }}>
  //     //     Like
  //     //   </button>
  //     //   <br />
  //     //   {utility.capitalizeString(blog.author)}
  //     //   <br />
  //     //   {blog.user.username === user.username ? (
  //     //     <button
  //     //       className='remove-btn'
  //     //       type='button'
  //     //       onClick={deleteHandler}
  //     //       style={{ cursor: 'pointer', backgroundColor: bgCorlor }}>
  //     //       Remove
  //     //     </button>
  //     //   ) : null}
  //     // </div>
  //     null
  //   );
  // }
};

export default Blog;
