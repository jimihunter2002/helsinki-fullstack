import React from 'react';
import Person from './Person';

const Persons = ({ listOfPeopleToShow, handler }) => {
  return (
    <>
      {listOfPeopleToShow.map(person => (
        <Person key={person.id} person={person} handler={handler} />
      ))}
    </>
  );
};

export default Persons;
