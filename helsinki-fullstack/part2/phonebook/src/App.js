import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import personService from './service/personService';
import ErrorNotification from './ErrorNotification';
import SuccessNotification from './SuccessNotification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchString, setSearchString] = useState('');
  const [addBtnColor, setAddBtnColor] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(peopleResponse => {
        setPersons(peopleResponse);
      })
      .catch(error => console.dir(error));
  }, []);

  const addName = event => {
    event.preventDefault();
    setAddBtnColor('#429bf5');
    let nameObj = { name: newName, phone: newPhone };

    const filteredContact = filterItems(persons, nameObj.name);
    if (filteredContact.length === 0) {
      setTimeout(() => {
        personService
          .create(nameObj)
          .then(personResponse => {
            setPersons(persons.concat(personResponse));
            setAddBtnColor('');
            setNewName('');
            setNewPhone('');
            setSuccessMessage(`${nameObj.name} added to Phonebook`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch(err => {
            setErrorMessage(
              `Cannot add ${nameObj.name} to Phonebook try again later`,
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }, 0);
    } else {
      const [contactInfo] = filteredContact;
      if (contactInfo.phone === nameObj.phone) {
        setTimeout(() => {
          let result = window.confirm(
            `${contactInfo.name} is already added to phonebook, replace the old number with a new one`,
          );
          if (result) {
            //setNewName('');
            setNewPhone('');
            setAddBtnColor('');
          } else {
            setNewName(nameObj.name);
            setNewPhone(nameObj.phone);
            setAddBtnColor('');
          }
        }, 0);
      } else {
        //update the contact
        const updatedContact = { ...contactInfo, phone: nameObj.phone };
        setTimeout(() => {
          personService
            .update(contactInfo.id, updatedContact)
            .then(response => {
              setSuccessMessage(
                `${nameObj.name} contact information updated successfully in Phonebook`,
              );
              setTimeout(() => {
                setSuccessMessage(null);
              }, 5000);
              setPersons(
                persons.map(people =>
                  people.id !== contactInfo.id ? people : response,
                ),
              );
              setNewName('');
              setNewPhone('');
              setAddBtnColor('');
            })
            .catch(err => {
              setErrorMessage(
                `${nameObj.name} contact information cannot be updated now try again later`,
              );
              setTimeout(() => {
                setErrorMessage(null);
              }, 4000);
            });
        }, 0);
      }
    }
  };

  //for filtering array
  const filterItems = (arr, query) => {
    return arr.filter(el => el.name.toLowerCase() === query.toLowerCase());
  };

  const onDeleteHandler = person => {
    personService
      .deletePerson(person.id)
      .then(response => {
        setSuccessMessage(`${person.name} removed successfully from Phonebook`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
        personService.getAll().then(response => setPersons(response));
      })
      .catch(err => {
        setErrorMessage(
          `Cannot delete ${person.name} from Phonebook try again later`,
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const handleChangeName = event => {
    let inputName = event.target.value;
    inputName = inputName
      .split(' ')
      .filter(input => input)
      .join(' ');
    setNewName(inputName);
  };

  const handleChangePhone = event => {
    setNewPhone(event.target.value);
  };

  const handleSearch = event => {
    setSearchString(event.target.value);
  };

  const listOfPeopleToShow = !searchString
    ? persons
    : persons.filter(item =>
        item.name
          .toLocaleLowerCase()
          .includes(searchString.toLocaleLowerCase()),
      );

  const handler = {
    newName,
    newPhone,
    addBtnColor,
    handleChangeName,
    handleChangePhone,
    addName,
    onDeleteHandler,
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <br />
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter value={searchString} onChange={handleSearch} />
      <br />
      <h2>Add a new</h2>
      <PersonForm handler={handler} />
      <h2>Numbers</h2>
      <Persons listOfPeopleToShow={listOfPeopleToShow} handler={handler} />
    </div>
  );
};

export default App;
