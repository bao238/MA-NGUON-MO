const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number,
    category_id: Number
  });

  const Product = mongoose.model('product', productSchema);

  module.exports = Product;
