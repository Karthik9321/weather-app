const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');
const argv = yargs.options({
    address: {
        demand: true
        , alias: 'a'
        , describe: "Address to fetch weather for"
        , string: true
    }
}).help().argv;
var stringAddr = argv.address;
geocode.geocodeAddress(stringAddr, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    }
    else {
        console.log(JSON.stringify(results, undefined, 2));
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            }
            else {
                console.log(JSON.stringify(weatherResults, undefined, 2));
            }
        });
    }
});