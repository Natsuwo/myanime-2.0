const { Router } = require('express')
const route = Router()
const { getEpisodes, getSingleEp, loadMoreSidebar, findbyNumber } = require('../controllers/episode.controller')
const { isUserLogin } = require('../middlewares/auth.middleware')
const { checkSecure } = require('../validate/secure.validate')

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

route.get('/episode/get', checkSecure, cache('15 minutes'), getEpisodes)
route.get('/episode/sidebar-loadmore', checkSecure, loadMoreSidebar)
route.get('/episode/get-episode', checkSecure, countView, isUserLogin, getSingleEp)
route.get('/episode/jump-episode', checkSecure, findbyNumber)

module.exports = route