const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth')
const { userIdParam } = require('../controllers/user')

router.param('userid', userIdParam)

router.post('/signup', auth.signUp)
router.get('/signin', auth.signIn)
router.get('/signout', auth.signOut)

router.get('/is-signed-in/:userid', auth.isSignedIn, auth.isAuthenticated, auth.userLoginValidation)

module.exports = router;