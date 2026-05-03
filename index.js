// Selecting DOM elements
const stateInput = document.querySelector('#state-input'); 
const searchButton = document.querySelector('#search-button');
const alertContainer = document.querySelector('#alert-container'); 
const errorMessageDiv = document.querySelector('#error-message');

// Event Listener for the search
searchButton.addEventListener('click', () => {
    const stateAbbr = stateInput.value.trim().toUpperCase();
    
    //Clear previous data and reset UI
    clearUI();

    //Basic Input Validation
    if (stateAbbr.length !== 2) {
        displayError("Please enter a valid 2-letter state abbreviation (e.g., MN).");
        return;
    }

    fetchWeatherAlerts(stateAbbr);
});

//Fetch Alerts for a State from the API
function fetchWeatherAlerts(state) {
    const url = `https://api.weather.gov/alerts/active?area=${state}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch weather data. Please check the state code.");
            }
            return response.json();
        })
        .then(data => {
            //Display the Alerts
            displayAlerts(data, state);
        })
        .catch(errorObject => {
            //Implement Error Handling
            displayError(errorObject.message);
        });
}

//Display the Alerts on the Page
function displayAlerts(data, stateName) {
    // Access the 'features' array from the API response
    const alerts = data.features;
    const alertCount = alerts.length;

    // Create Summary Message
    const summary = document.createElement('h3');
    summary.textContent = `Current watches, warnings, and advisories for ${stateName}: ${alertCount}`;
    alertContainer.appendChild(summary);

    // Create a list for headlines
    const ul = document.createElement('ul');

    alerts.forEach(alert => {
        const li = document.createElement('li');
        // Navigate the nested object: properties -> headline
        li.textContent = alert.properties.headline;
        ul.appendChild(li);
    });

    alertContainer.appendChild(ul);
}

//Display Error Messages
function displayError(message) {
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = 'block'; // Ensure it's visible
}

//Clear and Reset the UI
function clearUI() {
    stateInput.value = ''; 
    alertContainer.innerHTML = ''; 
    errorMessageDiv.textContent = ''; 
    errorMessageDiv.style.display = 'none'; 
}
