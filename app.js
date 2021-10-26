const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res) {
  const city = req.body.city;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=1a15dbf98065192752196c5e0eb7bce8&units=metric";
  https.get(url, function(ress) {
    ress.on("data", function(data) {
      const weatherData = JSON.parse(data); //make the data on a javascript object mode
      const weatherDescription = weatherData.weather[0].description;
      const temp = weatherData.main.temp;
      res.write("<h1>the weather in" +city+" is " + weatherDescription + " and the temperature is " + temp + " degrees Celsius. </h1>");
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<img src=" + imageUrl + ">");
      res.send();

    });

  });
});


app.listen(3000, function() {
  console.log("Server running on port 3000");
});
