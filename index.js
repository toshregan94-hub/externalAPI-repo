// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

const button = document.getElementById('fetch-alerts');
const input = document.getElementById('state-input');
const alertsDisplay = document.getElementById('alerts-display');
const errorMessage = document.getElementById('error-message');

//add event listener
button.addEventListener('click', function(){
    const stateAbbr = input.value

    //display meaningful error message incase of empty input or invalid input
    if (stateAbbr === "") {
    errorMessage.textContent = "Please enter a state abbreviation"
    errorMessage.classList.remove('hidden')
    return  // stops the fetch from happening
  }

    if (stateAbbr.length !== 2) {
    errorMessage.textContent = "Please enter a valid 2 letter state abbreviation"
    errorMessage.classList.remove('hidden')
    return  // prevents the fetch from occurring
  }

fetch(weatherApi + stateAbbr)
  .then(response => response.json())
  .then(data => {
    //check if input is valid first
    if (!data.features) {
        throw new Error("Invalid State Abbreviation")
    }
    //clear previous results
    alertsDisplay.textContent = ""
    errorMessage.textContent = "";
    errorMessage.classList.add('hidden');
    //clear input 
    input.value = "";
    //display summary
  alertsDisplay.textContent = data.title + ': ' + data.features.length
    //display each alert
  data.features.forEach(alert =>{
    // creation of the element.
    const p = document.createElement('p'); 
    // Adding the text content to the element.
    p.textContent = alert.properties.headline; 
    // Adding p to the alertsDisplay.
    alertsDisplay.appendChild(p) 
  })
})
   .catch(error => {
    errorMessage.textContent = error.message
    errorMessage.classList.remove('hidden')
  })
})