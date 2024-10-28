async function fetchWeather(force = false) {
    
    const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=44.4323&longitude=26.1063&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=Africa%2FCairo&forecast_days=3'; // e.g., `https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY`
    
    const lastUpdate = localStorage.getItem('lastUpdate');
    const currentTime = new Date().getTime();

    if (lastUpdate && (currentTime - lastUpdate < 3600000) && !force) {
        
        const weatherData = JSON.parse(localStorage.getItem('weatherData'));
        console.log('Using cached weather data:', weatherData);
        return weatherData;
    }

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        localStorage.setItem('weatherData', JSON.stringify(data));
        localStorage.setItem('lastUpdate', currentTime);

        console.log('Fetched new weather data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

async function fetchNews(force = false) {
    
    const apiUrl = 'https://newsapi.org/v2/top-headlines?country=row&apiKey=YOUR_API_KEY';

}