const { Router } = require('express')
const route = Router()
const { validateDrive, getThumbnail, checkThumb } = require('../middlewares/episode.middleware')
const { get, getAnime, post, getUpdate, update, removeEpisode } = require('../controllers/episode.controller')

route.get('/episode/get', get)
route.get('/episode/update', getUpdate)
route.get('/episode/get-anime', getAnime)
route.put('/episode/update', checkThumb, update)
route.post('/episode/post', validateDrive, getThumbnail, post)
route.delete('/episode/remove-episode', removeEpisode)

module.exports = route