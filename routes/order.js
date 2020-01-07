const express = require('express');
const router = express.Router();
const { create, listOrders } = require('../controller/order');
const { requireSignin, isAuth, isAdmin } = require('../controller/auth');
const { userById } = require('../controller/user');
const { decreaseQuantity } = require('../controller/product');

router.post('/order/create', decreaseQuantity, create);

router.get('/order/list/:userId', requireSignin, isAuth, isAdmin, listOrders);

router.param('userId', userById);

module.exports = router;
