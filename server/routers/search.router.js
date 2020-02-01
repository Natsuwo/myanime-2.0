const { Router } = require('express')
const route = Router()
const { checkSecure } = require('../validate/secure.validate')
const { search } = require('../controllers/search.controller')
const Episode = require('../models/Episode')
const Anime = require('../models/Anime')
route.get('/search', checkSecure, search)
route.get('/getSiteMapEpisodes', async (req, res) => {
    var { index } = req.query
    var skip = parseInt(index) * 1000
    var episode = await Episode.find({}, { _id: 0 }).select("episode_id").limit(1000).skip(skip)
    var episodes = []
    for (var item of episode) {
        episodes.push(item.episode_id)
    }
    res.send({ success: true, code: episodes })
})
route.get('/getSiteMapAnimes', async (req, res) => {
    var { index } = req.query
    var skip = parseInt(index) * 1000
    var anime = await Anime.find({}, { _id: 0 }).select("anime_id").limit(1000).skip(skip)
    var animes = []
    for (var item of anime) {
        animes.push(item.anime_id)
    }
    res.send({ success: true, code: animes })
})

module.exports = route