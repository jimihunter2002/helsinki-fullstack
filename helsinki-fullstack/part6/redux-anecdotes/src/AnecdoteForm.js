import React from 'react';
// import { connect, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { createAnecdote } from './reducers/anecdoteReducer';
// import {
//   setNotification,
//   removeNotification,
// } from './reducers/notificationReducer';
import { setNotification } from './reducers/notificationReducer';
import anecdoteService from './services/anecdotes';

const AnecdoteForm = props => {
  //const dispatch = useDispatch();

  const addAnecdote = async event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    //newly added after thunk
    //const newAnecdote = await anecdoteService.createNew(content);
    //dispatch(createAnecdote(content));
    props.createAnecdote(content);

    // dispatch(setNotification(`new anecdote ${content}`, 10));
    props.setNotification(`new anecdote ${content}`, 10);
    // dispatch(createAnecdote(content));
    // dispatch(setNotification(content));
    // setTimeout(() => {
    //   dispatch(removeNotification(null));
    // }, 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  );
};

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
//export default AnecdoteForm;
