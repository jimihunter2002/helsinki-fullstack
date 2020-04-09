import React, { useState } from 'react';

const Button = ({ onClickHandler, bgColor }) => {
  return (
    <>
      <input
        type='button'
        value='delete'
        onClick={onClickHandler}
        style={{ backgroundColor: bgColor }}
      />
    </>
  );
};

const DeleteButton = ({ person, handler }) => {
  const [bgColor, setBgColor] = useState('');

  const onClickHandler = event => {
    setBgColor('#429bf5');
    setTimeout(() => {
      let result = window.confirm(`Delete ${person.name}`);
      if (result) {
        handler.onDeleteHandler(person);
      } else {
        setBgColor('');
      }
    }, 0);
  };

  return (
    <>
      <Button onClickHandler={onClickHandler} bgColor={bgColor} />
      <br />
    </>
  );
};

export default DeleteButton;
