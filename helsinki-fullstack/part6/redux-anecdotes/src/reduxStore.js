import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers/anecdoteReducer';

//newly added
import notificationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';

//newly added
const reducers = combineReducers({
  anecdotes: reducer,
  message: notificationReducer,
  filterString: filterReducer,
});

//newly added
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)),
);

//newly added
console.log(store.getState());

export default store;
