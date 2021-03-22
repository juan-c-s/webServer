
const request = require('request')



const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c3b79579f3926003af1832bad5d804ac&query=' + longitude + ',%20' + latitude + '&units=f';

    request({ url, json: true }, (error, response) => {
        const { body } = response;
        if (error) {
            callback('unable to contact Weather API services', undefined);
        } else if (body.error) {
            callback('coordinates entered incorrectly, Please try again.', body.error)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' outside, but it feels like ' + response.body.current.feelslike)
        }
    })
}

module.exports = forecast;