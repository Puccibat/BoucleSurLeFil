const express = require('express');
const router = express.Router();
const { userById } = require('../controller/user');
const { requireSignin, isAuth, isAdmin } = require('../controller/auth');

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile
  });
});

router.param('userId', userById);

module.exports = router;
