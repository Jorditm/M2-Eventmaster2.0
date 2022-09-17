const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const favoritoSchema = new Schema({
    name: String,
    url: String,
    images: String,
    localDate: String,
    
});

favoritoSchema.set('timestamps', true);

const Favorito = mongoose.model("Favorito", favoritoSchema);

module.exports = Favorito;