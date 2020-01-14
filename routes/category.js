const express = require('express');
const router = express.Router();
const {
  create,
  categoryById,
  read,
  update,
  remove,
  list
} = require('../controller/category');
const { userSignupValidator } = require('../validator/index');
const { requireSignin, isAuth, isAdmin } = require('../controller/auth');
const { userById } = require('../controller/user');

// @route   GET api/category/:categoryId
// @desc    Get a category by id
// @acces   Public
router.get('/category/:categoryId', read);

// @route   POST api/category/create/:userId
// @desc    Create a category
// @acces   Admin
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);

// @route   PUT api/category/categoryId/:userId
// @desc    Update a category
// @acces   Admin
// router.put(
//   '/category/:categoryId/:userId',
//   requireSignin,
//   isAuth,
//   isAdmin,
//   update
// );

// @route   DELETE api/category/:categoryId/:userId
// @desc    Create a category
// @acces   Admin
// router.delete(
//   '/category/:categoryId/:userId',
//   requireSignin,
//   isAuth,
//   isAdmin,
//   remove
// );

// @route   GET api/categories
// @desc    Get all categories
// @acces   Public
router.get('/categories', list);

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;
