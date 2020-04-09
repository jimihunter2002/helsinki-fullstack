import React, { useState } from 'react';
import Country from './Country';

const Button = ({ onClickHandler }) => {
  return (
    <>
      <input type='button' value='show' onClick={onClickHandler} />
    </>
  );
};

const ShowButton = ({ country }) => {
  const [isClicked, setIsClicked] = useState(false);

  const onClickHandler = () => {
    isClicked ? setIsClicked(!isClicked) : setIsClicked(!isClicked);
  };

  if (isClicked) {
    return (
      <>
        <Country countryInfo={country} />,
        <Button onClickHandler={onClickHandler} />
        <br />
      </>
    );
  } else {
    return (
      <>
        {country.name}
        <Button onClickHandler={onClickHandler} />
        <br />
      </>
    );
  }
};

export default ShowButton;
