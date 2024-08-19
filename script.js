const locationInputElement = document.querySelector('.location-input');
const locationNameElement = document.querySelector('.location-name');
const currentWeatherContainer = document.querySelector('.current-weather-container')
const fiveDaysWeatherContainer = document.querySelector('.five-days-weather-container');

locationInputElement.addEventListener('keydown', function (event){
    if (event.key === 'Enter')
        getWeatherInfo();
});

function getWeatherInfo() {
    locationInputElement.value = locationInputElement.value[0].toUpperCase() + locationInputElement.value.substring(1).toLowerCase();
    locationNameElement.innerHTML = locationInputElement.value;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${locationInputElement.value.toLowerCase()}&appid=45f543855260adb4b5398d6bc79b7762&units=metric`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('.humidity').innerHTML = data.list[0].main.humidity + "%";
            document.querySelector('.wind-speed').innerHTML = data.list[0].wind.speed + "km/h";

            const todayWeatherElement = document.querySelector('.current-weather-container');
            todayWeatherElement.querySelector('.temp').innerHTML = Number(data.list[0].main.temp).toFixed(1) + "°C";
            todayWeatherElement.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + ".png";
            todayWeatherElement.querySelector('.description').innerHTML = data.list[0].weather[0].description;

            for (let i = 0; i < 5; i++) {
                const j = i * 8;
                const day = document.getElementById('day' + (i + 1));
                day.querySelector('.temp').innerHTML = Number(data.list[j].main.temp).toFixed(1) + "°C";

                document.getElementById("img" + (i+1)).src = "https://openweathermap.org/img/wn/" + data.list[j].weather[0].icon + ".png";

                document.getElementById("description" + (i+1)).innerHTML = data.list[j].weather[0].description;
            }

            currentWeatherContainer.querySelector('.weather-container').classList.add('active');
            fiveDaysWeatherContainer.classList.add('show');
        })

        .catch(err => alert("Something went wrong..."))
}

const date = new Date();
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function checkDay(day){
    if (day + date.getDay() > 6){
        return day + date.getDay() - 7;
    }
    else {
        return day + date.getDay();
    }
}

document.querySelector('.date').innerHTML = `${weekday[checkDay(0)]}, ${months[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}` ;

for (let i = 0; i < 5; i++) {
    document.querySelector('.day-' + (i+1)).innerHTML = weekday[checkDay(i)].substring(0,3);
}