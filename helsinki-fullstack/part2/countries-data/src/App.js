import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterCountry from './FilterCountry';
import Country from './Country';
import Countries from './Countries';

const App = () => {
  const [searchString, setSearchString] = useState('');
  const [showCountries, setShowCountries] = useState([]);

  const handler = e => {
    setSearchString(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_COUNTRIES_ENDPOINT}/all`)
      .then(response => {
        setShowCountries(response.data);
      });
  }, []);

  const listOfCountriesToShow = !searchString
    ? []
    : showCountries.filter(country =>
        country.name
          .substring(0, 10)
          .toLocaleLowerCase()
          .includes(searchString.toLocaleLowerCase()),
      );

  return (
    <div>
      <FilterCountry searchString={searchString} handler={handler} />
      {listOfCountriesToShow.length <=
      0 ? null : listOfCountriesToShow.length === 1 ? (
        <Country countryInfo={listOfCountriesToShow[0]} />
      ) : listOfCountriesToShow.length > 1 &&
        listOfCountriesToShow.length < 10 ? (
        <Countries listOfCountriesToShow={listOfCountriesToShow} />
      ) : (
        <p>
          Too many matches, specify another filter:
          {listOfCountriesToShow.length}{' '}
        </p>
      )}
    </div>
  );
};

export default App;
