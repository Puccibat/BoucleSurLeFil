const express = require('express');
const router = express.Router();
const { create } = require('../controller/order');

router.post('/order/create', create);

module.exports = router;
