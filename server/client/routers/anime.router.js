const { Router } = require('express')
const route = Router()
const { getAnimeChannel, getTerms, loadmoreChannel } = require('../controllers/anime.controller')
const { isUserLogin } = require('../middlewares/auth.middleware')
const { checkSecure } = require('../validate/secure.validate')

route.get('/anime/get-channel', checkSecure, isUserLogin, getAnimeChannel)
route.get('/anime/get-term', checkSecure, getTerms)
route.get('/anime/loadmore-channel', checkSecure, loadmoreChannel)

module.exports = route