const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    result: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'ERROR',
    message: 'This route is not implemented yet!!',
  });
};
exports.createUsers = (req, res) => {
  res.status(500).json({
    status: 'ERROR',
    message: 'This route is not implemented yet!!',
  });
};
