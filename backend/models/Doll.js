const mongoose = require('mongoose');

const dollSchema = new mongoose.Schema({

    body: [
      {
        type: String,
        image: String,
        price: Number
      }
    ],
    hair: [
      {
        type: String,
        image: String,
        price: Number
      }
    ],
    top: {
      type: String,
      image: String,
      price: Number
    },
    bottom: {
      type: String,
      image: String,
      price: Number
    },
    shoes: {
      type: String,
      image: String,
      price: Number
    }
  
});

module.exports = mongoose.model('Doll', dollSchema);