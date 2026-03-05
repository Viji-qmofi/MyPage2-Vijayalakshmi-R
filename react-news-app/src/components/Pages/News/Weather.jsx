import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import Input from "../../Common/Input";
import api from "../../../api/axios";

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [localTime, setLocalTime] = useState("");
  const [history, setHistory] = useState([]);
  const [shouldRefocus, setShouldRefocus] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // Load weather on start
  useEffect(() => {
    loadWeather();
    loadHistory();
  }, []);

  const loadWeather = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = token
        ? await api.get("/weather/me")
        : await api.get("/weather");

      setData(response.data);
    } catch (error) {
      console.error("Weather load failed", error);
    }
  };

  const loadHistory = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await api.get("/weather/history");
      setHistory(response.data.data);
      console.log("History response:", response.data);
    } catch (error) {
      console.error("History load failed", error);
    }
  };

  const fetchWeatherByCity = async (city) => {
    try {
      const response = await api.get(`/weather?city=${city}`);
      setData(response.data);
      loadHistory();
    } catch (error) {
      console.error("Search failed", error);
      setData({ error: "City Not Found" });
    }
  };


  const search = async () => {
    if (!location.trim()) return;

    await fetchWeatherByCity(location);

    setLocation("");
    setShouldRefocus(true);
  };

    const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  const handleInputChange = (e) => setLocation(e.target.value);

  // Delete history item
  const deleteHistory = async (id) => {
    try {
      await api.delete(`/weather/history/${id}`);
      loadHistory();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // Clear all history
  const clearHistory = async () => {
    try {
      await api.delete("/weather/history");
      setHistory([]);
    } catch (error) {
      console.error("Clear history failed", error);
    }
  };

  // Refocus after search
  useEffect(() => {
    if (shouldRefocus && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 0);
      setShouldRefocus(false);
    }
  }, [shouldRefocus]);

  // Local time calculation
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

  const getWeatherIcon = (desc) => {
    if (!desc) return <i className="bx bx-cloud"></i>;

    const type = desc.toLowerCase();

    if (type.includes("clear")) return <i className="bx bxs-sun"></i>;
    if (type.includes("cloud")) return <i className="bx bx-cloud"></i>;
    if (type.includes("rain")) return <i className="bx bxs-cloud-rain"></i>;
    if (type.includes("snow")) return <i className="bx bxs-cloud-snow"></i>;
    if (type.includes("storm")) return <i className="bx bxs-cloud-lightning"></i>;

    return <i className="bx bx-cloud"></i>;
  };

  const weatherMain = data.description
    ? data.description.toLowerCase()
    : "";

  const isRain = weatherMain.includes("rain");

  return (
    <div className={`weather weather-${weatherMain}`}>
      <div className="city-time">{localTime}</div>

      {/* Search */}
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">{data.city}</div>
        </div>

        <div className="search-location">
          <Input
            name="location"
            type="text"
            placeholder="Enter Location"
            value={location}
            handleChange={handleInputChange}
            onKeyDown={handleKeyPress}
            ref={inputRef}
          />

          <i
            className="fa-solid fa-magnifying-glass"
            onClick={search}
          ></i>
        </div>
      </div>

      {/* Rain Animation */}
      {isRain && (
        <div className="rain">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="drop"></div>
          ))}
        </div>
      )}

      {/* Weather Display */}
      {data.error ? (
        <div className="not-found">{data.error}</div>
      ) : (
        <div className="weather-data">
          {getWeatherIcon(data.description)}

          <div className="weather-type">{data.description}</div>

          <div className="temp">
            {data.temp && `${Math.floor(data.temp)}°`}
          </div>
        </div>
      )}

      {/* HISTORY */}
      {history.length > 0 && (
        <div className="weather-history">
          <div className="history-scroll">
          <div className="history-header">
            <span>Recent</span>
            <button onClick={clearHistory}>Clear</button>
          </div>

          <ul>
            {history.map((item) => (
              <li key={item.id}>
                <span
                  className="history-city"
                  onClick={() => fetchWeatherByCity(item.city)}
                >
                  {item.city}
                </span>

                <button
                  className="history-delete"
                  onClick={() => deleteHistory(item.id)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
        </div>
      )}
    </div>
  );
};

export default Weather;