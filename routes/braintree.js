const express = require('express');
const router = express.Router();
const { generateToken } = require('../controller/braintree');

router.get('/braintree/getToken', generateToken);

module.exports = router;
