const request = require('request')


const geocode = (location, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + location + ".json?access_token=pk.eyJ1IjoiYXJhcjEwMjMiLCJhIjoiY2trZDY4c25sMDM4azJ1bjBndGtoMjUyciJ9.7zUvoGYXwQN-YAdnzPFrvQ&limit=1";

    request({ url, json: true }, (error, response) => {
        const { body } = response;
        if (error) {
            callback("Unable to connnect with API", undefined)
        } else if (body.features.length == 0) {
            callback("Invalid location name, please be more specific and watch out for typoes", undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
            })
        }
    })
}


module.exports = geocode;