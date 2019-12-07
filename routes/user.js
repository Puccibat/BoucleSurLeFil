const express = require('express');
const router = express.Router();
const { userById } = require('../controller/user');
const { requireSignin } = require('../controller/auth');

router.get('/secret/:userId', requireSignin, (req, res) => {
  res.json({
    user: req.profile
  });
});

router.param('userId', userById);

module.exports = router;
