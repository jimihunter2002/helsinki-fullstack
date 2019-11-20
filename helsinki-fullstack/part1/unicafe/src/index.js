import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = props => {
  return (
    <div>
      <p>
        {props.text} {props.value}
      </p>
    </div>
  );
};

const Button = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [allFeedback, setAllFeedback] = useState([]);

  const goodHandler = () => {
    setAllFeedback(allFeedback.concat('G'));
    setGood(good + 1);
  };

  const badHandler = () => {
    setAllFeedback(allFeedback.concat('B'));
    setBad(bad + 1);
  };

  const neutralHandler = () => {
    setAllFeedback(allFeedback.concat('N'));
    setNeutral(neutral + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <br />
      <Button onClick={goodHandler} text="good" />
      <Button onClick={neutralHandler} text="neutral" />
      <Button onClick={badHandler} text="bad" />
      <br />
      <h2>statistics</h2>

      {allFeedback.length === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <td>
                <Statistics text="good" value={good} />
              </td>
            </tr>
            <tr>
              <td>
                <Statistics text="neutral" value={neutral} />
              </td>
            </tr>
            <tr>
              <td>
                <Statistics text="bad" value={bad} />
              </td>
            </tr>
            <tr>
              <td>
                <Statistics text="all" value={allFeedback.length} />
              </td>
            </tr>
            <tr>
              <td>
                <Statistics text="average" value={allFeedback.length / 3} />
              </td>
            </tr>
            <tr>
              <td>
                <Statistics text="positive" value={(good / allFeedback.length) * 100 + ' %'} />
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
