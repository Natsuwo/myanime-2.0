const { Router } = require('express')
const route = Router()
const { validateDrive, getThumbnail } = require('../middlewares/episode.middleware')
const { get, getAnime, post, update, removeEpisode } = require('../controllers/episode.controller')

route.get('/episode/get', get)
route.get('/episode/update', update)
route.get('/episode/get-anime', getAnime)
route.post('/episode/post', validateDrive, getThumbnail, post)
route.post('/episode/update', update)
route.post('/episode/remove-episode', removeEpisode)

module.exports = route