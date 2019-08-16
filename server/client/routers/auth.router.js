const { Router } = require('express')
const route = Router()
const { checkUserToken, signUp, SignIn, signOut } = require('../controllers/auth.controller')
const { validateSignIn, validateSignup } = require('../validate/auth.validate')
const { checkSecure } = require('../validate/secure.validate')

route.post('/auth/check-user-token', checkSecure, checkUserToken)
route.post('/auth/sign-up', checkSecure, validateSignup, signUp)
route.post('/auth/sign-in', checkSecure, validateSignIn, SignIn)
route.post('/auth/sign-out', checkSecure, signOut)

module.exports = route