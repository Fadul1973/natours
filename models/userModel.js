const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    select: false,
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
  passwordChangedAt: Date,
});

// Encrypting password
userSchema.pre('save', async function (next) {
  // Only run this function if the password has changed!
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});
// Comparing the password that user send and the one in the database
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(passwordTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }
  // false means not changed
  return false;
};
// Creating model out of the schema
const User = mongoose.model('User', userSchema);
module.exports = User;
