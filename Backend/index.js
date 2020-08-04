var express = require("express");
var bodyParser =  require("body-parser");
var databaseConfig = require("./databaseConfig/databaseConnection.js");
var cors =  require('cors');
var allRoutes = require("./end_points/AllRoutes.js");
var path = require('path');
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/api", allRoutes);
app.use("/public", express.static(path.join(__dirname, 'public')));

app.listen(3023);
console.log("app running in 3023");

module.exports = app;
