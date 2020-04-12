import React from 'react';

const PersonForm = ({ handler }) => {
  return (
    <>
      <form onSubmit={handler.addName}>
        <div>
          name:{' '}
          <input
            type='text'
            onChange={handler.handleChangeName}
            value={handler.newName}
            placeholder='Bobby Benson'
            required
          />
        </div>
        <div>
          number:{' '}
          <input
            type='tel'
            onChange={handler.handleChangePhone}
            value={handler.newPhone}
            required
            pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
            placeholder='079-532-6745'
          />
        </div>
        <div>
          <button
            type='submit'
            style={{ backgroundColor: handler.addBtnColor }}>
            add
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
