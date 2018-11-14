var express = require("express");
var path = require("path");
var app = express();
var routes = require("./routesApp.js");
var mongoose = require("mongoose");

// CONFIGURACION
app.set("view engine", 'jade');
app.set("views", path.join(__dirname, "../app/views"));
mongoose.connect("mongodb://localhost:27017/admTareas");

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// ROUTES
app.use("/admTareas", routes);
// app.use("/responsables", routes);

// console.log("Seas mamon goeys");
app.listen(8080, function(req, res) {
    console.log("Servidor corriendo");
});
