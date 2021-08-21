const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req,res) =>{
    res.sendFile(__dirname + "/index.html")
});

app.post("/", (req,res) =>{
    const cityName = req.body.cityName;
    const countryName = req.body.countryName;
    const place = cityName + ',' + countryName;
    const APIKEY = 'bb9eea384a79db31434f1edd036b4d79';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}`

    https.get(url, function(response){
        response.on('data', function (data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const fahrenheit = Math.round(((temp-273.15)*1.8)+32);
            const urlIcon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon+ "@2x.png"

            res.write("<p>The wheather is currently " + weatherDescription +  "</p>")
            res.write("<h1>The Tempeture in " + place + " is " + fahrenheit + " Farentheit</h1>")
            res.write("<img src='" +urlIcon+ "'> ")
            res.send()
        })
    });
})

app.listen(3000, () =>{
    console.log('Server is running on port 3000');
});