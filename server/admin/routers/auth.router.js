const { Router } = require('express')
const route = Router()
const { signIn, signUp } = require('../controllers/auth.controller')
const { beforeSignIn, beforeSignUp } = require('../middlewares/auth.middleware')
const { checkUserToken } = require('../validate/auth.validate')

route.post('/auth/sign-in', beforeSignIn, signIn)
route.post('/auth/sign-up', beforeSignUp, signUp)
route.post('/auth/check-user-token', checkUserToken)

module.exports = route