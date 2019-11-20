import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = props => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const App = props => {
  const [selected, setSelected] = useState(0);
  const [voteCount, setVoteCount] = useState({
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
    sixth: 0,
  });

  const anecdoteHandler = () => {
    const index = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(index);
  };

  const voteHandler = () => {
    switch (selected) {
      case 0:
        const firstAnecdote = { ...voteCount, first: voteCount.first + 1 };
        setVoteCount(firstAnecdote);
        break;
      case 1:
        const secondAnecdote = { ...voteCount, second: voteCount.second + 1 };
        setVoteCount(secondAnecdote);
        break;
      case 2:
        const thirdAnecdote = { ...voteCount, third: voteCount.third + 1 };
        setVoteCount(thirdAnecdote);
        break;
      case 3:
        const fourthAnecdote = { ...voteCount, fourth: voteCount.fourth + 1 };
        setVoteCount(fourthAnecdote);
        break;
      case 4:
        const fifthAnecdote = { ...voteCount, fifth: voteCount.fifth + 1 };
        setVoteCount(fifthAnecdote);
        break;
      case 5:
        const sixthAnecdote = { ...voteCount, sixth: voteCount.sixth + 1 };
        setVoteCount(sixthAnecdote);
        break;
      default:
        return null;
    }
  };

  const getMaxVote = obj => Math.max(...Object.values(obj));
  const getHighVote = obj => {
    const maxVote = getMaxVote(obj);
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === maxVote) {
        return Object.keys(obj).indexOf(key);
      }
    }
  };

  return (
    <div>
      <h3>Anecdote of the day</h3>
      {selected === 0 ? <>{props.anecdotes[selected]}</> : <>{props.anecdotes[selected]}</>}
      <br />
      {selected === 0 ? (
        <>has {voteCount.first} votes</>
      ) : selected === 1 ? (
        <>has {voteCount.second} votes</>
      ) : selected === 2 ? (
        <>has {voteCount.third} votes</>
      ) : selected === 3 ? (
        <>has {voteCount.fourth} votes</>
      ) : selected === 4 ? (
        <>has {voteCount.fifth} votes</>
      ) : (
        <>has {voteCount.sixth} votes</>
      )}
      <br />
      <br />
      <Button onClick={voteHandler} text="vote" />
      &nbsp;
      <Button onClick={anecdoteHandler} text="next anecdotes" />
      <br />
      <br />
      {selected === 0 ? (
        <h3>No vote yet</h3>
      ) : (
        <>
          <h3>Anecdote with most votes</h3>
          {props.anecdotes[getHighVote(voteCount)]} <br />
          <>has {getMaxVote(voteCount)} votes</>
        </>
      )}
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
