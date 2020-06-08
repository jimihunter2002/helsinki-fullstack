// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ];
import anaecdoteService from '../services/anecdotes';

export const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = anecdote => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// action creator function
// export const createAnecdote = content => {
//   return {
//     type: 'NEW_ANECDOTE',
//     data: {
//       content,
//       id: getId(),
//       votes: 0,
//     },
//   };
// };

//transformed with backend after thunk
// export const createAnecdote = data => {
//   return {
//     type: 'NEW_ANECDOTE',
//     data,
//   };
// };

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anaecdoteService.createNew(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote,
    });
  };
};

//action creator function
// export const voteAnecdote = id => {
//   return {
//     type: 'VOTE',
//     data: {
//       id,
//     },
//   };
// };

//fix voting saved to backend with thunk action creator
export const voteAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anaecdoteService.update(
      anecdote.id,
      anecdote,
    );
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    });
  };
};

// export const initializeAnecdotes = anecdotes => {
//   return {
//     type: 'INIT_ANECDOTES',
//     data: anecdotes,
//   };
// };

//action creator with thunk
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anaecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

//const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      //concat method could have been used here
      return [...state, action.data];
    case 'INIT_ANECDOTES':
      return action.data;
    case 'VOTE': {
      const id = action.data.id;
      const votedAnecdote = action.data;
      //const anecdoteToVoteFor = state.find(n => n.id === id);
      // const votedAnecdote = {
      //   ...anecdoteToVoteFor,
      //   votes: anecdoteToVoteFor.votes + 1,
      // };
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote,
      );
    }

    default:
      return state;
  }
};

export default reducer;
