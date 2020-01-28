import React from 'react';

const Total = ({ parts }) => {
  const total = parts.reduce((prev, curr) => {
    return prev + curr.exercises;
  }, 0);

  return (
    <>
      <strong>total of {total} exercises</strong>
    </>
  );
};

export default Total;
