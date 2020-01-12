const express = require('express');
const router = express.Router();
const {
  create,
  listOrders,
  getStatusValues,
  orderById,
  updateOrderStatus
} = require('../controller/order');
const { requireSignin, isAuth, isAdmin } = require('../controller/auth');
const { userById } = require('../controller/user');
const { decreaseQuantity } = require('../controller/product');

// @route   POST api/order/create
// @desc    Create an order
// @acces   Public
router.post('/order/create', decreaseQuantity, create);

// @route   GET api/order/list/:userId
// @desc    List all orders
// @acces   Admin
router.get('/order/list/:userId', requireSignin, isAuth, isAdmin, listOrders);

// @route   GET api/order/create
// @desc    Get order status
// @acces   Admin
router.get(
  '/order/status-values/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  getStatusValues
);

// @route   PUT api/order/create
// @desc    Update order status
// @acces   Admin
router.put(
  '/order/:orderId/status/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  updateOrderStatus
);

router.param('userId', userById);
router.param('orderId', orderById);

module.exports = router;
