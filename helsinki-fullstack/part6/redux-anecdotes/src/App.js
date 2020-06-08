import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAnecdotes } from './reducers/anecdoteReducer';
import AnecdoteForm from './AnecdoteForm';
import AnecdoteList from './AnecdoteList';
import Notification from './components/Notification';
import AnecFilter from './components/AnecFilter';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecFilter />

      <AnecdoteList />
      <br />
      <AnecdoteForm />
    </div>
  );
};

export default App;
