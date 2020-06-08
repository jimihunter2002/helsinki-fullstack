import React from 'react';
//use connect instead
//import { useDispatch, useSelector } from 'react-redux';
// import { useDispatch, connect } from 'react-redux';
import { connect } from 'react-redux';
import { voteAnecdote } from './reducers/anecdoteReducer';
import { anecdoteSorter } from './tranformer';
import {
  setNotification,
  //removeNotification,
} from './reducers/notificationReducer';

const Anecdote = ({ anecdote, onClick, buttonStyle }) => {
  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={onClick} style={buttonStyle}>
          vote
        </button>
      </div>
    </>
  );
};

const AnecdoteList = props => {
  //const dispatch = useDispatch();
  // const anecdotes = useSelector(state => state.anecdotes);
  // const anecdotes = useSelector(state => {
  //   const filterString = state.filterString;
  //   return filterString
  //     ? state.anecdotes.filter(item =>
  //         item.content.toLowerCase().includes(filterString.toLowerCase()),
  //       )
  //     : state.anecdotes;
  // });

  let buttonStyle = {
    borderStyle: 'none',
  };

  const vote = anecdote => {
    // dispatch(voteAnecdote(anecdote));
    props.voteAnecdote(anecdote);
    buttonStyle = {
      borderStyle: 'solid',
      borderColor: '#99ccff',
    };
    // dispatch(setNotification(`you voted ${anecdote.content}`, 10));
    props.setNotification(`you voted ${anecdote.content}`, 10);
    // setTimeout(() => {
    //   dispatch(removeNotification());
    // }, 5000);
  };

  return (
    <div>
      {props.anecdotes.sort(anecdoteSorter).map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          onClick={() => vote(anecdote)}
          buttonStyle={buttonStyle}
        />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  if (!state.filterString) {
    return {
      anecdotes: state.anecdotes,
      //filterString: state.filterString,
    };
  }

  return {
    anecdotes: state.filterString
      ? state.anecdotes.filter(item =>
          item.content.toLowerCase().includes(state.filterString.toLowerCase()),
        )
      : state.anecdotes,
  };
};

// const anecdoteToShow = () => {
//   return props.filterString
//     ? props.anecdotes.filter(item =>
//         item.content.toLowerCase().includes(props.filterString.toLowerCase()),
//       )
//     : props.anecdotes;
// };

const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
};

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnecdoteList);
// export default AnecdoteList;
export default ConnectedAnecdotes;
