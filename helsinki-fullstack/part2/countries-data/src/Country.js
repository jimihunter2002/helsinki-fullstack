import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherInfo from './WeatherInfo';

const Country = ({ countryInfo }) => {
  const { languages } = countryInfo;
  const [weatherData, setWeatherData] = useState({
    temperature: '',
    windSpeed: '',
    windDirection: '',
    imageUrl: '',
  });

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_WEATHER_ENDPOINT}/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${countryInfo.capital}`,
      )
      .then(response => {
        setWeatherData({
          temperature: response.data.current.temperature,
          windSpeed: response.data.current.wind_speed,
          windDirection: response.data.current.wind_dir,
          imageUrl: response.data.current.weather_icons[0],
        });
      });
  }, []);

  return (
    <div>
      <h3>{countryInfo.name}</h3>
      capital {countryInfo.capital}
      <br />
      population {countryInfo.population}
      <br />
      <h4>Languages</h4>
      {languages.map(language => (
        <li key={language.name}>{language.name}</li>
      ))}
      <br />
      <img
        src={countryInfo.flag}
        alt='country flag not loaded'
        height='100'
        width='100'
      />
      <h3>Weather in {countryInfo.capital}</h3>
      <WeatherInfo weatherInfo={weatherData} />
    </div>
  );
};

export default Country;
