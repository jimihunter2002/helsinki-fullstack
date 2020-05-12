import React from 'react';
import SubmitButton from '../components/SubmitButton';

const BlogForm = ({ handler }) => {
  const {
    addBlog,
    title,
    titleHandler,
    author,
    authorHandler,
    url,
    urlHandler,
    createHandler,
  } = handler;
  return (
    <div className='formDiv'>
      <form onSubmit={addBlog}>
        <div>
          title:{' '}
          <input
            id='title'
            type='text'
            name='title'
            value={title}
            onChange={titleHandler}
          />
        </div>
        <div>
          author:{' '}
          <input
            id='author'
            type='text'
            name='author'
            value={author}
            onChange={authorHandler}
          />
        </div>
        <div>
          url:{' '}
          <input
            type='text'
            id='url'
            name='url'
            value={url}
            onChange={urlHandler}
          />
        </div>
        <button id='create-btn' type='submit' onClick={createHandler}>
          create
        </button>
        {/* <SubmitButton
          id='create-btn'
          action='create'
          actionHandler={createHandler}
        /> */}
      </form>
    </div>
  );
};

export default BlogForm;
