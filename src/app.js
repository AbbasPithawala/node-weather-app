const geocode = require('./utils/geocode')
const forecast = require('./utils/weather_conditions')

const path = require('path')
const express = require('express')

const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000 

const publicPathDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewPath)
app.use(express.static(publicPathDirectory))
hbs.registerPartials(partialsPath)


app.get('', (req, res)=>{
    res.render('index', {
        title: "Weather",
        name: "Weather forecasting of various locations"
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: "About me",
        name: "Abbas"
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: "Help",
        name: "Write what you want to know"
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please provide an address!"
        })
    }
// --------------------------------------------
    const place = req.query.address
    geocode(place, (error, {location, latitude, longitude}={})=>{      //object data has been destructured to = {location, latitude, longitude}
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData
            })
        }) 
    })





    // res.send({
    //     location: req.query.address
    })

app.get("/products", (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: "Please provide a search input!"
        })
    }
    //console.log(req.query)
    res.send({
        products: "So you want to search for: "+req.query.search
    })
})

app.get('/help/*', (req, res)=>{
    res.render('error', {
        title: "404",
        errorMessage:"This help article is not available",
        name: "No help extension found"
    })
})

app.get('*', (req, res)=>{
    res.render('error', {
        title: 404,
        name: "Not found"
    })
})




app.listen(port, ()=>{
    console.log("Server has started!")
})