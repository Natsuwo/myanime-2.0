const { Router } = require('express')
const route = Router()
const { getEpisode, getSingleEp } = require('../controllers/episode.controller')
const { isUserLogin } = require('../middlewares/episode.middleware')

route.get('/episode/get', getEpisode)
route.post('/episode/get-source', isUserLogin, getSingleEp)

module.exports = route