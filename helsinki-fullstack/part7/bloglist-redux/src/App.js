import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import blogService from '../src/services/blogService';
import Blog from './components/Blog';
import Button from './components/Button';
import LoginForm from './components/LoginForm';
import utility, { saveState, loadState } from './utilities/utility';
import Togglable from './components/Togglable';
import {
  initializeBlogs,
  createBlog,
  deleteBlog,
  likeBlog,
} from './actions/blogActions';
import { loginUser, logout, getAllUser } from './actions/userActions';
import { setNotification } from './reducers/notificationReducer';
import Notification from './components/Notification';
import Users from './components/Users';
import UserDetails from './components/UserDetails';
import store from './store';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import BlogDetails from './components/BlogDetails';

const baseUrl = 'http://localhost:3000';
const App = () => {
  const blogs = useSelector(state => state.blogs);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(state => state.userInfo);
  const users = useSelector(state => state.users);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    loadState();
  }, []);

  const handleLogin = async event => {
    event.preventDefault();

    dispatch(loginUser({ username, password }));

    setTimeout(() => {
      const loggedInStatus = store.getState().userInfo;
      if (loggedInStatus.isLoggedIn) {
        blogService.setToken(loggedInStatus.token);
        saveState(store.getState().userInfo);
      } else {
        dispatch(setNotification(`wrong username or password`, 5, 'error'));
      }
    }, 900);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const logoutHandle = async () => {
    dispatch(logout());
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
      dispatch(createBlog(blogObject));

      dispatch(setNotification(`${title}! by ${author} added`, 5, 'success'));

      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      dispatch(
        setNotification(
          `blog may already exist or blog creation failed service not available try again ...`,
          5,
          'error',
        ),
      );
    }
  };

  const onDeleteHandler = async blog => {
    try {
      dispatch(deleteBlog(blog.id));
      dispatch(
        setNotification(
          `blog titled "${blog.title}! by ${author} deleted`,
          5,
          'success',
        ),
      );
    } catch (error) {
      dispatch(
        setNotification(
          `blog cannot be deleted service not available try again ...`,
          5,
          'error',
        ),
      );
    }
  };

  const onUpdateLikes = async (id, blogToUpdate) => {
    try {
      dispatch(likeBlog(id, blogToUpdate));
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
  const padding = {
    padding: 5,
  };

  if (!user.isLoggedIn) {
    return (
      <div>
        <h2>blogs</h2>

        <Notification />
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
      <Router>
        <div>
          <Link style={padding} to='/'>
            home
          </Link>
          <Link style={padding} to='/users'>
            users
          </Link>
          <Link style={padding} to='/blogs'>
            blogs
          </Link>
        </div>

        <h2>blogs</h2>
        <Notification />
        <p>
          {utility.capitalizeString(user.name)} logged in <br />
          <Button id='logout-btn' action='logout' onClick={logoutHandle} />
        </p>

        <Switch>
          <Route path='/users/:id'>
            <UserDetails users={users} />
          </Route>
          <Route path='/users'>
            <Users />
          </Route>
          <Route path='/blogs/:id'>
            <BlogDetails
              blogs={blogs}
              onUpdateLikes={onUpdateLikes}
              onDeleteHandler={onDeleteHandler}
              user={user}
            />
          </Route>
          <Route path='/'>
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
          </Route>
        </Switch>
      </Router>
    );
  }
};

export default App;
