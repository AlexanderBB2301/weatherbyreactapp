import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getWeatherAction } from "./redux/slices/weatherSlices";

function App() {
  const dispatch = useDispatch();
  const [city, setCity] = useState("Liverpool");

  useEffect(() => {
    dispatch(getWeatherAction("Liverpool"));
  }, [dispatch]);

  const state = useSelector((state) => state);
  const { error, loading, weather } = state;

  return (
    <div className="App">
      <div className="searchContainer">
        <input
          placeholder="Enter City Name"
          name="searchBar"
          id="searchBar"
          value={city}
          onInput={(e) => setCity(e.target.value)}
        />
        <button
          className="searchBtn"
          onClick={() => dispatch(getWeatherAction(city))}
        >
          Search
        </button>
      </div>

      <div className="weatherInfoContainer">
        <div className="temp">
          <p className="tempText">
            Temp: {(weather?.main.temp - 273.15).toFixed(1)} &#8451;
          </p>
        </div>
        <div className="city">
          <p className="cityText">{weather?.name}</p>
        </div>
        <div className="description">
          <img
            alt="weatherIcon"
            src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
          />
          <p>
            {weather?.weather[0].main}: {weather?.weather[0].description}
          </p>
        </div>

        <div className="feelsLike">
          <p className="feelsLikeText">
            Feels Like: {(weather?.main.feels_like - 273.15).toFixed(1)} &#8451;
          </p>
        </div>
        <div className="humidity">
          <p className="humidityText">Humidity: {weather?.main.humidity}%</p>
        </div>
        <div className="windSpeed">
          <p className="windSpeedText">
            Wind Speed: {(weather?.wind.speed).toFixed(1)} mph
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
