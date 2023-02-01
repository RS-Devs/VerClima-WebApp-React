import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import imgmain from "./assets/img-main.webp";



const API_KEY = "86366609b4d92670c9adc53e788ade5b";

function WeatherApp() {
  const [weatherData, setWeatherData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&lang=es&units=metric`
    );
    setWeatherData(result.data);
    setCurrentDate(new Date(result.data.dt * 1000));
    setCity("");
    setCountry("");
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="weather-app">
      <img src={imgmain} alt="Main Logo" className="main-logo"/>
      <h1 className="weather-app-title">App del Clima</h1>
      <h3 className="weather-app-subtitle">created by RS-DEVS</h3>
      <form className="weather-app-form" onSubmit={handleSubmit}>
        <input
          className="weather-app-form-input"
          type="text"
          placeholder="País"
          value={capitalizeFirstLetter(country)}
          onChange={(e) => setCountry(e.target.value)}
        />

        <input
          className="weather-app-form-input"
          type="text"
          placeholder="Ciudad"
          value={capitalizeFirstLetter(city)}
          onChange={(e) => setCity(e.target.value)}
        />

        <button className="weather-app-form-button" type="submit">
          Obtener Clima
        </button>
      </form>
      {weatherData.main && (
        <div className="weather-app-results">
          <h2 className="weather-app-results-title">
            <u>Resultados</u>
          </h2>

          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
            className="weather-app-results-item clim-icon"
          />

          <p className="weather-app-results-item temp">
            Temperatura: {weatherData.main.temp.toFixed(2)}°C
          </p>

          <p className="weather-app-results-item temp-min">
            Temperatura mínima: {weatherData.main.temp_min.toFixed(2)}°C
          </p>

          <p className="weather-app-results-item temp-max">
            Temperatura máxima: {weatherData.main.temp_max.toFixed(2)}°C
          </p>

          <p className="weather-app-results-item hum">
            Humedad: {weatherData.main.humidity}%
          </p>

          <p className="weather-app-results-item clim">
            Condición climática: {weatherData.weather[0].description}
          </p>

          <p className="weather-app-results-item wind">
            Velocidad del viento: {weatherData.wind.speed} km/h
          </p>

          <p className="weather-app-results-item sunrise">
            Amanecer:{" "}
            {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
          </p>

          <p className="weather-app-results-item sunset">
            Atardecer:{" "}
            {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
          </p>

          <p className="weather-app-results-item date">
            Fecha y hora: {currentDate.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
