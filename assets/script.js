var searchBtn = $(`#searchBtn`);


function search() {
    var city = document.getElementById(`searchText`).value;
    var geocode = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=ad2ab0eea4f63232dfe1a7f79251420d`;



    localStorage.setItem(`${city}`, city)



    fetch(geocode)

  .then(function (response) {
    return response.json();
  })

  .then(function (data) {
    var lat = data[0].lat;
    var lon = data[0].lon;
    var currentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ad2ab0eea4f63232dfe1a7f79251420d&units=imperial`;
    var fiveDay = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=ad2ab0eea4f63232dfe1a7f79251420d&units=imperial`;
    var saveItem = document.createElement(`p`);
    var saveValue = localStorage.getItem(`${city}`);
    var saveInfo = `${saveValue}`;
    var saveButton = document.createElement(`p`);
    var returnButton = `<button class="saveBtn">Return</button>`;
    var contain = document.createElement(`div`);
   
    $(saveItem).html(saveInfo);
    $(saveItem).attr(`class`, `saveCity`)
    $(saveButton).html(returnButton);
    $(contain).append(saveItem);
    $(contain).append(saveButton);
    $(`#searchResult`).append(contain); 

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
    var dayOneTimestamp = data.list[8].dt;
    var dayOneDate = new Date(dayOneTimestamp*1000).toLocaleDateString();
    var dayOneIcon = data.list[8].weather[0].icon;
    var dayOneIconURL = `http://openweathermap.org/img/w/${dayOneIcon}.png`;
    var dayOneTemp = data.list[8].main.temp;
    var dayOneWind = data.list[8].wind.speed;
    var dayOneHum = data.list[8].main.humidity;
    $(`#dayOneDate`).text(dayOneDate);
    $(`#dayOneIcon`).attr(`src`, dayOneIconURL);
    $(`#dayOneTemp`).text(`Temp: ${dayOneTemp} Farenheit`);
    $(`#dayOneWind`).text(`Wind Speed: ${dayOneWind} MPH`);
    $(`#dayOneHum`).text(`Humidity: ${dayOneHum}%`);
    var dayTwoTimestamp = data.list[16].dt;
    var dayTwoDate = new Date(dayTwoTimestamp*1000).toLocaleDateString();
    var dayTwoIcon = data.list[16].weather[0].icon;
    var dayTwoIconURL = `http://openweathermap.org/img/w/${dayTwoIcon}.png`;
    var dayTwoTemp = data.list[16].main.temp;
    var dayTwoWind = data.list[16].wind.speed;
    var dayTwoHum = data.list[16].main.humidity;
    $(`#dayTwoDate`).text(dayTwoDate);
    $(`#dayTwoIcon`).attr(`src`, dayTwoIconURL);
    $(`#dayTwoTemp`).text(`Temp: ${dayTwoTemp} Farenheit`);
    $(`#dayTwoWind`).text(`Wind Speed: ${dayTwoWind} MPH`);
    $(`#dayTwoHum`).text(`Humidity: ${dayTwoHum}%`);
    var dayThreeTimestamp = data.list[24].dt;
    var dayThreeDate = new Date(dayThreeTimestamp*1000).toLocaleDateString();
    var dayThreeIcon = data.list[24].weather[0].icon;
    var dayThreeIconURL = `http://openweathermap.org/img/w/${dayThreeIcon}.png`;
    var dayThreeTemp = data.list[24].main.temp;
    var dayThreeWind = data.list[24].wind.speed;
    var dayThreeHum = data.list[24].main.humidity;
    $(`#dayThreeDate`).text(dayThreeDate);
    $(`#dayThreeIcon`).attr(`src`, dayThreeIconURL);
    $(`#dayThreeTemp`).text(`Temp: ${dayThreeTemp} Farenheit`);
    $(`#dayThreeWind`).text(`Wind Speed: ${dayThreeWind} MPH`);
    $(`#dayThreeHum`).text(`Humidity: ${dayThreeHum}%`);
    var dayFourTimestamp = data.list[32].dt;
    var dayFourDate = new Date(dayFourTimestamp*1000).toLocaleDateString();
    var dayFourIcon = data.list[32].weather[0].icon;
    var dayFourIconURL = `http://openweathermap.org/img/w/${dayFourIcon}.png`;
    var dayFourTemp = data.list[32].main.temp;
    var dayFourWind = data.list[32].wind.speed;
    var dayFourHum = data.list[32].main.humidity;
    $(`#dayFourDate`).text(dayFourDate);
    $(`#dayFourIcon`).attr(`src`, dayFourIconURL);
    $(`#dayFourTemp`).text(`Temp: ${dayFourTemp} Farenheit`);
    $(`#dayFourWind`).text(`Wind Speed: ${dayFourWind} MPH`);
    $(`#dayFourHum`).text(`Humidity: ${dayFourHum}%`);
    var dayFiveTimestamp = data.list[39].dt;
    var dayFiveDate = new Date(dayFiveTimestamp*1000).toLocaleDateString();
    var dayFiveIcon = data.list[39].weather[0].icon;
    var dayFiveIconURL = `http://openweathermap.org/img/w/${dayFiveIcon}.png`;
    var dayFiveTemp = data.list[39].main.temp;
    var dayFiveWind = data.list[39].wind.speed;
    var dayFiveHum = data.list[39].main.humidity;
    $(`#dayFiveDate`).text(dayFiveDate);
    $(`#dayFiveIcon`).attr(`src`, dayFiveIconURL);
    $(`#dayFiveTemp`).text(`Temp: ${dayFiveTemp} Farenheit`);
    $(`#dayFiveWind`).text(`Wind Speed: ${dayFiveWind} MPH`);
    $(`#dayFiveHum`).text(`Humidity: ${dayFiveHum}%`);
    console.log(data);
  })

})
}

searchBtn.click(search);


$(document).on(`click`, `.saveBtn`, function() {
  var city = $(this).parent().parent().children(`.saveCity`).text();
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
     var dayOneTimestamp = data.list[8].dt;
     var dayOneDate = new Date(dayOneTimestamp*1000).toLocaleDateString();
     var dayOneIcon = data.list[8].weather[0].icon;
     var dayOneIconURL = `http://openweathermap.org/img/w/${dayOneIcon}.png`;
     var dayOneTemp = data.list[8].main.temp;
     var dayOneWind = data.list[8].wind.speed;
     var dayOneHum = data.list[8].main.humidity;
     $(`#dayOneDate`).text(dayOneDate);
     $(`#dayOneIcon`).attr(`src`, dayOneIconURL);
     $(`#dayOneTemp`).text(`Temp: ${dayOneTemp} Farenheit`);
     $(`#dayOneWind`).text(`Wind Speed: ${dayOneWind} MPH`);
     $(`#dayOneHum`).text(`Humidity: ${dayOneHum}%`);
     var dayTwoTimestamp = data.list[16].dt;
     var dayTwoDate = new Date(dayTwoTimestamp*1000).toLocaleDateString();
     var dayTwoIcon = data.list[16].weather[0].icon;
     var dayTwoIconURL = `http://openweathermap.org/img/w/${dayTwoIcon}.png`;
     var dayTwoTemp = data.list[16].main.temp;
     var dayTwoWind = data.list[16].wind.speed;
     var dayTwoHum = data.list[16].main.humidity;
     $(`#dayTwoDate`).text(dayTwoDate);
     $(`#dayTwoIcon`).attr(`src`, dayTwoIconURL);
     $(`#dayTwoTemp`).text(`Temp: ${dayTwoTemp} Farenheit`);
     $(`#dayTwoWind`).text(`Wind Speed: ${dayTwoWind} MPH`);
     $(`#dayTwoHum`).text(`Humidity: ${dayTwoHum}%`);
     var dayThreeTimestamp = data.list[24].dt;
     var dayThreeDate = new Date(dayThreeTimestamp*1000).toLocaleDateString();
     var dayThreeIcon = data.list[24].weather[0].icon;
     var dayThreeIconURL = `http://openweathermap.org/img/w/${dayThreeIcon}.png`;
     var dayThreeTemp = data.list[24].main.temp;
     var dayThreeWind = data.list[24].wind.speed;
     var dayThreeHum = data.list[24].main.humidity;
     $(`#dayThreeDate`).text(dayThreeDate);
     $(`#dayThreeIcon`).attr(`src`, dayThreeIconURL);
     $(`#dayThreeTemp`).text(`Temp: ${dayThreeTemp} Farenheit`);
     $(`#dayThreeWind`).text(`Wind Speed: ${dayThreeWind} MPH`);
     $(`#dayThreeHum`).text(`Humidity: ${dayThreeHum}%`);
     var dayFourTimestamp = data.list[32].dt;
     var dayFourDate = new Date(dayFourTimestamp*1000).toLocaleDateString();
     var dayFourIcon = data.list[32].weather[0].icon;
     var dayFourIconURL = `http://openweathermap.org/img/w/${dayFourIcon}.png`;
     var dayFourTemp = data.list[32].main.temp;
     var dayFourWind = data.list[32].wind.speed;
     var dayFourHum = data.list[32].main.humidity;
     $(`#dayFourDate`).text(dayFourDate);
     $(`#dayFourIcon`).attr(`src`, dayFourIconURL);
     $(`#dayFourTemp`).text(`Temp: ${dayFourTemp} Farenheit`);
     $(`#dayFourWind`).text(`Wind Speed: ${dayFourWind} MPH`);
     $(`#dayFourHum`).text(`Humidity: ${dayFourHum}%`);
     var dayFiveTimestamp = data.list[39].dt;
     var dayFiveDate = new Date(dayFiveTimestamp*1000).toLocaleDateString();
     var dayFiveIcon = data.list[39].weather[0].icon;
     var dayFiveIconURL = `http://openweathermap.org/img/w/${dayFiveIcon}.png`;
     var dayFiveTemp = data.list[39].main.temp;
     var dayFiveWind = data.list[39].wind.speed;
     var dayFiveHum = data.list[39].main.humidity;
     $(`#dayFiveDate`).text(dayFiveDate);
     $(`#dayFiveIcon`).attr(`src`, dayFiveIconURL);
     $(`#dayFiveTemp`).text(`Temp: ${dayFiveTemp} Farenheit`);
     $(`#dayFiveWind`).text(`Wind Speed: ${dayFiveWind} MPH`);
     $(`#dayFiveHum`).text(`Humidity: ${dayFiveHum}%`);
     console.log(data);
   })
 
 })
})
