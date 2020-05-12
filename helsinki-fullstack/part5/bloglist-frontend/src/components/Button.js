import React from 'react';

const Button = ({ action, onClick, id }) => {
  return (
    <>
      <input
        id={id}
        type='button'
        value={action}
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      />
    </>
  );
};

export default Button;
