// Namespace 
const travelApp = {};
travelApp.apiKey = '9cc67ecf9087aa6234e0f2c7e0e4cde5';
travelApp.countryName = $('.country');
travelApp.capitalName = $('.capital');
travelApp.language = $('.language');
travelApp.currency = $('.currency');
travelApp.populationNumb = $('.population');
travelApp.countryInfo = $('.countryInfo');
travelApp.weather = $('.weather');
travelApp.temp = $('.temp');
travelApp.image = $('.countryImage');

// Changed array to an object for easier property access
travelApp.destination = {
    "Canada": {
        lat: 45.4215,
        long: -75.6972,
        imageUrl: "./assets/canada.jpg",
        imageAlt: "A shiny lake surrounded by trees and snow capped mountains"
    },

    "Italy": {
        lat: 41.9028,
        long: 12.4964,
        imageUrl: "./assets/italy.jpg",
        imageAlt: "A small alley lined with colourful homes and various house plants"
    },

    "Belgium": {
        lat: 50.8503,
        long: 4.3517,
        imageUrl: "./assets/belgium.jpg",
        imageAlt: "Various buildings in front of a shorline"
    },

    "Netherlands": {
        lat: 52.3667,
        long: 4.8945,
        imageUrl: "./assets/netherlands.jpg",
        imageAlt: "Various buildings, trees and boats lined along a river"
    },

    "Costa Rica": {
        lat: 9.9281,
        long: -84.0907,
        imageUrl: "./assets/costarica.jpg",
        imageAlt: "A small waterfall centered in a luscious green rain forest"
    },

    "Croatia": {
        lat: 18.1248,
        long: 15.9819,
        imageUrl: "./assets/croatia.jpg",
        imageAlt: "Aerial view of a waterfront surrounded by buildings with orange roofs"
    },

    "Fiji": {
        lat: 18.1248,
        long: 178.4501,
        imageUrl: "./assets/fiji.jpg",
        imageAlt: "A sunny beach with, turqouise waters and white sand in Fiji"
    },

    "Japan": {
        lat: 35.6762,
        long: 139.6503,
        imageUrl: "./assets/japan.jpg",
        imageAlt: "A japanese storefront surrounded by signs written in japanese"
    },

    "Australia": {
        lat: -35.2809,
        long: 149.1300,
        imageUrl: "./assets/australia.jpg",
        imageAlt: "A waterfront active with boats and buildings in the background"
    },

    "Jamaica": {
        lat: 44.2312,
        long: -76.4860,
        imageUrl: "./assets/jamaica.jpg",
        imageAlt: "A small boat surrounded by turquoise water and sandy beaches"
    }
};

// Listener for when user clicks Start button on modal, fadeout the modal
travelApp.addStartButton = function () {
    $('.start').on('click', function () {
        // Fades out modal to display none
        $('.modalContainer').fadeOut('300');
        // Changes overflow-y property of body to auto (set to hidden on page load)
        $('body').css('overflow-y', 'auto');
    })
}

// Listener for when user clicks on footer button to show attribution and credits
travelApp.addFooterListener = function () {
    // Listener to make footer modal visible
    $('footer button').on('click', function() {
        $('.attributionContainer').addClass('showAttribution');
    })
    // Listernt to make footer modal hidden again
    $('.attributionClose').on('click', function () {
        $('.attributionContainer').removeClass('showAttribution');
    })
}

// When user changes drop down and submits
travelApp.addFormListener = function () {
    $('form').on('submit', (e) => {
        e.preventDefault();

        // Take the value from the drop down, store it and use it to call getCountryData 
        const optionValue = $('select option:selected').val();
        const returnedCountry = this.getCountryData(optionValue);
        returnedCountry.then(result => {
            // Used destructuring for easier access to the returned data
            const { name, capital, languages, currencies, population } = result[0];

            // Used this keyword to reference travelApp object (because we use function expression not an arrow function this will be equal to whatever is to the left of the dot)
            this.countryName.text(name);
            this.capitalName.text(capital);
            this.language.text(languages[0].name);
            this.currency.text(currencies[0].code);
            this.populationNumb.text(population);

            // Take the value from the drop down, use to reference lat and long (and Image info, for immediate use) from object, store that in a variable and call getCountryWeather
            const { lat, long, imageUrl, imageAlt } = this.destination[optionValue];

            // Set the image src and alt to those matching in the destination object
            this.image.attr('src', imageUrl).attr('alt', imageAlt);

            this.getCountryWeather(lat, long).then(result => {
                const currently = result.currently;

                this.weather.text(`Weather in ${capital}: ${currently.icon}`);
                // Convert temp to celcius
                const toCelcius = (currently.temperature - 32) * 5 / 9;
                // Used .html to be able to use html syntax
                this.temp.html(`<p>${toCelcius.toFixed(2)}&#176;C</p>`);

            // IF DarkSky API returns error, advise user of weather database error in weather container
            }, weatherError => {
                this.weather.text(`Weather database error.`);
            })

        // IF API returns error, change country name to advise user error has occurred
        }, countryError => {
            this.countryName.text('Country database error');
        })
    })
}

// Rest countries API call
// Shortened to remove setting a variable, can immediately return promise
travelApp.getCountryData = function (countryName) {
    return $.ajax({
        url: `https://restcountries.eu/rest/v2/name/${countryName}`,
        method: 'GET',
        dataType: 'JSON'
    })
}

// Darky sky API call
// Shortened to remove setting a variable, can immediately return promise
travelApp.getCountryWeather = function (lat, long) {
    return $.ajax({
        url: `https://api.darksky.net/forecast/${travelApp.apiKey}/${lat},${long}`,
        method: 'GET',
        dataType: 'JSONP'
    })
}

// "Home" button on the app to reload the entire page
travelApp.addRestartListener = function () {
    $('.homeButton').on('click', function (e) {
        e.preventDefault();
        location.reload();
    })
}

travelApp.init = function () {
    this.addStartButton();
    this.addFooterListener();
    this.addFormListener();
    this.addRestartListener();
}

$(function () {
    travelApp.init();
})