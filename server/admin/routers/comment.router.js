const { Router } = require('express')
const route = Router()
const { get, removeComment } = require('../controllers/comment.controller')
const { checkSecure, isUserLogin } = require('../validate/secure.validate')

route.get('/comment/get', checkSecure, isUserLogin, get)
route.delete('/comment/remove', checkSecure, isUserLogin, removeComment)

module.exports = route