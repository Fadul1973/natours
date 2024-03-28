const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requred: [true, 'Please enter your name!'],
  },

  email: {
    type: String,
    required: [true, 'Please enter your email!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide valid email'],
  },

  photo: {
    type: String,
  },

  password: {
    type: String,
    required: [true, 'Please provid password'],
    minlength: 8,
  },

  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm password'],
    // This only workS for SAVE AND CREATE
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!!',
    },
  },
});

// Creating model out of the schema
const User = mongoose.model('User', userSchema);
module.exports = User;
