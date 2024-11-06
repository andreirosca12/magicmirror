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
async function updateWeather() {
    data = await fetchWeather();

    current_temp = data.current.temperature_2m;
    document.getElementById('temperature').innerHTML = current_temp + '°C';

    forecast = data.daily;

    document.getElementById('weather-daily').innerHTML = '';
    for (let i = 0; i < forecast.temperature_2m_max.length; i++) {
        const date = new Date(forecast.time[i]);
        const maxTemp = forecast.temperature_2m_max[i];
        const minTemp = forecast.temperature_2m_min[i];

        const dayElement = document.createElement('div');
        dayElement.innerHTML = `${date.getDate()}/${date.getMonth() + 1}: ${minTemp}°C - ${maxTemp}°C`;
        document.getElementById('weather-daily').appendChild(dayElement);
    }
}
window.onload = async function() {
    await updateWeather();
}
async function fetchNews(force = false) {
    
    const apiUrl = 'https://newsapi.org/v2/top-headlines?country=row&apiKey=YOUR_API_KEY';

}

function getTodos() {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
}

function addTodo(taskString) {
    const todos = getTodos();
    todos.push({ task: taskString, completed: false });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeTodo(index) {
    const todos = getTodos();
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function toggleTodoCompleted(index) {
    const todos = getTodos();
    todos[index].completed = !todos[index].completed;
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getEvents() {
    const events = localStorage.getItem('events');
    return events ? JSON.parse(events) : [];
}

function addEvent(eventString, date) {
    const events = getEvents();
    events.push({ event: eventString, date });
    localStorage.setItem('events', JSON.stringify(events));
}

function removeEvent(index) {
    const events = getEvents();
    events.splice(index, 1);
    localStorage.setItem('events', JSON.stringify(events));
}

function updateEvent(index, eventString, date) {
    const events = getEvents();
    events[index] = { event: eventString, date };
    localStorage.setItem('events', JSON.stringify(events));
}
