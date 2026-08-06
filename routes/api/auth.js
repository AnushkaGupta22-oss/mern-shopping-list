const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

// Auth Middleware
const auth = require('../../middleware/auth');

// @route   GET api/auth/user
// @desc    Get logged in user
// @access  Private
router.get('/user', auth, (req, res) => {

    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));

});

module.exports = router;