var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var subTareasSchema = new Schema({
    idTareaPadre: String,
    nombre: String,
    responsable: String,
    fechaFin: {type: Date, default:Date.now}
});

var SubTareas = mongoose.model('SubTareas', subTareasSchema);

module.exports = SubTareas;
