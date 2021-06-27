const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=86f462b8443d4cec478955fd9378025b&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, { body }) => { //destructuring, from response to {body}. Dahil body lang naman yung gagamitin dun sa response object, destructure na 
        if (error) {
            callback("Can't connect to the weather app", undefined)
        }
        else if (body.error) { //original is response.body.error pero dahil nagdestructure, wala na yung response, same with other command na response.body, wala na si response
            callback("Can't find the address. Please input another one.", undefined)
        }
        else {
            callback(undefined, "It is currently " + body.current.temperature + " degrees out. But it feels like " + body.current.feelslike + " degrees out.")
        }
    })
}

module.exports = forecast