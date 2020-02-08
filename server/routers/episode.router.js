const { Router } = require('express')
const route = Router()
const { getEpisodes, getSingleEp, loadMoreSidebar, findbyNumber, myPlayer } = require('../controllers/episode.controller')
const { isUserLogin } = require('../middlewares/auth.middleware')
const { checkSecure } = require('../validate/secure.validate')
const { cacheGroup } = require('../middlewares/cache.middleware')
const { countView } = require('../helpers/episode.helper')
const countViewMidd = async (req, res, next) => {
    var { episode_id } = req.query
    var Anime = require('../models/Anime')
    var Episode = require('../models/Episode')
    var episode = await Episode.findOne({ episode_id }, { __v: 0, _id: 0 })
    if (episode) {
        var { anime_id } = episode
        await Episode.updateOne({ episode_id }, { $inc: { views: 1 } }, { new: true })
        await Anime.updateOne({ anime_id }, { $inc: { views: 1 } }, { new: true })
        await countView(episode_id)
    }
    return next()
}

var apicache = require('apicache')
var cache = apicache.middleware
const onlyStatus200 = (req, res) => res.statusCode === 200

route.get('/episode/get', checkSecure, cacheGroup, cache('15 minutes', onlyStatus200), getEpisodes)
route.get('/episode/sidebar-loadmore', checkSecure, loadMoreSidebar)
route.get('/episode/get-episode', checkSecure, countViewMidd, cacheGroup, cache('30 minutes', onlyStatus200), isUserLogin, getSingleEp)
route.get('/episode/jump-episode', checkSecure, findbyNumber)
route.get('/player', cacheGroup, cache('15 minutes', onlyStatus200), myPlayer)
route.get('/drive/folder', async (req, res) => {
    try {
        res.sendFile('get.html', { root: './' })
    } catch (err) {
        res.send({ success: false, error: err.message })
    }
})

module.exports = route