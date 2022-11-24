const express = require('express');
const router = express.Router();
const user = require('../controllers/user')

router.post('/signup', user.signUp)
router.get('/signin', user.signIn)
router.get('/signout', user.signOut)

module.exports = router;