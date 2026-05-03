// Selecting DOM elements
// Add Event Listener to the button
document.getElementById('fetch-alerts').addEventListener('click', () => {
    const stateInput = document.getElementById('state-input');
    const stateAbbr = stateInput.value.trim().toUpperCase();
    
    if (!stateAbbr) {
        displayError("Please enter a state abbreviation.");
        return;
    }
    
    fetchWeatherAlerts(stateAbbr);
});

//Fetch Alerts for a State
function fetchWeatherAlerts(state) {
    // Clear UI before starting
    resetUI();

    fetch(`https://api.weather.gov/alerts/active?area=${state}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            //Displaying the alerts
            displayAlerts(data);
            
            // Clear input field on success
            document.getElementById('state-input').value = '';
        })
        .catch(error => {
            //Handle errors
            displayError(error.message);
        });
}

// Displaying the Alerts on the Page
 
function displayAlerts(data) {
    const alertsDisplay = document.getElementById('alerts-display');
    const alertFeatures = data.features || [];
    
    
    const summaryText = `${data.title}: ${alertFeatures.length}`;
    
    const summary = document.createElement('h2');
    summary.textContent = summaryText;
    alertsDisplay.appendChild(summary);

    // List each alert headline
    alertFeatures.forEach(feature => {
        const headline = document.createElement('p');
        headline.textContent = feature.properties.headline;
        alertsDisplay.appendChild(headline);
    });
}

// Implement Error Handling
 
function displayError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

// clear the UI before starting a new fetch
function resetUI() {
    const alertsDisplay = document.getElementById('alerts-display');
    const errorMessage = document.getElementById('error-message');
    
    alertsDisplay.innerHTML = '';
    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');
}
