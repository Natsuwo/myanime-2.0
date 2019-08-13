const { Router } = require('express')
const route = Router()
const { getAnimeChannel } = require('../controllers/anime.controller')
const { isUserLogin } = require('../middlewares/auth.middleware')
const { checkSecure } = require('../validate/secure.validate')

route.get('/anime/get-channel', checkSecure, isUserLogin, getAnimeChannel)

module.exports = route