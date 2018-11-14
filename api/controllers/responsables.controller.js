var Responsables = require("../models/responsables.js");

exports.getResponsables = function (req, res) {
    Responsables.find(function(err, responsables) {
        if (err){
            res.send(err)
        }
		res.json(responsables); // devuelve todas las Personas en JSON
    });
}

exports.setResponsable = function(req, res) {
    Responsables.create({
        nombre: req.body.nombre
    }, function (err, responsable) {
        if (err) {
            res.send(err);
        }
        Responsables.find(function(errp, respo) {
            if (errp) {
                res.send(errp);
            }
            res.json(respo);
        });
    });
}
