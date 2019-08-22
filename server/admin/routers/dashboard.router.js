const { Router } = require('express')
const route = Router()
const { dashBoard } = require('../controllers/dashboard.controller')
const { checkSecure, isUserLogin } = require('../validate/secure.validate')

route.get('/dashboard/index', checkSecure, isUserLogin, dashBoard)

module.exports = route