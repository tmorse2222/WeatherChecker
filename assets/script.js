var searchBtn = $(`#searchBtn`);


function search() {
    var searchText = document.getElementById(`searchText`).value;
    console.log(searchText);
};

searchBtn.click(search);