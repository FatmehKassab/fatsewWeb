const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser
} = require('../controllers/userController');

// /api/users
router.route('/')
  .get(getUsers)
  .post(createUser);

// /api/users/:id
router.route('/:id')
  .get(getUserById);

// router.post('/auth/register', AuthController.Signup);

// // User Signin
// router.post('/auth/login', AuthController.Signin);

// // Request OTP
// router.post('/auth/request-otp', AuthController.requestOTP);

// // Verify OTP
// router.post('/auth/verify-otp', AuthController.verifyOTP);
 
// // Request OTP for Password Reset
// router.post('/auth/forgot-password', AuthController.requestPasswordReset); 

//  // Reset Password
// router.post('/auth/reset-password', AuthController.resetPassword);

module.exports = router;