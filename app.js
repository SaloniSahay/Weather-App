 //api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// 4926b71d9cbbea189c1a30867f5731f2
const weatherApi={
    key:"4926b71d9cbbea189c1a30867f5731f2",
    baseUrl:"https://api.openweathermap.org/data/2.5/weather",
}
const searchInputBox=document.getElementById('input');
 searchInputBox.addEventListener('keypress', (event) => {
     if(event.keyCode == 13){
         console.log(searchInputBox.value);
         getWeatherReport(searchInputBox.value);
     }
});
function getWeatherReport(city){
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}
function showWeatherReport(weather){
    console.log(weather);
    let city=document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temp=document.getElementById('temp');
    temp.innerHTML=`${Math.round(weather.main.temp)}&deg;C`;

    let x = document.getElementById('min-max');
    x.innerHTML=`${Math.floor(weather.main.temp_min)}&degC (min) / ${Math.ceil(weather.main.temp_max)}&degC (max)`;

    let weatherType=document.getElementById('weather');
    weatherType.innerText=`${weather.weather[0].main}`;

    let Tdate = document.getElementById('date');
    let todayDate=new Date();
    Tdate.innerText=manageDate(todayDate);

    if(weatherType.textContent=='Clear'){
        document.body.style.backgroundImage = "url('./img/clear_weather.jpg')"
    }
    else if(weatherType.textContent=='Clouds'){
        document.body.style.backgroundImage = "url('./img/cloudy_weather.jpg')"
    }
    else if(weatherType.textContent=='Rain'){
        document.body.style.backgroundImage = "url('./img/rainy.png')"
    }
    else if(weatherType.textContent=='Haze'){
        document.body.style.backgroundImage = "url('./img/haze.jpg')"
    }
    else if(weatherType.textContent=='Thunderstorm'){
        document.body.style.backgroundImage = "url('./img/thunderstorm_weather.jpg')"
    }
}
function manageDate(a){
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    let year=a.getFullYear();
    let month=months[a.getMonth()];
    let day=days[a.getDay()];
    let date=a.getDate();

    return `${date} ${month} (${day}), ${year}`;
}
