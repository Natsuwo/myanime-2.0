const Anime = require('../../models/Anime')
const Episode = require('../../models/Episode')

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

module.exports = {
    async get(req, res) {
        try {
            var count = await Episode.countDocuments({})
            var page = parseInt(req.query.page || 1)
            var perPage = parseInt(req.query.limit || 20)
            var query = Episode.find({}, { __v: 0, _id: 0 }).sort({ created_at: -1 })
            var episodes = await query.skip((page - 1) * perPage).limit(perPage)
            var totalPage = Math.ceil(count / perPage);
            var search = req.query.q

            if (search) {
                var regex = new RegExp(escapeRegex(search), 'gi')
                var animes = await Anime.find({ $or: [{ title: regex }, { status: regex }, { season: regex }] }, { _id: 0 }).select('title anime_id')
                var episodes = []
                for (var item of animes) {
                    var items = await Episode.find({ anime_id: item.anime_id }, { __v: 0, _id: 0 }).skip((page - 1) * perPage).limit(perPage)
                    for (var episode of items) {
                        episodes.push(episode)
                    }

                }
                return res.send({ success: true, count, data: episodes, animes, meta: { page, perPage, totalPage } })
            }

            var animes = []
            for (let episode of episodes) {
                var anime_id = episode.anime_id
                var anime = await Anime.findOne({ anime_id }, { _id: 0 }).select('title anime_id')
                if (anime) animes.push(anime)
            }
            res.send({ success: true, count, data: episodes, animes, meta: { page, perPage, totalPage } })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async getAnime(req, res) {
        try {
            var animes = await Anime.find({}, { _id: 0 }).select('anime_id title thumbnail')
            res.send({ success: true, data: animes })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async post(req, res) {
        try {
            var { anime_id, title, number, description, type, audio, subtitle, fansub } = req.body
            if (!anime_id) throw Error('Missing Anime')
            var { source, thumbnail } = res.locals
            if (!thumbnail) thumbnail = ''
            var episodeCreate = await Episode.create({ anime_id, title, source, number, description, type, audio, subtitle, fansub, thumbnail })
            var episode_id = episodeCreate.episode_id
            res.send({ success: true, episode_id, message: "Added." })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async getUpdate(req, res) {
        try {
            var { episode_id } = req.query
            if (episode_id) {
                var episode = await Episode.findOne({ episode_id }, { __v: 0, _id: 0 })
                return res.send({ success: true, data: episode })
            }
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async update(req, res) {
        try {
            var { episode_id, anime_id, title, number, type, audio, subtitle, fansub } = req.body
            var { thumbnail } = res.locals
            await Episode.updateOne({ episode_id }, { anime_id, title, number, thumbnail, type, audio, subtitle, fansub })
            return res.send({ success: true, message: 'Edited.' })

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async removeEpisode(req, res) {
        try {
            var { episode_id } = req.body
            await Episode.deleteOne({ episode_id })
            return res.send({ success: true, message: 'Removed.' })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}