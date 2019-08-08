const { Router } = require('express')
const route = Router()
const { getEpisode, getSingleEp, getUserMeta, getSideBar } = require('../controllers/episode.controller')
const { isUserLogin } = require('../middlewares/episode.middleware')

route.get('/episode/get', getEpisode)
route.get('/episode/get-sidebar', getSideBar)
route.get('/episode/get-usermeta', isUserLogin, getUserMeta)
route.post('/episode/get-source', isUserLogin, getSingleEp)

module.exports = route