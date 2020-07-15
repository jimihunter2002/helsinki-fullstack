import React from 'react';

const SubmitButton = ({ action, actionHandler, id }) => {
  return (
    <div>
      <button
        id={id}
        type='submit'
        style={{ cursor: 'pointer' }}
        onClick={actionHandler}>
        {action}
      </button>
    </div>
  );
};

export default SubmitButton;
