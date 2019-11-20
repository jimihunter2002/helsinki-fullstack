import React from 'react';

const Content = ({ parts }) => {
  const [part1, part2, part3] = parts;
  return (
    <>
      <Part name={part1.name} exercise={part1.exercises} />
      <Part name={part2.name} exercise={part2.exercises} />
      <Part name={part3.name} exercise={part3.exercises} />
    </>
  );
};

const Part = props => {
  return (
    <p>
      {props.name} {props.exercise}
    </p>
  );
};

export default Content;
