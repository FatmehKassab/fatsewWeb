const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Please provide a country']
  },
  city: {
    type: String,
    required: [true, 'Please provide a city']
  },
  street: {
    type: String,
    required: [true, 'Please provide a street']
  },
  building: {
    type: String,
    required: [true, 'Please provide a building']
  },
  floor: {
    type: String,
    required: [true, 'Please provide a floor']
  },
  isDefault: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Address', addressSchema);