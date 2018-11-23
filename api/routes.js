var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Responsables = require("./models/responsables");
var Tareas = require("./models/tareas");
var SubTareas = require("./models/subtareas");


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

router.get("/subtareas/:id", function(req, res) {
    SubTareas.find({"idTareaPadre":req.params.id}, function(err, docSub) {
        if (err) {
            res.send(err);
        }
        res.json(docSub);
    })
})

router.post("/subtareas", function(req, res) {
    var resp = new SubTareas({
        idTareaPadre: req.body.idTareaPadre,
        nombre: req.body.nombre,
        responsable: req.body.responsable,
        fechaFin: req.body.fechaFin
    });
    resp.save().then(function(re) {
        res.send({res:true, msg:"SubTarea guardada correctamente."});
        console.log(re);
    }, function(err) {
        res.send({res:false, msg:"Ha ocurrido un error al guardar subTarea"});
        console.log(err);
    });
});

router.put("/subtareas/:id", function(req, res) {
    SubTareas.findById(req.params.id, function (err, responDoc) {
        if (err) {
            res.send(err);
        }
        responDoc.nombre = req.body.nombre;
        responDoc.responsable = req.body.responsable;
        responDoc.fechaFin = req.body.fechaFin;
        responDoc.save().then(function(re) {
            console.log(re);
            res.send({res:true, msg:"SubTarea guardada correctamente."});
        }, function(err) {
            res.send({res:false, msg:"Ha ocurrido un error al guardar subTarea"});
            console.log(err);
        });
    })
});

router.delete("/subtareas/:id", function(req, res) {
    SubTareas.remove({
        _id:req.params.id
    }, function(err, resDoc) {
        if (err) {
            res.send(err);
        }
        console.log(resDoc);
        res.send({res:true, msg:"Responsable eliminado correctamente."});
    });
});

module.exports = router;
