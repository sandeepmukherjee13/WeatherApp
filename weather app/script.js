let appId = '446f5d85a4e84af15d519924c0c80a2a';
let units = 'metric';
let searchMethod;

function getSearchMethod(searchTerm){
	console.log("inside 1 ");
	if(searchTerm.length === 5 && Number.parseInt(searchTerm)+ '' === searchTerm)
		searchMethod = 'zip';
	else
		searchMethod = 'q';
}

function searchWeather(searchTerm){
	getSearchMethod(searchTerm);
	fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
	.then(result => {
		return result.json();
	}).then(result => {
		init(result);
	})
}

function init(resultFromServer){
	console.log("inside 3 ");
	console.log(resultFromServer);
	switch(resultFromServer.weather[0].main){
		case 'Clear':
		document.body.style.backgroundImage = 'url("/Users/sandeepmukherjee/Google Drive/codes/weather app/images/clear.jpg")';
		break;

		case 'Clouds':
		document.body.style.backgroundImage = 'url("/Users/sandeepmukherjee/Google Drive/codes/weather app/images/cloudy.jpg")';
		break;

		case 'Rain':
		case 'Drizzle':
		case 'Mist':
		document.body.style.backgroundImage = 'url("/Users/sandeepmukherjee/Google Drive/codes/weather app/images/rain.jpg")';
		break;

		case 'Thunderstorm':
		document.body.style.backgroundImage = 'url("/Users/sandeepmukherjee/Google Drive/codes/weather app/images/storm.jpg")';
		break;
		
		case 'Snow':
		document.body.style.backgroundImage = 'url("/Users/sandeepmukherjee/Google Drive/codes/weather app/images/snow.jpg")';
		break;
		
		default:
		console.log("default block not working");
		document.body.style.backgroundImage = 'url("/Users/sandeepmukherjee/Google Drive/codes/weather app/images/haze.jpg")';
		break;
	}

	let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
	let temperatureElement = document.getElementById('temperature');
	let humidityElement = document.getElementById('humidity');
	let windSpeedElement = document.getElementById('windSpeed');
	let cityHeader = document.getElementById('cityHeader');
	let weatherIcon = document.getElementById('documentIconImg');

	weatherIcon.src = 'http://openweathermap.org/img/w/'+ resultFromServer.weather[0].icon + '.png';

	let resultDescription = resultFromServer.weather[0].description;
	weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase()+resultDescription.slice(1);

	temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
	windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + 'm/s';
	cityHeader.innerHTML = resultFromServer.name;
	humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';
	setPositionForWeatherInfo();

}

let setPositionForWeatherInfo = () => {
	weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click',() => {
	let searchTerm = document.getElementById('searchInput').value;
	console.log("inside 5 ");
	console.log(searchTerm);
	if(searchTerm)
		searchWeather(searchTerm);
})