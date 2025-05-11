const User = require('../models/userModel');


// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  const { name, email, password, role, phoneNo, addresses } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
    phoneNo,
    addresses
  });

  sendTokenResponse(user, 200, res);
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
  
    const error = new Error('Please provide an email and password');
error.statusCode = 400;
return next(error);

  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    return next(error);
   
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    return next(error);
  }

  sendTokenResponse(user, 200, res);
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
};

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
exports.updateDetails = async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
    phoneNo: req.body.phoneNo
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
};

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
exports.updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    const error = new Error('Password Incorrect');
    error.statusCode = 401;
    return next(error);
  }
  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
};

// @desc    Add address
// @route   POST /api/auth/address
// @access  Private
exports.addAddress = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  // If this is the first address, set as default
  if (user.addresses.length === 0) {
    req.body.isDefault = true;
  }

  user.addresses.push(req.body);
  await user.save();

  res.status(200).json({
    success: true,
    data: user.addresses
  });
};

// @desc    Update address
// @route   PUT /api/auth/address/:id
// @access  Private
exports.updateAddress = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const addressIndex = user.addresses.findIndex(
    (addr) => addr._id.toString() === req.params.id
  );

  if (addressIndex === -1) {
    const error = new Error('Address Not Found');
    error.statusCode = 404;
    return next(error);
  }

  // If setting this address as default, unset others
  if (req.body.isDefault) {
    user.addresses.forEach((addr) => {
      addr.isDefault = false;
    });
  }

  user.addresses[addressIndex] = {
    ...user.addresses[addressIndex].toObject(),
    ...req.body
  };

  await user.save();

  res.status(200).json({
    success: true,
    data: user.addresses
  });
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.generateAuthToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
};