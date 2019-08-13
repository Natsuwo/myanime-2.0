const { Router } = require('express')
const route = Router()
const { getUserMeta } = require('../controllers/user.controller')
const { isUserLogin } = require('../middlewares/auth.middleware')

// route.get('/user/get-usermeta', isUserLogin, getUserMeta)

module.exports = route