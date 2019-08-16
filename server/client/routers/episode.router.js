const ip = require('ip')
const { Router } = require('express')
const route = Router()
const { getEpisodes, getSingleEp, loadMoreSidebar } = require('../controllers/episode.controller')
const { isUserLogin } = require('../middlewares/auth.middleware')
const { checkSecure } = require('../validate/secure.validate')

const rateLimit = require("express-rate-limit");
const countView = rateLimit({
    windowMs: 24 * 60 * 1000,
    max: 1, // start blocking after 5 requests
    keyGenerator: (req) => {
        var rate = req.query.episode_id + ip.address()
        return rate
    },
    handler: async (req, res, next) => {
        return next()
    }
});


route.get('/episode/get', checkSecure, getEpisodes)
route.get('/episode/sidebar-loadmore', checkSecure, loadMoreSidebar)
route.get('/episode/get-episode', checkSecure, countView, isUserLogin, getSingleEp)

module.exports = route