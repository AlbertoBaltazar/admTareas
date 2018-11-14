var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/admTareas");
var responsableSchema = new Schema({
    _id:Schema.Types.ObjectId,
    nombre: String
});

var Responsables = mongoose.model("Responsables", responsableSchema);

module.exports = Responsables;
