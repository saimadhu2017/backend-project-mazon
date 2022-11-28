const express = require('express');
const product = require('../controllers/product');
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { userIdParam } = require('../controllers/user');

router.param('userid', userIdParam)

router.post('/:userid/new-shop', isSignedIn, isAuthenticated, isAdmin, product.addProduct)

module.exports = router