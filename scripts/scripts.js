// Namespace 
const travelApp = {};
travelApp.apiKey = '9cc67ecf9087aa6234e0f2c7e0e4cde5';

// Listener for when user clicks Start button on modal, fadeout the modal
travelApp.addStartButton = function() {
    $('.start').on('click', function() {
        // Fades out modal to display none
        $('.modalContainer').fadeOut('300');
        // Changes overflow-y property of body to auto (set to hidden on page load)
        $('body').css('overflow-y', 'auto');
    })
}

travelApp.addFooterListener = function() {
    $('footer').on('click', function() {
        $('.attributionContainer').addClass('showAttribution');
    })
    $('.attributionClose').on('click', function() {
        $('.attributionContainer').removeClass('showAttribution');
    })
}

// When user changes drop down and submits

// Take the value from the drop down, store it and use it to call getCountryData 

// Take the value from the drop down, use to reference lat and long from object, store that in a variable and call getCityWeatherData 

travelApp.destination = [
    {
        canada: {
            lat: 45.4215,
            long: -75.6972
        }
    },
    {
        italy: {
            lat: 41.9028,
            long: 12.4964
        }
    },
    {
        belgium: {
            lat: 50.8503,
            long: 4.3517
        }
    },
    {
        netherlands: {
            lat: 52.3667,
            long: 4.8945
        }
    },
    {
        costaRica: {
            lat: 9.9281,
            long: -84.0907
        }
    },
    {
        croatia: {
            lat: 45.8150,
            long: 15.9819
        }
    },
    {
        unitedKingdom: {
            lat: 51.5074,
            long: -0.1278
        }
    },
    {
        japan: {
            lat: 35.6762,
            long: 139.6503
        }
    },
    {
        australia: {
            lat: -35.2809,
            long: 149.1300
        }
    },
    {
        jamaica: {
            lat: 44.2312,
            long: -76.4860
        }
    }
];


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
    console.log(item);
})

// travelApp.getCountryWeather = function (lat, long) {
//     const weatherPromise = $.ajax({
//         url: `https://api.darksky.net/forecast/${travelApp.apiKey}/42.3601,-71.0589`,
//         method: 'GET',
//         dataType: 'JSONP'
//     })
//     return weatherPromise;
// } 

// travelApp.countryWeather = travelApp.getCountryWeather(travelApp.countryLat, travelApp.countryLong);

// travelApp.countryWeather.done(function (item) {
//     console.log(item);
// })

travelApp.init = function() {
    travelApp.addStartButton();
    travelApp.addFooterListener();
}

$(function() {
    travelApp.init();
})