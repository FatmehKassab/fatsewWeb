const express = require('express');
const {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
  addAddress,
  updateAddress
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/address', protect, addAddress);
router.put('/address/:id', protect, updateAddress);

module.exports = router;