import React from 'react';

const FilterCountry = ({ searchString, handler }) => (
  <div>
    find countries
    <input type="text" value={searchString} onChange={handler} />
  </div>
);

export default FilterCountry;
