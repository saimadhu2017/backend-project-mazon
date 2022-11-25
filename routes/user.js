const express = require('express');
const router = express.Router();
const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { getUser, userIdParam } = require('../controllers/user');

router.param('userid', userIdParam)

router.get('/:userid', isSignedIn, isAuthenticated, getUser)

module.exports = router;