const express = require('express');
const router = express.Router();
const { generateToken, processPayment } = require('../controller/braintree');

// @route   GET api/braintree/getToken
// @desc    get token for payment
// @acces   Public
router.get('/braintree/getToken', generateToken);

// @route   POST api/braintree/payment
// @desc    post info payment
// @acces   Public
router.post('/braintree/payment', processPayment);

module.exports = router;
