// Namespace 
const travelApp = {};
travelApp.apiKey = '9cc67ecf9087aa6234e0f2c7e0e4cde5';

travelApp.getCountryData = function(countryName) {
    const countryPromise = $.ajax({
        url: `https://restcountries.eu/rest/v2/name/${countryName}`,
        method: 'GET',
        dataType: 'JSON'
    })
    return countryPromise;
} 

travelApp.countryData = travelApp.getCountryData('Canada');

travelApp.countryData.done(function(item){
    travelApp.countryLong = item[0].latlng[0];
    travelApp.countryLat = item[0].latlng[1];
    console.log(item);
})

travelApp.getCountryWeather = function (lat, long) {
    const weatherPromise = $.ajax({
        url: `https://api.darksky.net/forecast/${travelApp.apiKey}/42.3601,-71.0589`,
        method: 'GET',
        dataType: 'JSONP'
    })
    return weatherPromise;
} 

travelApp.countryWeather = travelApp.getCountryWeather(travelApp.countryLat, travelApp.countryLong);

travelApp.countryWeather.done(function (item) {
    console.log(item);
})