const express = require('express');
const router = express.Router();
const { generateToken, processPayment } = require('../controller/braintree');

router.get('/braintree/getToken', generateToken);
router.post('/braintree/payment', processPayment);

module.exports = router;
