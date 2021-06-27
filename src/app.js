const path = require('path')
const express = require('express') //express is a function
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public') //path function
const viewsPath = path.join(__dirname, '../templates/views') //if iba name nung folder. Orig name is views, changed to templates
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs') //setup handlebars template
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => { //syntax: app.get(name, function) functions arguments: req = request, res = response
//     res.send('<h1>Weather</h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Russel'
    }) //used for hbs (handlebars) arguments: (name of the view to render, object which contains all the values you want the view to access)
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Russel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Russel'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: '404',
        name: 'Russel',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => { //wildcard character - match anything that hasn't been matched so far
    res.render('error404', {
        title: '404',
        name: 'Russel',
        errorMessage: 'Page not found'
    })
}) //NOTE: LAGING LAST TO NA app.get

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})