import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useField = type => {
  const [value, setValue] = useState('');

  const onChange = event => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = name => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    console.log(name, 'NAME');
    console.log(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`);
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then(response => {
        if (response.status === 200) {
          setCountry(response.data[0]);
        } else {
        }
      })
      .catch(error => {
        console.log(error.response);
        setCountry(error.response.data.message);
      });
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  console.log('KOLO', country);
  if (!country) {
    return null;
  }

  if (country === 'Not Found') {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img src={country.flag} height='100' alt={`flag of ${country.name}`} />
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  console.log(country, 'COUNTRY', Object.prototype.toString.call(country));

  const fetch = e => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;