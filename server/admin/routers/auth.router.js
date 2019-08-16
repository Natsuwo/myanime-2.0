const { Router } = require('express')
const route = Router()
const { login, checkUserToken } = require('../controllers/auth.controller')
const { validateBeforeLogin } = require('../validate/auth.validate')

route.post('/auth/login', validateBeforeLogin, login)
route.post('/auth/check-user-token', checkUserToken)

module.exports = route