const express = require('express');
const router = express.Router();
const {
  signup,
  signin,
  signout,
  requireSignin
} = require('../controller/auth');
const { userSignupValidator } = require('../validator/index');

// @route   POST api/signup
// @desc    Registering
// @acces   Private
router.post('/signup', userSignupValidator, signup);

// @route   POST api/signin
// @desc    Connect to profile
// @acces   Private
router.post('/signin', signin);

// @route   GET api/signout
// @desc    Disconnect profile
// @acces   Private
router.get('/signout', signout);

module.exports = router;
