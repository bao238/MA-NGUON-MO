const mongoose = require('mongoose');

// main().catch(err => console.log(err));

 async function connectMongo() {
  await mongoose.connect('mongodb://127.0.0.1:27017/config');
  console.log('Connected!');
}

module.exports = connectMongo ;