const { Router } = require('express')
const route = Router()
const { getEpisodes, getSingleEp, loadMoreSidebar, findbyNumber, myPlayer } = require('../controllers/episode.controller')
const { isUserLogin } = require('../middlewares/auth.middleware')
const { checkSecure } = require('../validate/secure.validate')
const { cacheGroup } = require('../middlewares/cache.middleware')
const rateLimit = require("express-rate-limit");
const countView = rateLimit({
    windowMs: 24 * 60 * 1000,
    max: 1, // start blocking after 5 requests
    keyGenerator: (req) => {
        var rate = req.query.episode_id + req.headers['x-forwarded-for'] || req.connection.remoteAddress
        return rate
    },
    handler: async (req, res, next) => {
        return next()
    }
});

var apicache = require('apicache')
var cache = apicache.middleware
const onlyStatus200 = (req, res) => res.statusCode === 200

route.get('/episode/get', checkSecure, cacheGroup, cache('15 minutes', onlyStatus200), getEpisodes)
route.get('/episode/sidebar-loadmore', checkSecure, loadMoreSidebar)
route.get('/episode/get-episode', checkSecure, cacheGroup, cache('30 minutes', onlyStatus200), countView, isUserLogin, getSingleEp)
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