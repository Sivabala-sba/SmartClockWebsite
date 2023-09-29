function updateClock() {
    const now = new Date();
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    const dayElement = document.getElementById('day');

    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateString = now.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
    const dayString = now.toLocaleDateString([], { weekday: 'long' });

    timeElement.textContent = timeString;
    dateElement.textContent = dateString;
    dayElement.textContent = dayString;
}

/*function updateWeather() {
    const weatherElement = document.getElementById('weather-info');
    const apiKey = '2e4321768c1205e55cfe14003c2cc7a3';
    const location = 'Chennai'; // You can use city name or latitude and longitude

    // Construct the API URL
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    // Fetch weather data from the OpenWeatherMap API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extract relevant weather information from the API response
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const humidity = data.main.humidity;
            const pressure = data.main.pressure;

            // Update the weather element with the fetched data
            weatherElement.innerHTML = `
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${description}</p>
                <p>Humidity: ${humidity}</p>
                <p>Pressure: ${pressure}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherElement.innerHTML = '<p>Weather data not available</p>';
        });
}*/

function updateWeather() {
    const weatherGrid = document.getElementById('weather-grid');
    const apiKey = '2e4321768c1205e55cfe14003c2cc7a3';
    const location = 'Chennai'; // You can use city name or latitude and longitude

    // Construct the API URL
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    // Fetch weather data from the OpenWeatherMap API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extract relevant weather information from the API response
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const pressure = data.main.pressure;
            const humidity = data.main.humidity;

            // Update the weather grid with the fetched data
            document.getElementById('temperature').textContent = `${temperature}°C`;
            document.getElementById('description').textContent = description;
            document.getElementById('pressure').textContent = `${pressure} hPa`;
            document.getElementById('humidity').textContent = `${humidity}%`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherGrid.innerHTML = '<p>Weather data not available</p>';
        });
}

/*function updateQuote() {
    const quoteElement = document.getElementById('quote-text');
    const quotes = [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "In the middle of every difficulty lies opportunity. - Albert Einstein",
        "The best way to predict the future is to create it. - Peter Drucker"
        // Add more quotes here
    ];

    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];
}*/

function fetchQuotes() {
    fetch('quotes.txt')
        .then(response => response.text())
        .then(data => {
            const quotes = data.split('\n').map(line => line.trim());
            displayRandomQuote(quotes);
        })
        .catch(error => {
            console.error('Error fetching quotes:', error);
            displayRandomQuote(['Error: Quotes not available']);
        });
}

function displayRandomQuote(quotes) {
    const quoteElement = document.getElementById('quote-text');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];
}

// Fetch quotes when the page loads
fetchQuotes();

// Update the quote every 2 minutes
setInterval(fetchQuotes, 120000); // 2 minutes


let isFullscreen = false;
const fullscreenContainer = document.getElementById('fullscreen-container');

function toggleFullscreen() {
    if (!isFullscreen) {
        if (fullscreenContainer.requestFullscreen) {
            fullscreenContainer.requestFullscreen();
        } else if (fullscreenContainer.mozRequestFullScreen) {
            fullscreenContainer.mozRequestFullScreen();
        } else if (fullscreenContainer.webkitRequestFullscreen) {
            fullscreenContainer.webkitRequestFullscreen();
        } else if (fullscreenContainer.msRequestFullscreen) {
            fullscreenContainer.msRequestFullscreen();
        }
        isFullscreen = true;
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        isFullscreen = false;
    }
}

// Add double-click event listener to the fullscreen container
fullscreenContainer.addEventListener('dblclick', toggleFullscreen);

updateClock();
updateWeather();
//updateQuote();

setInterval(updateClock, 1000); // Update time every second
setInterval(updateWeather, 600000); // Update weather every 10 minutes (600,000 milliseconds)
//setInterval(updateQuote, 120000); // Update quote every 2 minutes (120,000 milliseconds)
