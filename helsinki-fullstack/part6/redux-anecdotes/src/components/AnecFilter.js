import React from 'react';
import { connect } from 'react-redux';
//import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

const AnecFilter = props => {
  //const dispatch = useDispatch();

  //let filterString = useSelector(state => state.filterString);

  // const filterAnecdote = event => {
  //   filterString = event.target.anecdote.value;
  //   //
  //   //event.target.anecdote.value = '';
  //   dispatch(filterChange(filterString));
  // };
  return (
    <div>
      filter{' '}
      <input
        name='anecdote'
        onChange={e => props.filterChange(e.target.value)}
      />
    </div>
  );
};

const mapDispatchToProps = {
  filterChange,
};

const ConnectedAnecFilter = connect(null, mapDispatchToProps)(AnecFilter);
export default ConnectedAnecFilter;

//export default AnecFilter;

// const AnecdoteForm = props => {
//     const dispatch = useDispatch();

//     const addAnecdote = event => {
//       event.preventDefault();
//       const content = event.target.anecdote.value;
//       event.target.anecdote.value = '';
//       dispatch(createAnecdote(content));
//       dispatch(setNotification(content));
//       setTimeout(() => {
//         dispatch(removeNotification(null));
//       }, 5000);
//     };
