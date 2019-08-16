const { Router } = require('express')
const route = Router()
const { checkSecure } = require('../validate/secure.validate')
const { search } = require('../controllers/search.controller')

route.get('/search', checkSecure, search)

module.exports = route