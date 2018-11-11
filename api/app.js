var express = require("express");
var path = require("path");
var app = express();
var routes = require("./routesApp.js");

// CONFIGURACION
app.set("view engine", 'jade');
app.set("views", path.join(__dirname, "../app/views"));

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// ROUTES
app.use("/admTareas", routes);

// console.log("Seas mamon goeys");
app.listen(8080, function(req, res) {
    console.log("Servidor corriendo");
});
