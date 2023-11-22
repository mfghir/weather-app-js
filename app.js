const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "d9502ccdd1c6c06cece95738e3ea1416";

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");

const getCurrentWeatherByName = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
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

const searchHandler = async () => {
  const cityName = searchInput.value;
  if (!cityName) {
    alert("enter city name");
  }

  const currentData = await getCurrentWeatherByName(cityName);
  renderCurrentWeather(currentData);
};

searchButton.addEventListener("click", searchHandler);
