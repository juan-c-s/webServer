const path = require('path')
const hbs = require('hbs')
const express = require('express')

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;


const app = express()

// Organizing paths for templates directory and public directory
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '/templates/views')//this tells express where the hbs documents are
const partialsPath = path.join(__dirname, '/templates/partials')

//with the express.static function, you can serve static files(html,css) 
// in this case we gave the path for the public folder to serve the html files to express. This will help us have the html files available for us in the server
// a prediction is that we will use the app.get to send the information we need to the html files
//setting up static directory to serve
app.use(express.static(publicDirectoryPath))

// Using express app.set functionallities 
app.set('view engine', 'hbs');
app.set('views', viewsPath) // tell express to look for the path and not for the directory 'views'
hbs.registerPartials(partialsPath)

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Juan',
        message: 'I am here to help you :)',
        helpmessage: 'By going to index, you go to the home page and in about you can learn some stuff about the creator of the page, me.',
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather',
        name: 'Juan ',
    })
})
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Data',
        name: 'Juan camilo',
    })
})

app.get('', (req, res) => {
    res.send('hello home')
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please enter a value',
        })
    }

    const geo = geocode(req.query.address, (error, { location, latitude, longitude } = {}) => {
        if (error) {
            return res.send({
                error,
            })
        }
        return forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({
                    error,
                })
            } else {
                res.send({
                    forecast: data,
                    location,
                    address: req.query.address,
                    latitude,
                    longitude,
                })
            }
        })
    })




})

app.get('/help/*', (req, res) => {
    res.render('notFound.hbs', {
        title: '404',
        name: 'Juan Camilo Salazar',
        errorMessage: 'Help Article Not Found',
    });
})

app.get('*', (req, res) => {
    res.render('notFound.hbs', {
        title: '404',
        name: 'Juan Camilo Salazar',
        errorMessage: 'Page Not Found',
    });
})
//this runs the server in the port 3000 and will print to the console when it runs. I think this will be  similar to the initState in dart-flutter in the terms of loading stuff first
app.listen(port, () => {
    console.log('Server up and running on port ' + port)
})

