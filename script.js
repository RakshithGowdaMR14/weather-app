async function getWeather() {
    const cityInput = document.getElementById("cityInput").value.trim();
    if (!cityInput) {
      alert("Please enter a city name.");
      return;
    }
  
    const apiKey = "4ddf857d1ca683c539bac18a4afd35ab"; // Replace with your actual key
  
    // Add country code only if user didn't provide one
    let query = cityInput.includes(",") ? cityInput : `${cityInput},IN`;
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch weather data.");
      }
  
      const data = await response.json();
  
      // Weather icon
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  
      const weatherHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${iconUrl}" alt="${data.weather[0].description}" />
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${capitalizeFirstLetter(data.weather[0].description)}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
      `;
  
      document.getElementById("weatherResult").innerHTML = weatherHTML;
    } catch (error) {
      document.getElementById("weatherResult").innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
  }
  
  // Create 100+ raindrops
window.onload = () => {
    const rainContainer = document.querySelector('.rain');
    for (let i = 0; i < 120; i++) {
      const drop = document.createElement('div');
      drop.className = 'rain-drop';
      drop.style.left = `${Math.random() * 100}%`;
      drop.style.animationDuration = `${0.5 + Math.random()}s`;
      drop.style.animationDelay = `${Math.random() * 2}s`;
      rainContainer.appendChild(drop);
    }
  };
  
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  