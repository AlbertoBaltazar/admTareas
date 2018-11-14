var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tareasSchema = new Schema({
    titulo: String,
    responsable:{type:Schema.Types.ObjectId, ref: 'Responsables'},
    fechaInicio: {type: Date, default:Date.now},
    fechaFin: {type: Date, default:Date.now},
    avance: Number,
    categoria: String,
    subTarea:{type:Schema.ObjectId, ref: 'Subtareas'}
});

var Tareas = mongoose.model("Tareas", tareasSchema);

module.exports = Tareas;
