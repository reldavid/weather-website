const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weathr')
const port = process.env.PORT || 3000
const app = express()

const mapKey = "pk.eyJ1IjoicmVsZGF2aWQiLCJhIjoiY2swNmp3d2RlMHJ1MTNucGN1NG9jd2d2diJ9.Vz-KWuXmCeNC0PjQozcgTA"
const weatherKey = "172773b0dfc8124c5d98e5892ff197b6"

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'weather app',
        name: 'ariel david'
    })
})

app.get('/about', (req,res) =>{
res.render('about', {
    title: 'about me',
    name:'ariel david'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'help page',
        msg: 'how may I help you ?',
        name: 'ariel david'
    })
})

app.get('/weather', (req,response) => {
    if (!req.query.address) {
        return response.send({error:'you must provide an address'})
    }
    const address = req.query.address
    geocode(mapKey, address, (err,{latitude, longitude, location} = {} ) => {
        if (err) {return response.send({ err })}
    
        weather(weatherKey, latitude, longitude,(err,forecastdata) => {
            if (err){return response.send({ err })} 
                  
                response.send({
                    location: location,
                    forcast: `${forecastdata.summery} It is currently ${forecastdata.temperature}c degrees out. there is a ${forecastdata.precipProbability} chance of rain.
                    the temperaturehigh for today is ${forecastdata.tempHigh} the temperatureLow for today is ${forecastdata.tempLow}`
                })
        })
    })
})

app.get('/product', (req,res) => {
    if (!req.query.serch) {
        return res.send({
            error: 'you must provide a serch term '
        })

    }
    
    res.send({
        product:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'help article not found',
        name: 'ariel david'
    })
    // res.send('help article not found')
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'page  not found',
        name: 'ariel david'
    })
    // res.send('my 404 page')
})
app.listen(port, ()=>{
    console.log(`server is runing ay port ${port}`)
})






 