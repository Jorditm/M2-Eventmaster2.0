const Favorito = require('../models/favorito');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  favoritos:[{type: Schema.Types.ObjectId, ref: 'Favorito'}],
  name: String,
  email: String,
  password: String,
});

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);

module.exports = User;