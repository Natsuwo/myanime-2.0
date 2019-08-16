const { Router } = require('express')
const route = Router()
const { getFlags } = require('../controllers/language.controller')
const { checkSecure } = require('../validate/secure.validate')

route.get('/language/get-flags', checkSecure, getFlags)

module.exports = route