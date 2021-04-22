
import React, { useState } from 'react';

function App() {

  const api = {
    key: "9f85007a43e2d3ea72b4161dfd41e34c",
    base: "http://api.openweathermap.org/data/2.5/"
  }

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});




  const search = e => {
    if (e.key === 'Enter') {
      fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setCity('');
          setWeather(result);
          console.log(result)
        })
        .catch(error => {
          console.log(error);
          setWeather('');
        })
    }
  }


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }



  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>

      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Wyszukaj..."
            onChange={e => setCity(e.target.value)}
            value={city}
            onKeyPress={search}
          />
        </div>

        {(typeof weather.main != "undefined") ? (
          <div>

            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>

  );
}

export default App;
