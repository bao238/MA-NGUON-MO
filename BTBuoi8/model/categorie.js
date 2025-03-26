const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
  });

  const categories = mongoose.model('categorie', productSchema);

  module.exports = categories;
