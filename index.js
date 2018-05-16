// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#datetime");
var $stateInput = document.querySelector("#state");
var $cityInput = document.querySelector("#city");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $searchBtn2 = document.querySelector("#search2");
var $searchBtn3 = document.querySelector("#search3");
var $searchBtn4 = document.querySelector("#search4");
var $searchBtn5 = document.querySelector("#search5");
var $nextBtn = document.querySelector("#next");
var $prevBtn = document.querySelector("#prev");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);
$searchBtn2.addEventListener("click", handleSearchButtonClick2);
$searchBtn3.addEventListener("click", handleSearchButtonClick3);
$searchBtn4.addEventListener("click", handleSearchButtonClick4);
$searchBtn5.addEventListener("click", handleSearchButtonClick5);
$nextBtn.addEventListener("click", handleNextButton);
$prevBtn.addEventListener("click", handlePrevButton);
// Set filteredAddresses to addressData initially
var filterdata = dataSet;
var displayData = filterdata.slice(0, 50);

// renderTable renders the filteredAddresses to the tbody
function renderTable() {
  disableCheck();
  $tbody.innerHTML = "";
  for (var i = 0; i < displayData.length; i++) {
    // Get get the current address object and its fields
    var address = displayData[i];
    var fields = Object.keys(address);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = address[field];
    }
  }
}

function handleSearchButtonClick() {
  console.log("click");
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDate = $dateInput.value;
  
  // Set filteredAddresses to an array of all addresses whose "state" matches the filter
  filterdata = dataSet.filter(function(address) {
    var addressdatetime = address.datetime;
    
    // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
    return addressdatetime === filterDate;
  });
  displayDataInit()
  renderTable();
}

// Render the table for the first time on page load
// renderTable();


function handleSearchButtonClick3() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterState = $stateInput.value.trim().toLowerCase();

  // Set filteredAddresses to an array of all addresses whose "state" matches the filter
  filterdata = dataSet.filter(function(address) {
    var addressState = address.state.toLowerCase();

    // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
    return addressState === filterState;
  });
  displayDataInit()  
  renderTable();
}
function handleSearchButtonClick2() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filtercity = $cityInput.value.trim().toLowerCase();

  // Set filteredAddresses to an array of all addresses whose "state" matches the filter
  filterdata = dataSet.filter(function(address) {
    var addresscity = address.city.toLowerCase();

    // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
    return addresscity === filtercity;
  });
  displayDataInit()  
  renderTable();
}
function handleSearchButtonClick4() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filtercountry = $countryInput.value.trim().toLowerCase();

  // Set filteredAddresses to an array of all addresses whose "state" matches the filter
  filterdata = dataSet.filter(function(address) {
    var addresscountry = address.country.toLowerCase();

    // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
    return addresscountry === filtercountry;
  });

  displayDataInit()  
  renderTable();
}
function handleSearchButtonClick5() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filtershape = $shapeInput.value.trim().toLowerCase();

  // Set filteredAddresses to an array of all addresses whose "state" matches the filter
  filterdata = dataSet.filter(function(address) {
    var addressshape = address.shape.toLowerCase();

    // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
    return addressshape === filtershape;
  });
  displayDataInit()  
  renderTable();
}


// show next 50 
// 
//  looks for the last element in the 
//  displayData array and looks for the next 50 items in the 
//  fileter data
//  ps: 50 + 1 because of the slice function is non inclusive
//
function handleNextButton(){
  if($nextBtn.classList.contains("disabled")) return;
  var lastElementIndex = filterdata.indexOf(displayData.slice(-1)[0]) 
  displayData = filterdata.slice(lastElementIndex+ 1, lastElementIndex + 50 + 1);
  // console.log(lastElementIndex);
  // console.log("Display data length: " + displayData.length)
  // console.log("filter data length: " + filterdata.length)
  renderTable();
}

// show preve 50
// 
//  looks for the last element in the 
//  displayData array and looks for the prev 50 items in the 
//  fileter data
//
function handlePrevButton(){
  if($prevBtn.classList.contains("disabled")) return;  
  var lastElementIndex = filterdata.indexOf(displayData.slice(-1)[0]);
  displayData = filterdata.slice(lastElementIndex - 99, lastElementIndex - 50 + 1);
  // console.log(lastElementIndex);
  // console.log("Display data length: " + displayData.length)
  // console.log("filter data length: " + filterdata.length)
  renderTable();
}


// checks if we need to disable a button
function disableCheck(){
  if(filterdata.length < 50){
    $nextBtn.classList.add("disabled");
    $prevBtn.classList.add("disabled");
    return;
  } else {
    $nextBtn.classList.remove("disabled");
    $prevBtn.classList.remove("disabled");
  }

  if(filterdata.indexOf(displayData.slice(-1)[0]) < 50){
    $prevBtn.classList.add("disabled");
  } else {
    $prevBtn.classList.remove("disabled");
  }

  if(filterdata.indexOf(displayData.slice(-1)[0]) + 1 > filterdata.length ){
    $nextBtn.classList.add("disabled");
  } else {
    $nextBtn.classList.remove("disabled");
  }
}


function displayDataInit(){
  displayData = filterdata.slice(0, 50);
}

// Render the table for the first time on page load
renderTable();

