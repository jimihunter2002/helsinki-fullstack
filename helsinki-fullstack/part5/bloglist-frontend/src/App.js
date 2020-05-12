import React, { useState, useEffect } from 'react';
//import blogService from '../src/services/blogService';
import Blog from './components/Blog';
import Button from './components/Button';
import loginService from '../src/services/login';
import LoginForm from './components/LoginForm';
import SuccessNotification from './components/SuccessNotification';
import ErrorNotification from './components/ErrorNotification';
import utility from './utilities/utility';
import Togglable from './components/Togglable';
// const blogService = require('../src/services/blogService');
import blogService from '../src/services/blogService';

const baseUrl = 'http://localhost:3000';
const App = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  //for toggling
  //const loginFormRef = React.createRef();

  //props like button
  async function fetchBlogs() {
    try {
      const blogList = await blogService.getAll();
      setBlogs(blogList);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      setUser(user);
      setUserName('');
      setPassword('');
    } catch (error) {
      setErrorMessage('wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const logoutHandle = async () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    window.location.href = baseUrl;
  };

  const titleHandler = event => setTitle(event.target.value);
  const authorHandler = event => setAuthor(event.target.value);
  const urlHandler = event => setUrl(event.target.value);

  const usernameHandler = event => setUserName(event.target.value);
  const passwordHandler = event => setPassword(event.target.value);

  const addBlog = async event => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url,
    };
    try {
      const returnedBlog = await blogService.create(blogObject);

      setSuccessMessage(`${title}! by ${author} added`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      setBlogs(blogs.concat(returnedBlog));
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      setErrorMessage(
        'blog may already exist or blog creation failed service not available try again ...',
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const onDeleteHandler = async blog => {
    try {
      await blogService.deleteBlog(blog.id);
      setSuccessMessage(`blog titled "${blog.title}! by ${author} deleted`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      fetchBlogs();
    } catch (error) {
      setErrorMessage(
        'blog cannot be deleted service not available try again ...',
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const onUpdateLikes = async (id, blogToupdate) => {
    try {
      const returnedBlog = await blogService.update(id, blogToupdate);

      fetchBlogs();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelLoginHandler = () => {
    setUserName('');
    setPassword('');
  };

  const cancelBlogHandler = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const handler = {
    addBlog,
    titleHandler,
    authorHandler,
    urlHandler,
    title,
    url,
    author,
    cancelLoginHandler,
    cancelBlogHandler,
  };

  if (user === null) {
    return (
      <div>
        <h2>blogs</h2>
        <ErrorNotification message={errorMessage} />
        <Togglable buttonLabel='login' handleLoginCancel={cancelLoginHandler}>
          <LoginForm
            username={username}
            password={password}
            usernameHandler={usernameHandler}
            passwordHandler={passwordHandler}
            handleLogin={handleLogin}
          />
        </Togglable>
      </div>
    );
  } else {
    return (
      <>
        <h2>blogs</h2>
        <SuccessNotification message={successMessage} />
        <ErrorNotification message={errorMessage} />
        <p>
          {utility.capitalizeString(user.name)} logged in{' '}
          <Button id='logout-btn' action='logout' onClick={logoutHandle} />
        </p>

        <Togglable
          buttonLabel='new note'
          handler={handler}
          handleBlogCancel={cancelBlogHandler}>
          {utility.blogSort(blogs).map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              onDeleteHandler={onDeleteHandler}
              onUpdateLikes={onUpdateLikes}
            />
          ))}
        </Togglable>
      </>
    );
  }
};

export default App;
