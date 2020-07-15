import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useParams,
  useHistory,
} from 'react-router-dom';

import useField from './hooks';

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      {/* <a href='#' style={padding}>anecdotes</a> */}
      <Link style={padding} to='/'>
        anecdotes
      </Link>
      {/* <a href='#' style={padding}>create new</a> */}
      <Link style={padding} to='/create'>
        create new
      </Link>
      {/* <a href='#' style={padding}>about</a> */}
      <Link style={padding} to='/about'>
        about
      </Link>
    </div>
  );
};

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find(n => n.id === id);
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>
        for more info see{' '}
        <a
          rel='noopener noreferrer'
          href={
            'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html'
          }
          target='_blank'>
          {anecdote.info}
        </a>
      </div>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for{' '}
    <a
      rel='noopener noreferrer'
      href='https://courses.helsinki.fi/fi/tkt21009'
      target='_blank'>
      Full Stack -websovelluskehitys
    </a>
    . See{' '}
    <a
      rel='noopener noreferrer'
      href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'
      target='_blank'>
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
);

const CreateNew = props => {
  // const [content, setContent] = useState('');
  // const [author, setAuthor] = useState('');
  // const [info, setInfo] = useState('');
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    // props.addNew({
    //   content,
    //   author,
    //   info,
    //   votes: 0,
    // });
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    history.push('/');
  };

  const handleReset = e => {
    e.preventDefault();
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          {/* <input
            type={content.type}
            value={content.value}
            onChange={content.onChange}

            // onChange={e => setContent(e.target.value)}
          /> */}
          <input {...content} />
        </div>
        <div>
          author
          {/* <input
            type={author.type}
            value={author.value}
            onChange={author.onChange}
            // onChange={e => setAuthor(e.target.value)}
          /> */}
          <input {...author} />
        </div>
        <div>
          url for more info
          {/* <input
            type={info.type}
            value={info.value}
            // onChange={e => setInfo(e.target.value)}
            onChange={info.onChange}
          /> */}
          <input {...info} />
        </div>
        <button type='submit'>create</button>
        <button type='reset'>reset</button>
      </form>
    </div>
  );
};

const notifyStyle = {
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
  borderColor: 'red',
};

const Notification = ({ message }) => {
  if (message === '') {
    return null;
  }
  return <div style={notifyStyle}>{message}</div>;
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2',
    },
  ]);

  const [notification, setNotification] = useState('');

  const addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    console.log(anecdote.content, 'THIS');
    setNotification(`a new anecdote ${anecdote.content} created!`);
    setTimeout(() => {
      setNotification('');
    }, 10000);
  };

  const anecdoteById = id => anecdotes.find(a => a.id === id);

  // eslint-disable-next-line
  const vote = id => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map(a => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <Router>
        <div>
          <h1>Software anecdotes</h1>
          <Menu />
          <Notification message={notification} />
        </div>
        <Switch>
          <Route path='/create'>
            <CreateNew addNew={addNew} />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/anecdotes/:id'>
            <Anecdote anecdotes={anecdotes} />
          </Route>
          <Route path='/'>
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
