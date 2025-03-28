const fs = require('fs')
const path = require('path')
const pug = require('pug')
const Anime = require('../models/Anime')
const Episode = require('../models/Episode')
const UserMeta = require('../models/UserMeta')
const { getSource, getProxy } = require('../helpers/episode.helper')
module.exports = {
    async getRecent(req, res) {
        try {
            var animes = []
            var newUpload = await fs.readFileSync('../newupload.json', { encoding: 'utf8' })
            newUpload = JSON.parse(newUpload)
            for (var item of newUpload) {
                var anime_id = item.anime_id
                if (animes.length > 0 && animes.find(x => x.anime_id === anime_id)) {
                    continue;
                }
                var anime = await Anime.findOne({ anime_id }, { _id: 0 }).select('title anime_id')
                animes.push(anime)
            }
            return res.send({
                success: true,
                episodes: newUpload,
                animes
            })
        } catch (err) {
            res.status(204).send({ success: false, error: err.message })
        }
    },
    async getTrending(req, res) {
        try {
            // Top Trending
            var trending = await Anime.find({}, { _id: 0, __v: 0 }).limit(12)
                .sort({ views: -1 })
            return res.send({
                success: true,
                animes: trending
            })
        } catch (err) {
            res.status(204).send({ success: false, error: err.message })
        }
    },
    async getRandom(req, res) {
        try {
            // Random
            var totalAnime = await Anime.countDocuments()
            var randomNumber = Math.floor(Math.random() * totalAnime)
            var random = await Anime.find({}, { _id: 0, __v: 0 }).limit(12).skip(randomNumber)
            return res.send({
                success: true,
                animes: random
            })
        } catch (err) {
            res.status(204).send({ success: false, error: err.message })
        }
    },
    async getCurrent(req, res) {
        try {
            var Settings = fs.readFileSync('../settings.json', { encoding: 'utf8' })
            var settings = JSON.parse(Settings)
            var cur_season = settings.cur_season
            var currentAnime = await Anime.find({ season: cur_season }, { _id: 0, __v: 0 })
            return res.send({
                success: true,
                animes: currentAnime
            })
        } catch (err) {
            res.status(204).send({ success: false, error: err.message })
        }
    },
    async getSingleEp(req, res) {
        try {
            var { episode_id } = req.query
            var { user_id } = res.locals
            var episode = await Episode.findOne({ episode_id }, { __v: 0, _id: 0 })
            var source = await getProxy(episode.source)
            var backup = await getSource(episode.source)
            // backup = `https://www.googleapis.com/drive/v3/files/${episode.source}?alt=media&key=${process.env.GOOGLE_API_KEY}`
            episode.set('source', source, { strict: false })
            episode.set('backup', backup, { strict: false })
            var { anime_id, type, audio, subtitle, fansub, number } = episode
            var usermeta = []
            if (user_id) {
                usermeta = await UserMeta
                    .find({ user_id }, { __v: 0, _id: 0 })
                    .or([{ parent_id: episode_id }, { parent_id: anime_id }])
            }
            var anime = await Anime.findOne({ anime_id }, { _id: 0, __v: 0 })
            // Sidebar
            var total = await Episode.countDocuments({ anime_id, type, audio, subtitle, fansub })
            if (total <= 24) {
                var playList = await Episode
                    .find({ anime_id, type, audio, subtitle, fansub }, { _id: 0, __v: 0 })
                    .sort({ number: -1 })
            } else {
                if (number <= 23) {
                    number = 23
                }
                var skip = total - number
                if (skip <= -1) skip = 0
                var playList = await Episode
                    .find({ anime_id, type, audio, subtitle, fansub }, { _id: 0, __v: 0 })
                    .sort({ number: -1 }).skip(skip).limit(24)
            }

            var randomNumber = Math.floor(Math.random() * total)
            var randomAnime = await Anime.find({}, { _id: 0 }).limit(15).skip(randomNumber).select('title anime_id')
            var animeRandom = []
            for (let item of randomAnime) {
                var anime_id = item.anime_id
                var totalEp = await Episode.countDocuments({ anime_id })
                var randomEp = Math.floor(Math.random() * totalEp)
                var randEp = await Episode.findOne({ anime_id }, { _id: 0, source: 0 }).skip(randomEp)
                if (!randEp) continue;
                randEp.set('count', totalEp, { strict: false })
                animeRandom.push({ data: randEp, anime: item })
            }

            var result = {
                episode, anime,
                sidebar: { total, playList, animeRandom },
                usermeta
            }
            return res.send({ success: true, result })

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async loadMoreSidebar(req, res) {
        try {
            var { episode_id, skip } = req.query
            var episode = await Episode.findOne({ episode_id }, { __v: 0, _id: 0 })
            var { anime_id, type, audio, subtitle, fansub } = episode
            var playList = await Episode
                .find({ anime_id, type, audio, subtitle, fansub }, { _id: 0, __v: 0, source: 0 })
                .sort({ number: -1 }).limit(24).skip(parseInt(skip))
            res.send({ success: true, data: playList })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async findbyNumber(req, res) {
        try {
            var { anime_id, number, fansub } = req.query
            if (!anime_id && !number && !fansub) throw Error('Something error.')
            var episode = await Episode.findOne({ anime_id, number: parseInt(number), fansub }, { __v: 0, _id: 0 })
            if (!episode) throw Error('Not found.')
            return res.send({ success: true, result: episode.episode_id })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async myPlayer(req, res) {
        try {
            var { source, backup, thumbnail } = req.query
            if (!source && !backup) {
                return res.send("Access denied.")
            }
            res.send(pug.renderFile(path.join(__dirname, '../../views/player.pug'), { source, backup, thumbnail }))
        } catch (err) {
            console.log(err.message)
            return res.status(403).send("Access denied.")
        }
    }
}
