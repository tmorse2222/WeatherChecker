var searchBtn = $(`#searchBtn`);


function search() {
    var city = document.getElementById(`searchText`).value;
    var geocode = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=ad2ab0eea4f63232dfe1a7f79251420d`;

    fetch(geocode)

  .then(function (response) {
    return response.json();
  })

  .then(function (data) {
    var lat = data[0].lat;
    var lon = data[0].lon;
    var currentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ad2ab0eea4f63232dfe1a7f79251420d&units=imperial`;
    var fiveDay = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=ad2ab0eea4f63232dfe1a7f79251420d&units=imperial`;

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

  $.ajax({
   type: 'GET',
   dataType: 'json',
   beforeSend: function(request) {
     request.setRequestHeader('x-access-token', '2ae3f2bc6ca536ab47458a615379de56');
   },
   url: `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`,
   success: function(response) {
    var uvIndex = response.result.uv;
    $(`#uvIndex`).text(`UV Index: ${uvIndex}`);
   },
  });

  fetch(fiveDay)

  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var futureTimestamp = data.list[5].dt;
    var futureDate = new Date(futureTimestamp*1000).toLocaleDateString();
    var dayOneIcon = data.list[5].weather[0].icon;
    var dayOneIconURL = `http://openweathermap.org/img/w/${dayOneIcon}.png`;
    var dayOneTemp = data.list[5].main.temp;
    var dayOneWind = data.list[5].wind.speed;
    var dayOneHum = data.list[5].main.humidity;
    $(`#dayOneDate`).text(futureDate);
    $(`#dayOneIcon`).attr(`src`, dayOneIconURL);
    $(`#dayOneTemp`).text(`Temp: ${dayOneTemp} Farenheit`);
    $(`#dayOneWind`).text(`Wind Speed: ${dayOneWind} MPH`);
    $(`#dayOneHum`).text(`Humidity: ${dayOneHum}%`);
    console.log(data);
  })

})
}

searchBtn.click(search);