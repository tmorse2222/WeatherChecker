var searchBtn = $(`#searchBtn`);


function search() {
    var city = document.getElementById(`searchText`).value;
    var geocode = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=ad2ab0eea4f63232dfe1a7f79251420d`
    fetch(geocode)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var lat = data[0].lat;
    var lon = data[0].lon;
    var currentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ad2ab0eea4f63232dfe1a7f79251420d&units=imperial`
   fetch(currentWeather)
   .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var currentCity = data.name;
    var timestamp = data.dt;
    var currentDate = new Date(timestamp*1000).toDateString();
    var currentIcon = data.weather[0].icon;
    var currentIconURL = `http://openweathermap.org/img/w/${currentIcon}.png`;
    var currentTemp = data.main.temp;
    var currentWind = data.wind.speed;
    var currentHum = data.main.humidity;
    document.getElementById(`currentCity`).innerText = currentCity;
    document.getElementById(`currentDay`).innerText = currentDate;
    $(`#currentIcon`).attr(`src`, currentIconURL);
    $(`#currentTemp`).text(`Temp: ${currentTemp} Farenheit`);
    $(`#currentWind`).text(`Wind Speed: ${currentWind} MPH`);
    $(`#currentHum`).text(`Humidity: ${currentHum}%`);
    console.log(data);
  })
  })
};

searchBtn.click(search);