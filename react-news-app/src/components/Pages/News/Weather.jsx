import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import Input from "../../Common/Input";

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [localTime, setLocalTime] = useState("");
  const [shouldRefocus, setShouldRefocus] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // Fetch default location
  useEffect(() => {
    const fetchDefaultLocation = async () => {
      const defaultLocation = "St Louis";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Imperial&appid=de0af54d43123c94f77d29e171071ec0`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const weatherData = await response.json();
        setData(weatherData);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchDefaultLocation();
  }, []);

  // Live clock
  useEffect(() => {
    if (!data.timezone) return;

    const updateClock = () => {
      const localDate = new Date(Date.now() + data.timezone * 1000);
      let hours = localDate.getUTCHours();
      const minutes = localDate.getUTCMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;

      setLocalTime(`${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [data.timezone]);

  const handleInputChange = (e) => setLocation(e.target.value);

  // SEARCH
  const search = async () => {
    if (!location.trim()) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Imperial&appid=de0af54d43123c94f77d29e171071ec0`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        setData({ notFound: true });
        setLocation("");
        setShouldRefocus(true); // ensures cursor returns
      } else {
        const weatherData = await response.json();
        setData(weatherData);
        setLocation("");
        setShouldRefocus(true); // ensures cursor returns
      }
    } catch (error) {
      console.error("Search error:", error);
      setData({ notFound: true });
      setShouldRefocus(true);
    }
  };

  // After rerender → focus the input
  useEffect(() => {
    if (shouldRefocus && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 0);
      setShouldRefocus(false);
    }
  }, [shouldRefocus]);

  const getWeatherIcon = (weatherMain, timezoneOffset) => {
    if (!weatherMain || !timezoneOffset) return <i className="bx bx-cloud"></i>;

    // Convert to consistent casing
    const type = weatherMain.toLowerCase();

    // Compute city local hour
    const localDate = new Date(Date.now() + timezoneOffset * 1000);
    const hour = localDate.getUTCHours();
    const isDay = hour >= 6 && hour < 18;

    if (type === "clear") {
      return isDay
        ? <i className="bx bxs-sun"></i>
        : <i className="bx bx-moon"></i>;
    }

    if (type === "clouds") {
      return <i className="bx bx-cloud"></i>;
    }

    if (type === "rain") {
      return <i className="bx bxs-cloud-rain"></i>;
    }

    if (type === "thunderstorm") {
      return <i className="bx bxs-cloud-lightning"></i>;
    }

    if (type === "snow") {
      return <i className="bx bxs-cloud-snow"></i>;
    }

    if (type === "mist" || type === "haze") {
      return <i className="bx bx-cloud"></i>;
    }

    return <i className="bx bx-cloud"></i>;
  };


  const weatherMain = data.weather ? data.weather[0].main.toLowerCase() : "";
  const isRain = weatherMain === "rain";

  return (
    <div className={`weather weather-${weatherMain}`}>
      <div className="city-time">{localTime}</div>

      {/* Search */}
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">{data.name}</div>
        </div>

        <div className="search-location">
          <Input
            name="location"
            type="text"
            placeholder="Enter Location"
            value={location}
            handleChange={handleInputChange}
            ref={inputRef}
          />
          <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
        </div>
      </div>

      {/* Rain animation */}
      {isRain && (
        <div className="rain">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="drop"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${0.5 + Math.random()}s`,
                height: `${50 + Math.random() * 20}px`,
                opacity: `${0.4 + Math.random() * 0.6}`
              }}
            ></div>
          ))}
        </div>
      )}

      {/* Weather Output */}
      {data.notFound ? (
        <div className="not-found">City Not Found 🙁</div>
      ) : (
        <div className="weather-data">
          {data.weather && getWeatherIcon(data.weather[0].main, data.timezone)}

          <div className="weather-type">{data.weather?.[0].main}</div>
          <div className="temp">{data.main && `${Math.floor(data.main.temp)}°`}</div>
        </div>
      )}
    </div>
  );
};

export default Weather;