import React from 'react';
import store from './reduxStore';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  useSelector(state => state);
  const good = () => {
    dispatch({
      type: 'GOOD',
    });
  };

  const neutral = () => {
    dispatch({
      type: 'OK',
    });
  };

  const bad = () => {
    dispatch({
      type: 'BAD',
    });
  };

  const reset = () => {
    dispatch({
      type: 'ZERO',
    });
  };
  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={neutral}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

export default App;
