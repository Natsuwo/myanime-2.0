const { Router } = require('express')
const route = Router()
const { get } = require('../controllers/comment.controller')

route.get('/comment/get', get)

module.exports = route