const express = require('express');
const router = express.Router();
const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  productsByCategory,
  listCategories,
  photo
} = require('../controller/product');
const { userSignupValidator } = require('../validator/index');
const { requireSignin, isAuth, isAdmin } = require('../controller/auth');
const { userById } = require('../controller/user');

// @route   GET api/product/:productId
// @desc    Get one product by id
// @acces   Public
router.get('/product/:productId', read);

// @route   POST api/product/create/:userId
// @desc    Create a product
// @acces   Admin
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);

// @route   DELETE api/product/:productId/:userId
// @desc    Delete a product
// @acces   Admin
router.delete(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);

// @route   PUT api/product/:productId/:userId
// @desc    Update a product
// @acces   Admin
router.put(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);

// @route   GET api/products
// @desc    Get all products
// @acces   Public
router.get('/products', list);

// @route   GET api/products/productsBycategory/:productId
// @desc    Get products by category
// @acces   Public
router.get('/products/productsBycategory/:categoryId', productsByCategory);

// @route   GET api/products/categories
// @desc    Get products by categories
// @acces   Public
router.get('/products/categories', listCategories);

// @route   GET api//product/photo/:productId
// @desc    Get photo by product ID
// @acces   Public
router.get('/product/photo/:productId', photo);

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;
