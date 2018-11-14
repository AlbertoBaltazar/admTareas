var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var subTareasSchema = new Schema({
    nombre: String,
    responsable: {type:Schema.ObjectId, ref: 'Responsables'},
    fechaFin: {type: Date, default:Date.now}
});

var Subtareas = mongoose.model('Subtareas', subTareasSchema);

model.exports = Subtareas;
