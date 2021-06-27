const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicnVzcGFtaW50dWFuIiwiYSI6ImNrcWFmeWV6djAzcG8ycGxlMjl6amF2aXQifQ.gil6w8msNtLxXCgs6XcpOg&limit=1'

    request({ url, json: true }, (error, { body }) => { //Destructuring ulit dito, check comments in weather-app/utils/forecast
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }
        else if (body.features.length === 0) { //from response.body.etc to body.etc na lang, dahil nga sa destructure
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode