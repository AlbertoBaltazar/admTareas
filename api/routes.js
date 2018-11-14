var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Responsables = require("./models/responsables");
var Tareas = require("./models/tareas");


// Rutas
router.get("/responsables", function(req, res) {
    Responsables.find(function(err, docs) {
        if (err) {
            throw err
        }
        res.json(docs);
    });
});

router.post("/responsables", function(req, res) {
    var resp = new Responsables({
        _id: new mongoose.Types.ObjectId(),
        nombre:req.body.nombre
    });
    resp.save().then(function(re) {
        res.send({res:true, msg:"Responsable guardado correctamente."});
        console.log(re);
    }, function(err) {
        res.send({res:false, msg:"Ha ocurrido un error al guardar Responsable"});
        console.log(err);
    });
});

router.put("/responsables/:id", function(req, res) {
    Responsables.findById(req.params.id, function (err, responDoc) {
        if (err) {
            res.send(err);
        }
        responDoc.nombre = req.body.nombre;
        responDoc.save().then(function(re) {
            console.log(re);
            res.send({res:true, msg:"Responsable guardado correctamente."});
        }, function(err) {
            res.send({res:false, msg:"Ha ocurrido un error al guardar Responsable"});
            console.log(err);
        });
    })
});

router.delete("/responsables/:id", function(req, res) {
    Responsables.remove({
        _id:req.params.id
    }, function(err, resDoc) {
        if (err) {
            res.send(err);
        }
        console.log(resDoc);
        res.send({res:true, msg:"Responsable eliminado correctamente."});
    });
});

router.get("/tareas", function(req, res) {
    Tareas.find().populate('responsable').exec(function(err, docs) {
        if (err) {
            throw err
        }
        res.json(docs);
    });
});

router.post("/tareas", function(req, res) {
    var tarea = new Tareas({
        titulo: req.body.titulo,
        responsable: req.body.responsable,
        fechaInicio: req.body.fechaInicio,
        fechaFin: req.body.fechaFin,
        avance: req.body.avance,
        categoria: req.body.categoria
    });
    tarea.save().then(function(re){
        res.send({res:true, msg:"Tarea guardada correctamente."});
        console.log(re);
    }, function(err) {
        res.send({res:false, msg:"Ha ocurrido un error al guardar Tarea."});
        console.log(err);
    });
});

module.exports = router;
