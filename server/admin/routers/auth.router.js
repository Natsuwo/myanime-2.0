const { Router } = require('express')
const route = Router()
const { signIn, signUp } = require('../controllers/auth.controller')
const { beforeSignIn, beforeSignUp } = require('../middlewares/auth.middleware')
const { checkUserToken } = require('../validate/auth.validate')
const { checkSecure } = require('../validate/secure.validate')

route.post('/auth/sign-in', checkSecure, beforeSignIn, signIn)
route.post('/auth/sign-up', checkSecure, beforeSignUp, signUp)
route.post('/auth/check-user-token', checkSecure, checkUserToken)

module.exports = route