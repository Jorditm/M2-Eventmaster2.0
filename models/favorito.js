const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoritoSchema = new Schema({
  eventId: String,
  name: String,
  url: String,
  images: String,
  localDate: String,
  country: String,
  city: String,
  address: String,
});

favoritoSchema.set("timestamps", true);

const Favorito = mongoose.model("Favorito", favoritoSchema);

module.exports = Favorito;
