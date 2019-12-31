const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
var cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.listen(port, () => {
  console.log('Starting server at ${port}');
});



//geocode api
// $url = "https://maps.googleapis.com/maps/api/geocode/xml?address=".$street.",".$city.",".$state."&key=AIzaSyC2qDPaOb-pMuqlhNmMbDAz-FOLjZ55_ng";

//forecast api
// $url="https://api.forecast.io/forecast/59c07892494947aaa6ea323780795e77/".$latitude.",".$longitude."?exclude=minutely,hourly,alerts,flags";


//IP API:
// http://ip-api.com/json

//Autocomplete API
// https://maps.googleapis.com/maps/api/place/autocomplete/json?input=LOS&types=(cities)&language=en&key=[Your_API_Key]

console.log("INSIDE NODE PAGE");

// app.get('/', async (request, response) => {
//     response.send("hello");
// });


app.get('/weathercoord', async (request, response) => {
    const street=request.query.street;
    const city=request.query.city;
    const state=request.query.state;
    console.log(street,city,state);
    const weather_url = "https://maps.googleapis.com/maps/api/geocode/json?address="+street+","+city+","+state+"&key=AIzaSyC2qDPaOb-pMuqlhNmMbDAz-FOLjZ55_ng";
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();
    console.log(weather_data);
    response.json(weather_data);
  });


app.get('/weatherplace', async (request, response) => {
    const lat = request.query.lat;
    const lon = request.query.lon;
    console.log(lat,lon);
    const weather_url = "https://api.darksky.net/forecast/59c07892494947aaa6ea323780795e77/"+lat+","+lon;
    // https://api.darksky.net/forecast/59c07892494947aaa6ea323780795e77/34.0313572,-118.2818967?exclude=minutely,hourly,alerts,flags
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();
    response.json(weather_data);
  });


  app.get('/weatherdaily', async (request, response) => {
    const lat = request.query.lat;
    const lon = request.query.lon;
    const time = request.query.time;//unix
    console.log(lat,lon,time);
    const weather_url = "https://api.darksky.net/forecast/59c07892494947aaa6ea323780795e77/"+lat+","+lon+","+time;
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();
    response.json(weather_data);
  });



  app.get('/autocomplete', async (request, response) => {
    const cityname = request.query.cityname;
    console.log(cityname);
    const weather_url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+cityname+"&language=en&key=AIzaSyBLlKVQiUlYIsh2gi7CS4Xox4VofJxtoOI";
    // https://api.darksky.net/forecast/59c07892494947aaa6ea323780795e77/34.0313572,-118.2818967?exclude=minutely,hourly,alerts,flags
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();
    response.json(weather_data);
  });


  app.get('/customsearch', async (request, response) => {
    const statename = request.query.statename;
    console.log(statename);
    const weather_url = "https://www.googleapis.com/customsearch/v1?q="+statename+"%20State%20Seal&cx=004419260914799235048:gunxys22uab&imgSize=huge&imgType=news&num=1&searchType=image&key=AIzaSyCQrrLe2uP18dHvDJVFNvBJUdn2HSQ5a4Q";
    // https://api.darksky.net/forecast/59c07892494947aaa6ea323780795e77/34.0313572,-118.2818967?exclude=minutely,hourly,alerts,flags
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();
    response.json(weather_data);
  });

