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

// Changed array to an object for easier property access
travelApp.destination = {
    "Canada": {
        lat: 45.4215,
        long: -75.6972
    },

    "Italy": {
        lat: 41.9028,
        long: 12.4964
    },

    "Belgium": {
        lat: 50.8503,
        long: 4.3517
    },

    "Netherlands": {
        lat: 52.3667,
        long: 4.8945
    },

    "Costa Rica": {
        lat: 9.9281,
        long: -84.0907
    },

    "Croatia": {
        lat: 18.1248,
        long: 15.9819
    },

    "Fiji": {
        lat: 18.1248,
        long: 178.4501
    },

    "Japan": {
        lat: 35.6762,
        long: 139.6503
    },

    "Australia": {
        lat: -35.2809,
        long: 149.1300
    },

    "Jamaica": {
        lat: 44.2312,
        long: -76.4860
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

            // Take the value from the drop down, use to reference lat and long from object, store that in a variable and call getCountryWeather
            const { lat, long } = this.destination[optionValue];

            this.getCountryWeather(lat, long).then(result => {
                const currently = result.currently;

                this.weather.text(`Weather in ${capital}: ${currently.icon}`);
                this.temp.text(currently.temperature);
            })
        })
    })
}


travelApp.getCountryData = function (countryName) {
    const countryPromise = $.ajax({
        url: `https://restcountries.eu/rest/v2/name/${countryName}`,
        method: 'GET',
        dataType: 'JSON'
    })
    return countryPromise;
}


travelApp.getCountryWeather = function (lat, long) {
    const weatherPromise = $.ajax({
        url: `https://api.darksky.net/forecast/${travelApp.apiKey}/${lat},${long}`,
        method: 'GET',
        dataType: 'JSONP'
    })
    return weatherPromise;
}


travelApp.init = function () {
    this.addStartButton();
    this.addFooterListener();
    this.addFormListener();
}

$(function () {
    travelApp.init();
})