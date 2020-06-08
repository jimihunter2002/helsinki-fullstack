import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;

    case 'DECREMENT':
      return state - 1;

    case 'NO_CHANGE':
      return 0;
    default:
      return state;
  }
};

const store = createStore(reducer);

const App = () => {
  return (
    <div>
      {store.getState()} <br />
      <button name='plus' onClick={e => store.dispatch({ type: 'INCREMENT' })}>
        plus
      </button>
      <button name='minus' onClick={e => store.dispatch({ type: 'DECREMENT' })}>
        minus
      </button>
      <button name='zero' onClick={e => store.dispatch({ type: 'NO_CHANGE' })}>
        zero
      </button>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);
