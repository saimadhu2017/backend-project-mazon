const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth')

router.post('/signup', auth.signUp)
router.get('/signin', auth.signIn)
router.get('/signout', auth.signOut)

module.exports = router;