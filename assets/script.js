var searchBtn = $(`#searchBtn`);


function search() {
    var city = document.getElementById(`searchText`).value;
    var geocode = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=ad2ab0eea4f63232dfe1a7f79251420d`
    fetch(geocode)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
};

searchBtn.click(search);