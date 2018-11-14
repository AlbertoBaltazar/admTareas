var express = require("express");
var path = require("path");
var app = express();
var mongoose = require("mongoose");
var router = require("./routes.js");

// CONFIGURACION
app.set("views", path.join(__dirname, "../app/views"));
// mongoose.connect("mongodb://localhost:27017/admTareas");

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use("/api", router);

app.listen(8080, function(req, res) {
    console.log("Servidor corriendo en puerto " + 8080);
})
