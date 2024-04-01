const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

// Create JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

// Login functionality
exports.login = catchAsync(async (req, res, next) => {
  // 1) Check if email and password are exist
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new AppError('You must provid correct email and password!!', 404)
    );
  }
  // 2)Check if user exist and pawword correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password!!', 404));
  }
  // 3)Check if everything is ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    sutatus: 'success',
    token,
  });
});

// Protecting tour route
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get the token and check if exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // Check if token exists
  if (!token) {
    return next(
      new AppError('You are not loged in please login to get access!!', 404)
    );
  }
  // 2) Verification token if its expires
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) Check the user still exists
  const currenthUser = await User.findById(decoded.id);
  if (!currenthUser) {
    return next(
      new AppError('The user belogigng to this token is not exist!', 404)
    );
  }
  // 4) Check if user changed the password after the token issued
  if (currenthUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recenyly changed password! Please login again', 404)
    );
  }
  // Then grant access to the next route
  req.user = currenthUser;
  next();
});
