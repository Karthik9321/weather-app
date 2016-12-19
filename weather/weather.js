const request = require('request');
var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/e548d15119658a69511e638084499826/${lat},${lng}`
        , json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Forecast.io');
        }
        else if (response.statusCode === 404) {
            callback('Unable to fetch weather');
        }
        else {
            callback(undefined, {
                Weather: body.currently.summary
                , Temperature: body.currently.temperature
                , Feels_like: body.currently.apparentTemperature
                , Humidity: body.currently.humidity
            });
        }
    });
};
module.exports.getWeather = getWeather;