import React, { useState } from 'react';

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.phone}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' },
  ]);

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchString, setSearchString] = useState('');

  const addName = event => {
    event.preventDefault();
    let nameObj = { name: newName, phone: newPhone };
    persons.some(entry => entry.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(nameObj));
    setNewName('');
    setNewPhone('');
  };
  const handleChangeName = event => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleChangePhone = event => {
    console.log(event.target.value);
    setNewPhone(event.target.value);
  };

  const handleSearch = event => {
    setSearchString(event.target.value);

    const result = persons.filter(person =>
      person.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()),
    );
    setPersons(result);
    //debugger;

    //setSearchString('');
  };

  const rows = () => persons.map(person => <Person key={person.name} person={person} />);

  return (
    <div>
      <h2>Phonebook</h2>
      <br />
      <div>
        filter shown with <input value={searchString} onChange={handleSearch} id="olu" />
      </div>
      <br />
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleChangeName} value={newName} />
        </div>
        <div>
          number: <input onChange={handleChangePhone} value={newPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <br />
      <br />
      {rows()}
    </div>
  );
};

export default App;
