var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var responsableSchema = new Schema({
    nombre: String
});

var Responsable = mongoose.model("Responsable", responsableSchema);

module.exports.Responsable = Responsable;
