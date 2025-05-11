// const mongoose = require("mongoose");

// const AddressSchema = new mongoose.Schema({
//   country: {
//     type: String,
//     required: true
//   },
//   city: {
//     type: String,
//     required: true
//   },
//   street: {
//     type: String,
//     required: true
//   },
//   building: {
//     type: String,
//     required: true
//   },
//   floor: {
//     type: String,
//     required: true
//   },
//   isDefault: {
//     type: Boolean,
//     default: false
//   }
// });

// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     enum: ["user", "admin"],
//     default: "user"
//   },
//   addresses: [AddressSchema],
//   phoneNo: {
//     type: String,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model("User", UserSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Address = require('./addressModel');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  phoneNo: {
    type: String,
    required: [true, 'Please provide a phone number']
  },
  addresses: [Address.schema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Generate JWT token
userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);