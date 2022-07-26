// Global variables
var searchBtn = $(`#searchBtn`);
// Declaring search function
function search() {
  // Local Variables
    var city = document.getElementById(`searchText`).value;
    // URL to geocode API 
    var geocode = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=ad2ab0eea4f63232dfe1a7f79251420d`;
// Saving typed content to local storage
    localStorage.setItem(`${city}`, city)
// Fetch method to retrieve weather data
    fetch(geocode)
// Function to parse response
  .then(function (response) {
    return response.json();
  })
// Function to run on data
  .then(function (data) {
    // Variables containing location lat and longitude
    var lat = data[0].lat;
    var lon = data[0].lon;
    // URLs for current weather and 5 day forcast APIs
    var currentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ad2ab0eea4f63232dfe1a7f79251420d&units=imperial`;
    var fiveDay = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=ad2ab0eea4f63232dfe1a7f79251420d&units=imperial`;
    // Variables to create search history items, apply attributes
    var saveItem = document.createElement(`p`);
    var saveValue = localStorage.getItem(`${city}`);
    var saveInfo = `${saveValue}`;
    var saveButton = document.createElement(`p`);
    var returnButton = `<button class="saveBtn">Return</button>`;
    var contain = document.createElement(`div`);
  //  Actions creating search history
    $(saveItem).html(saveInfo);
    $(saveItem).attr(`class`, `saveCity col-6`)
    $(saveButton).html(returnButton);
    $(saveButton).attr(`class`, `col-6`)
    $(contain).append(saveItem);
    $(contain).append(saveButton);
    $(`#searchResult`).append(contain); 
    $(contain).attr(`class`, `saveContain row`);
// fetch method to retrieve current weather data
   fetch(currentWeather)
// function to parse response
   .then(function (response) {
    return response.json();
  })
// Function to use current weather data
  .then(function (data) {
    // Varibales to retireve info
    var currentCity = data.name;
    var timestamp = data.dt;
    var currentDate = new Date(timestamp*1000).toDateString();
    var currentIcon = data.weather[0].icon;
    var currentTemp = data.main.temp;
    var currentWind = data.wind.speed;
    var currentHum = data.main.humidity;
        // URL for current weather img src
        var currentIconURL = `https://openweathermap.org/img/w/${currentIcon}.png`;
        // actions to show current weather info on screen
    document.getElementById(`currentCity`).innerText = currentCity;
    document.getElementById(`currentDay`).innerText = currentDate;
    $(`#currentIcon`).attr(`src`, currentIconURL);
    $(`#currentTemp`).text(`Temp: ${currentTemp} Farenheit`);
    $(`#currentWind`).text(`Wind Speed: ${currentWind} MPH`);
    $(`#currentHum`).text(`Humidity: ${currentHum}%`);
  })
// Ajax call to retireve UV index info
  $.ajax({
   type: 'GET',
   dataType: 'json',
   beforeSend: function(request) {
     request.setRequestHeader('x-access-token', '2ae3f2bc6ca536ab47458a615379de56');
   },
   url: `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`,
   success: function(response) {
    // Var to retireve data
    var uvIndex = response.result.uv;
    $(`#uvIndex`).text(`UV Index: ${uvIndex}`);
    // If function to check value and change alert class accordingly
    if (uvIndex < 3) {
      $(`#uvIndex`).attr(`class`, `success`)
    } else if (uvIndex < 6) {
      $(`#uvIndex`).attr(`class`, `warning`)
    } else {
      $(`#uvIndex`).attr(`class`, `danger`)
    };
   },
  });
// Method to fetch 5 day forcast data
  fetch(fiveDay)
// Function to parse data
  .then(function (response) {
    return response.json();
  })
  // Function to use 5 day data
  .then(function (data) {
    // Var for day 1 of 5
    var dayOneTimestamp = data.list[8].dt;
    var dayOneDate = new Date(dayOneTimestamp*1000).toLocaleDateString();
    var dayOneIcon = data.list[8].weather[0].icon;
    var dayOneIconURL = `https://openweathermap.org/img/w/${dayOneIcon}.png`;
    var dayOneTemp = data.list[8].main.temp;
    var dayOneWind = data.list[8].wind.speed;
    var dayOneHum = data.list[8].main.humidity;
    // Actions to display data
    $(`#dayOneDate`).text(dayOneDate);
    $(`#dayOneIcon`).attr(`src`, dayOneIconURL);
    $(`#dayOneTemp`).text(`Temp: ${dayOneTemp} Farenheit`);
    $(`#dayOneWind`).text(`Wind Speed: ${dayOneWind} MPH`);
    $(`#dayOneHum`).text(`Humidity: ${dayOneHum}%`);
    // Var for day 2 of 5
    var dayTwoTimestamp = data.list[16].dt;
    var dayTwoDate = new Date(dayTwoTimestamp*1000).toLocaleDateString();
    var dayTwoIcon = data.list[16].weather[0].icon;
    var dayTwoIconURL = `https://openweathermap.org/img/w/${dayTwoIcon}.png`;
    var dayTwoTemp = data.list[16].main.temp;
    var dayTwoWind = data.list[16].wind.speed;
    var dayTwoHum = data.list[16].main.humidity;
    // Actions to display data
    $(`#dayTwoDate`).text(dayTwoDate);
    $(`#dayTwoIcon`).attr(`src`, dayTwoIconURL);
    $(`#dayTwoTemp`).text(`Temp: ${dayTwoTemp} Farenheit`);
    $(`#dayTwoWind`).text(`Wind Speed: ${dayTwoWind} MPH`);
    $(`#dayTwoHum`).text(`Humidity: ${dayTwoHum}%`);
    // Var for day 3 of 5
    var dayThreeTimestamp = data.list[24].dt;
    var dayThreeDate = new Date(dayThreeTimestamp*1000).toLocaleDateString();
    var dayThreeIcon = data.list[24].weather[0].icon;
    var dayThreeIconURL = `https://openweathermap.org/img/w/${dayThreeIcon}.png`;
    var dayThreeTemp = data.list[24].main.temp;
    var dayThreeWind = data.list[24].wind.speed;
    var dayThreeHum = data.list[24].main.humidity;
    // Actions to display data
    $(`#dayThreeDate`).text(dayThreeDate);
    $(`#dayThreeIcon`).attr(`src`, dayThreeIconURL);
    $(`#dayThreeTemp`).text(`Temp: ${dayThreeTemp} Farenheit`);
    $(`#dayThreeWind`).text(`Wind Speed: ${dayThreeWind} MPH`);
    $(`#dayThreeHum`).text(`Humidity: ${dayThreeHum}%`);
    // Var for day 4 of 5
    var dayFourTimestamp = data.list[32].dt;
    var dayFourDate = new Date(dayFourTimestamp*1000).toLocaleDateString();
    var dayFourIcon = data.list[32].weather[0].icon;
    var dayFourIconURL = `https://openweathermap.org/img/w/${dayFourIcon}.png`;
    var dayFourTemp = data.list[32].main.temp;
    var dayFourWind = data.list[32].wind.speed;
    var dayFourHum = data.list[32].main.humidity;
    // Actions to display data
    $(`#dayFourDate`).text(dayFourDate);
    $(`#dayFourIcon`).attr(`src`, dayFourIconURL);
    $(`#dayFourTemp`).text(`Temp: ${dayFourTemp} Farenheit`);
    $(`#dayFourWind`).text(`Wind Speed: ${dayFourWind} MPH`);
    $(`#dayFourHum`).text(`Humidity: ${dayFourHum}%`);
    // Var for day 5
    var dayFiveTimestamp = data.list[39].dt;
    var dayFiveDate = new Date(dayFiveTimestamp*1000).toLocaleDateString();
    var dayFiveIcon = data.list[39].weather[0].icon;
    var dayFiveIconURL = `https://openweathermap.org/img/w/${dayFiveIcon}.png`;
    var dayFiveTemp = data.list[39].main.temp;
    var dayFiveWind = data.list[39].wind.speed;
    var dayFiveHum = data.list[39].main.humidity;
    // Actions to display data
    $(`#dayFiveDate`).text(dayFiveDate);
    $(`#dayFiveIcon`).attr(`src`, dayFiveIconURL);
    $(`#dayFiveTemp`).text(`Temp: ${dayFiveTemp} Farenheit`);
    $(`#dayFiveWind`).text(`Wind Speed: ${dayFiveWind} MPH`);
    $(`#dayFiveHum`).text(`Humidity: ${dayFiveHum}%`);
    // Action to display all elements on screen
    document.querySelector(`.weather`).style.display = `unset`;
  })
})
}
// Calls function when value is searched
searchBtn.click(search);
// Function for clicking "return" button in search history
$(document).on(`click`, `.saveBtn`, function() {
  // Retrieves value of clicked key
  var city = $(this).parent().parent().children(`.saveCity`).text();
  // URL for geocode API
  var geocode = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=ad2ab0eea4f63232dfe1a7f79251420d`;
// Fetch geocode data
  fetch(geocode)
// Function to parse data
  .then(function (response) {
    return response.json();
  })
// Function for data
  .then(function (data) {
    // Var for lat and lon of value
    var lat = data[0].lat;
    var lon = data[0].lon;
    // Links for current weather API and 5 day forcast API
    var currentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ad2ab0eea4f63232dfe1a7f79251420d&units=imperial`;
    var fiveDay = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=ad2ab0eea4f63232dfe1a7f79251420d&units=imperial`;
    // Method to fetch current weather data of selected value
    fetch(currentWeather)
// Method to parse data
    .then(function (response) {
     return response.json();
   })
//  Actions on data
   .then(function (data) {
    // Var for current city weather info
     var currentCity = data.name;
     var timestamp = data.dt;
     var currentDate = new Date(timestamp*1000).toDateString();
     var currentIcon = data.weather[0].icon;
     var currentIconURL = `https://openweathermap.org/img/w/${currentIcon}.png`;
     var currentTemp = data.main.temp;
     var currentWind = data.wind.speed;
     var currentHum = data.main.humidity;
    //  ACtions to display accurate info
     document.getElementById(`currentCity`).innerText = currentCity;
     document.getElementById(`currentDay`).innerText = currentDate;
     $(`#currentIcon`).attr(`src`, currentIconURL);
     $(`#currentTemp`).text(`Temp: ${currentTemp} Farenheit`);
     $(`#currentWind`).text(`Wind Speed: ${currentWind} MPH`);
     $(`#currentHum`).text(`Humidity: ${currentHum}%`);
   })
//  ajax method to return accurate UV info
   $.ajax({
    type: 'GET',
    dataType: 'json',
    beforeSend: function(request) {
      request.setRequestHeader('x-access-token', '2ae3f2bc6ca536ab47458a615379de56');
    },
    url: `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`,
    success: function(response) {
      // Var for UV response
     var uvIndex = response.result.uv;
    //  Action to display UV info
     $(`#uvIndex`).text(`UV Index: ${uvIndex}`);
    //  If function to assign correct class to UV index alert
     if (uvIndex < 3) {
      $(`#uvIndex`).attr(`class`, `success`)
    } else if (uvIndex < 6) {
      $(`#uvIndex`).attr(`class`, `warning`)
    } else {
      $(`#uvIndex`).attr(`class`, `danger`)
    };
    },
   });
//  Method to retrieve 5 day forcast
   fetch(fiveDay)
//  Method to parse data
   .then(function (response) {
     return response.json();
   })
  //  Function working with response
   .then(function (data) {
    // Var for day 1 of 5
     var dayOneTimestamp = data.list[8].dt;
     var dayOneDate = new Date(dayOneTimestamp*1000).toLocaleDateString();
     var dayOneIcon = data.list[8].weather[0].icon;
     var dayOneIconURL = `https://openweathermap.org/img/w/${dayOneIcon}.png`;
     var dayOneTemp = data.list[8].main.temp;
     var dayOneWind = data.list[8].wind.speed;
     var dayOneHum = data.list[8].main.humidity;
    //  Actions to display info
     $(`#dayOneDate`).text(dayOneDate);
     $(`#dayOneIcon`).attr(`src`, dayOneIconURL);
     $(`#dayOneTemp`).text(`Temp: ${dayOneTemp} Farenheit`);
     $(`#dayOneWind`).text(`Wind Speed: ${dayOneWind} MPH`);
     $(`#dayOneHum`).text(`Humidity: ${dayOneHum}%`);
    //  Var for day 2
     var dayTwoTimestamp = data.list[16].dt;
     var dayTwoDate = new Date(dayTwoTimestamp*1000).toLocaleDateString();
     var dayTwoIcon = data.list[16].weather[0].icon;
     var dayTwoIconURL = `https://openweathermap.org/img/w/${dayTwoIcon}.png`;
     var dayTwoTemp = data.list[16].main.temp;
     var dayTwoWind = data.list[16].wind.speed;
     var dayTwoHum = data.list[16].main.humidity;
    //  Actions to display data
     $(`#dayTwoDate`).text(dayTwoDate);
     $(`#dayTwoIcon`).attr(`src`, dayTwoIconURL);
     $(`#dayTwoTemp`).text(`Temp: ${dayTwoTemp} Farenheit`);
     $(`#dayTwoWind`).text(`Wind Speed: ${dayTwoWind} MPH`);
     $(`#dayTwoHum`).text(`Humidity: ${dayTwoHum}%`);
    //  Var for day 3
     var dayThreeTimestamp = data.list[24].dt;
     var dayThreeDate = new Date(dayThreeTimestamp*1000).toLocaleDateString();
     var dayThreeIcon = data.list[24].weather[0].icon;
     var dayThreeIconURL = `https://openweathermap.org/img/w/${dayThreeIcon}.png`;
     var dayThreeTemp = data.list[24].main.temp;
     var dayThreeWind = data.list[24].wind.speed;
     var dayThreeHum = data.list[24].main.humidity;
    //  Actions to display data
     $(`#dayThreeDate`).text(dayThreeDate);
     $(`#dayThreeIcon`).attr(`src`, dayThreeIconURL);
     $(`#dayThreeTemp`).text(`Temp: ${dayThreeTemp} Farenheit`);
     $(`#dayThreeWind`).text(`Wind Speed: ${dayThreeWind} MPH`);
     $(`#dayThreeHum`).text(`Humidity: ${dayThreeHum}%`);
    //  Var for day 4
     var dayFourTimestamp = data.list[32].dt;
     var dayFourDate = new Date(dayFourTimestamp*1000).toLocaleDateString();
     var dayFourIcon = data.list[32].weather[0].icon;
     var dayFourIconURL = `https://openweathermap.org/img/w/${dayFourIcon}.png`;
     var dayFourTemp = data.list[32].main.temp;
     var dayFourWind = data.list[32].wind.speed;
     var dayFourHum = data.list[32].main.humidity;
    //  Actions to display data
     $(`#dayFourDate`).text(dayFourDate);
     $(`#dayFourIcon`).attr(`src`, dayFourIconURL);
     $(`#dayFourTemp`).text(`Temp: ${dayFourTemp} Farenheit`);
     $(`#dayFourWind`).text(`Wind Speed: ${dayFourWind} MPH`);
     $(`#dayFourHum`).text(`Humidity: ${dayFourHum}%`);
    //  Var for day 5
     var dayFiveTimestamp = data.list[39].dt;
     var dayFiveDate = new Date(dayFiveTimestamp*1000).toLocaleDateString();
     var dayFiveIcon = data.list[39].weather[0].icon;
     var dayFiveIconURL = `https://openweathermap.org/img/w/${dayFiveIcon}.png`;
     var dayFiveTemp = data.list[39].main.temp;
     var dayFiveWind = data.list[39].wind.speed;
     var dayFiveHum = data.list[39].main.humidity;
    //  Actions to display data
     $(`#dayFiveDate`).text(dayFiveDate);
     $(`#dayFiveIcon`).attr(`src`, dayFiveIconURL);
     $(`#dayFiveTemp`).text(`Temp: ${dayFiveTemp} Farenheit`);
     $(`#dayFiveWind`).text(`Wind Speed: ${dayFiveWind} MPH`);
     $(`#dayFiveHum`).text(`Humidity: ${dayFiveHum}%`);
    //  Action to display all elements
     document.querySelector(`.weather`).style.display = `unset`;
   })
 })
})
// Function to display local storage info on load
$(document).ready( function() {
  // For function allowing elements to be created for each avalible key
  for (let i = 0; i < localStorage.length; i++ ) {
    // Var for creation & content
    var saveItem = document.createElement(`p`);
    var saveValue = localStorage.key(i);
    var saveInfo = `${saveValue}`;
    var saveButton = document.createElement(`p`);
    var returnButton = `<button class="saveBtn">Return</button>`;
    var contain = document.createElement(`div`);
// Actions to display info
    $(saveItem).html(saveInfo);
    $(saveItem).attr(`class`, `saveCity col-6`)
    $(saveButton).attr(`class`, `col-6`)
    $(saveButton).html(returnButton);
    $(contain).append(saveItem);
    $(contain).append(saveButton);
    $(contain).attr(`class`, `saveContain row`);
    $(`#searchResult`).append(contain); 
  }
})
// Function removing elements and keys from local storage when "clear" button is selected
$(`#clearBtn`).click( function () {
    $(`#searchResult`).children(`div`).remove();
  localStorage.clear();
})