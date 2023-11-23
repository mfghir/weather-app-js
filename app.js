const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "d9502ccdd1c6c06cece95738e3ea1416";
const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");

const locationIcon = document.getElementById("location");
const forecastContainer = document.getElementById("forecast");

const getCurrentWeatherByName = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();

  return json;
};

const getCurrentWeatherByCoordinates = async (lat, lon) => {
  const url = `${BASE_URL}/weather?q=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();

  return json;
};

const getForecastWeatherByName = async (city) => {
  const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();

  return json;
};

const getForecastWeatherByCoordinates = async (lat, lon) => {
  const url = `${BASE_URL}/forecast?q=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();

  return json;
};

const renderCurrentWeather = (data) => {
  const weatherJSX = `
        <h1>${data.name}, ${data.sys.country}</h1>
        <div id="main">
            <img src="https://openweathermap.org/img/w/${
              data.weather[0].icon
            }.png" alt="weather icon" />
            <span>${data.weather[0].main}</span>
            <p>${Math.round(data.main.temp)} C</p>
        </div>

        <div id="info">
            <p>Humidity: <span>${data.main.humidity} %</span></p>
            <p>Wind Speed: <span>${data.wind.speed} m/s </span></p>
        </div>
    `;

  weatherContainer.innerHTML = weatherJSX;
};

const getWeekDay = (date) => {
  return DAYS[new Date(date * 1000).getDay()];
};

const renderForecastWeather = (data) => {
  forecastContainer.innerHTML = "";

  data = data.list.filter((obj) => obj.dt_txt.endWidth("12:00:00"));
  data.forEach((i) => {
    const forecastJSX = `
    <div>
      <img src="https://openweathermap.org/img/w/${
        i.weather[0].icon
      }.png" alt="weather icon" />
      <h3>${getWeekDay(i.dt)}</h3>
      <p>${Math.round(i.main.temp)} C</p>
      <span>${i.weather[0].main}</span>
    </div>
    `;

    forecastContainer.innerHTML += forecastJSX;
  });
};

const searchHandler = async () => {
  const cityName = searchInput.value;
  if (!cityName) {
    alert("enter city name");
  }

  const currentData = await getCurrentWeatherByName(cityName);
  renderCurrentWeather(currentData);

  const forecastData = await getForecastWeatherByName(cityName);
  renderForecastWeather(forecastData);
};

const positionCallback = async (position) => {
  const { latitude, longitude } = position.coords;
  const currentData = await getCurrentWeatherByCoordinates(latitude, longitude);
  renderCurrentWeather(currentData);

  const forecastData = getForecastWeatherByCoordinates(latitude, longitude);
  renderForecastWeather(forecastData)
};

const errorCallback = (error) => {
  console.log(error.message);
};

const locationHandler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
  } else {
    alert("your browser does not support geolocation");
  }
};

searchButton.addEventListener("click", searchHandler);
location.addEventListener("click", locationHandler);
