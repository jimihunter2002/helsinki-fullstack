import React from 'react';

const Content = ({ parts }) => {
  {
    /*const rows = () =>
    parts.map(courseInfo => (
      <Part key={courseInfo.id} name={courseInfo.name} exercise={courseInfo.exercises} />
    )); */
  }

  {
    /*const rows = () => {
    return parts.map(courseInfo => {
      return <Part key={courseInfo.id} name={courseInfo.name} exercise={courseInfo.exercises} />;
    });
  }; */
  }

  return (
    <>
      {parts.map(course => (
        <div key={course.id}>
          <Part name={course.name} exercise={course.exercises} />
        </div>
      ))}
    </>
  );

  {
    /*return <>{rows()}</>; */
  }
};

const Part = props => {
  return (
    <p>
      {props.name} {props.exercise}
    </p>
  );
};

export default Content;
