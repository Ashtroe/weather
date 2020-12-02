const express = require('express');
const app = express();
const mongoose = require('mongoose');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
const cors = require('cors');
const axios = require('axios');



let PORT = process.env.PORT || 5000
let baseURL = 'https://api.openweathermap.org'

let weatherData ={
  dailyTemps:null
}
let cityLat
let cityLon

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
}

app.listen(PORT, ()=>{
  console.log(`connected to port ${PORT}`)
})


app.post('/getweather', (req,res)=>{
   return axios({
    method:'get',
    url: baseURL + '/data/2.5/weather',
    params:{
      q:req.body.city,
      units: 'imperial',
      appid:'04b8e3d0941e9ffc8add608468e01320'
    }
  })
  .then(response=>{
    weatherData= response.data
    cityLat = response.data.coord.lat
    cityLon = response.data.coord.lon
  })
  // Get OneCall data using lat & lon
  .then(()=>{
    axios({
      url: baseURL + '/data/2.5/onecall',
      params:{
        lat: cityLat,
        lon: cityLon,
        units:'imperial',
        exclude:'hourly,minutely',
        appid:'04b8e3d0941e9ffc8add608468e01320'
      }
    })
    .then(response=>{res.send(response.data)})
    .then(()=>console.log(weatherData))
    .catch(err=>console.log(err))
  })
  .catch(err=>console.log(err))
})
