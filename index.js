// Adding the Event Listener to satisfy the test runner
const fetchButton = document.getElementById('fetch-alerts');
if (fetchButton) {
    fetchButton.addEventListener('click', () => {
        const stateInput = document.getElementById('state-input');
        const stateAbbr = stateInput.value.trim().toUpperCase();

        if (!stateAbbr) {
            displayError("Please enter a state abbreviation.");
            return;
        }

        fetchWeatherAlerts(stateAbbr);
    });
}

// Fetching Alerts for a State
 
function fetchWeatherAlerts(state) {
    //Clear UI before starting
    resetUI();

    fetch(`https://api.weather.gov/alerts/active?area=${state}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("network failure"); 
            }
            return response.json();
        })
        .then(data => {
            // Displaying the alerts
            displayAlerts(data);
            
            // Clear input field on success
            const stateInput = document.getElementById('state-input');
            if (stateInput) stateInput.value = '';
        })
        .catch(error => {
            // Handling the errors
            displayError(error.message);
        });
}

// Displaying the Alerts on the Page
 
function displayAlerts(data) {
    const alertsDisplay = document.getElementById('alerts-display');
    const alertFeatures = data.features || [];
    
    // Show summary message using the 'title' property and number of alerts
    const summary = document.createElement('h2');
    summary.textContent = `${data.title}: ${alertFeatures.length}`;
    alertsDisplay.appendChild(summary);

    // List each alert headline from properties.headline
    alertFeatures.forEach(feature => {
        const headline = document.createElement('p');
        headline.textContent = feature.properties.headline;
        alertsDisplay.appendChild(headline);
    });
}

//Implement Error Handling
 
function displayError(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
    }
}

// Clear and Reset the UI
 
function resetUI() {
    const alertsDisplay = document.getElementById('alerts-display');
    const errorDiv = document.getElementById('error-message');
    
    if (alertsDisplay) alertsDisplay.innerHTML = '';
    if (errorDiv) {
        errorDiv.textContent = '';
        errorDiv.classList.add('hidden');
    }
}