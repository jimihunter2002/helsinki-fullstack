import React from 'react';
import DeleteButton from './DeleteButton';

const Person = ({ person, handler }) => {
  return (
    <>
      {person.name} {person.phone}
      <DeleteButton person={person} handler={handler} />
      <br />
    </>
  );
};

export default Person;
