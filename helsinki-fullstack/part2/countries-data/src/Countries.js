import React from 'react';

import ShowButton from './ShowButton';

const Countries = ({ listOfCountriesToShow }) => {
  return (
    <div>
      {listOfCountriesToShow.map(
        (country) => (
          (<span>{country.name}</span>),
          (<ShowButton key={country.numericCode} country={country} />)
        ),
      )}
    </div>
  );
};

export default Countries;
