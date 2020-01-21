const { Router } = require('express')
const route = Router()
const { checkSecure } = require('../validate/secure.validate')
const { search } = require('../controllers/search.controller')
const Episode = require('../models/Episode')
route.get('/search', checkSecure, search)
route.get('/getSiteMapRoutes', async (req, res) => {
    var { index } = req.query
    var skip = parseInt(index) * 1000
    var episode = await Episode.find({}, { _id: 0 }).select("episode_id").limit(1000).skip(skip)
    var episodes = []
    for (var item of episode) {
        episodes.push(item.episode_id)
    }
    res.send({ success: true, code: episodes })
})
route.get('/total-sitemap', async (req, res) => {
    var total = await Episode.countDocuments()
    var totalPage = Math.ceil(total / 1000)
    res.send({ success: true, total: totalPage })
})

module.exports = route