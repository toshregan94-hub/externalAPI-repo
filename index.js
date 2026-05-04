const weatherApi = "https://api.weather.gov/alerts/active?area=";

const button = document.getElementById('fetch-alerts');
const input = document.getElementById('state-input');
const alertsDisplay = document.getElementById('alerts-display');
const errorMessage = document.getElementById('error-message');

button.addEventListener('click', function() {
    const stateAbbr = input.value.toUpperCase(); // Ensure uppercase for the API call

    // Clear the input field immediately after clicking 
    input.value = "";

    // Validating input
    if (stateAbbr === "") {
        displayError("Please enter a state abbreviation");
        return;
    }

    if (stateAbbr.length !== 2) {
        displayError("Please enter a valid 2 letter state abbreviation");
        return;
    }

    // Performing the Fetch
    fetch(weatherApi + stateAbbr)
        .then(response => {
            if (!response.ok) {
                throw new Error("Invalid State Abbreviation");
            }
            return response.json();
        })
        .then(data => {
            // Clearing previous errors and results 
            errorMessage.textContent = "";
            errorMessage.classList.add('hidden');
            alertsDisplay.innerHTML = ""; 

            // Display Summary 
            
            const summary = document.createElement('h2');
            summary.textContent = data.title + ': ' + data.features.length;
            alertsDisplay.appendChild(summary);

            // Displaying Each Alert
            data.features.forEach(alert => {
                const p = document.createElement('p');
                p.textContent = alert.properties.headline;
                alertsDisplay.appendChild(p);
            });
        })
        .catch(error => {
            // Display error message on failure
            displayError(error.message);
        });
});

// Helper function to handle error display logic
function displayError(message) {
    alertsDisplay.textContent = ""; 
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}