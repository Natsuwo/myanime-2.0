const { Router } = require('express')
const route = Router()
const { checkUserToken, signUp, SignIn, signOut } = require('../controllers/auth.controller')
const { validateSignIn, validateSignup } = require('../validate/auth.validate')

route.post('/auth/check-user-token', checkUserToken)
route.post('/auth/sign-up', validateSignup, signUp)
route.post('/auth/sign-in', validateSignIn, SignIn)
route.post('/auth/sign-out', signOut)

module.exports = route