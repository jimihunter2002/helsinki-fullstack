import React from 'react';

const WeatherInfo = ({ weatherInfo }) => {
  const { temperature, windSpeed, windDirection, imageUrl } = weatherInfo;

  return (
    <div>
      <span>
        <strong>temperature:</strong> {temperature} Celcius
      </span>
      <br />
      <img src={imageUrl} alt='Weather icon' height='100' width='100' />
      <br />
      <span>
        <strong>wind</strong>: {windSpeed} mph direction {windDirection}
      </span>
    </div>
  );
};

export default WeatherInfo;
