const Term = require('../../models/Term')
const Anime = require('../../models/Anime')
const AnimeR = require('../../models/AnimeR')
const AnimeMeta = require('../../models/AnimeMeta')

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

module.exports = {
    async get(req, res) {
        try {
            var count = await Anime.countDocuments()
            var page = parseInt(req.query.page || 1)
            var perPage = parseInt(req.query.limit || 10)
            var query = Anime.find({}, { __v: 0, _id: 0 }).sort({ created_at: -1 })
            var animes = await query.skip((page - 1) * perPage).limit(perPage)
            var totalPage = Math.ceil(count / perPage);
            var search = req.query.q

            if (search) {
                var regex = new RegExp(escapeRegex(search), 'gi')
                animes = await Anime.find({ $or: [{ title: regex }, { status: regex }, { season: regex }] })
            }

            var animeMeta = []
            for (let anime of animes) {
                var anime_id = anime.anime_id
                var animemeta = await AnimeMeta.find({ anime_id }, { _id: 0, __v: 0 })
                animeMeta.push(animemeta)
            }
            res.send({ success: true, data: { animes, meta: animeMeta, options: { page, perPage, totalPage } }, count })

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async post(req, res) {
        try {
            var { data } = req.body
            var { title, en, jp, type, rating, status, premiered, genres, season, studios, description } = JSON.parse(data)
            var thumbnail = cover = ''
            if (req.files['thumbnail']) {
                var fileName = req.files['thumbnail'][0].originalname
                thumbnail = `/library/upload/anime/thumbnail/${fileName}`
            }
            if (req.files['cover']) {
                var fileName = req.files['cover'][0].originalname
                cover = `/library/upload/anime/cover/${fileName}`
            }

            var animeCreate = await Anime.create({ title, premiered, type, rating, status, description, season, studios, thumbnail, cover })
            var anime_id = animeCreate.anime_id

            if (en) {
                await AnimeMeta.create({ anime_id, meta_key: 'en_title', meta_value: en })
            }

            if (jp) {
                await AnimeMeta.create({ anime_id, meta_key: 'jp_title', meta_value: jp })
            }

            if (genres) {
                await AnimeMeta.create({ anime_id, meta_key: 'genre', meta_value: genres })
            }
            res.send({ success: true, anime_id, message: 'Added.' })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async getUpdate(req, res) {
        try {
            var { anime_id } = req.query
            if (anime_id) {
                var anime = await Anime.findOne({ anime_id }, { _id: 0, __v: 0 })
                var animemeta = await AnimeMeta.find({ anime_id }, { _id: 0, __v: 0 })
                return res.send({ success: true, data: { anime, animemeta } })
            }
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async postUpdate(req, res) {
        try {
            var { data } = req.body
            var { anime_id, title, type, rating, status, premiered, season, studios, description, en, jp, genres, thumbnail, cover } = JSON.parse(data)

            if (req.files['thumbnail']) {
                var fileName = req.files['cover'][0].originalname
                thumbnail = `/library/upload/cover/${fileName}`
            }
            if (req.files['cover']) {
                var fileName = req.files['banner'][0].originalname
                cover = `/library/upload/banner/${fileName}`
            }

            await Anime.updateOne({ anime_id }, { thumbnail, title, type, rating, status, premiered, season, studios, description, cover })

            var en_title = await AnimeMeta.findOne({ anime_id, meta_key: 'en_title' })
            if (!en_title) await AnimeMeta.create({ anime_id, meta_key: 'en_title', meta_value: en })
            await AnimeMeta.updateOne({ anime_id, meta_key: 'en_title' }, { meta_value: en })
            var jp_title = await AnimeMeta.findOne({ anime_id, meta_key: 'jp_title' })
            if (!jp_title) await AnimeMeta.create({ anime_id, meta_key: 'jp_title', meta_value: jp })
            await AnimeMeta.updateOne({ anime_id, meta_key: 'jp_title' }, { meta_value: jp })
            await AnimeMeta.updateOne({ anime_id, meta_key: 'genre' }, { meta_value: genres })

            return res.send({ success: true, message: 'Edited.' })
        } catch (err) {
            return res.send({ succes: false, error: err.message })
        }
    },
    async removeTerm(req, res) {
        try {
            var { anime_id, meta_id } = req.body
            await AnimeR.deleteOne({ anime_id, meta_id })
            return res.send({ success: true, message: 'Removed.' })

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async removeAnime(req, res) {
        try {
            var { anime_id } = req.body
            await Anime.deleteOne({ anime_id })
            await AnimeMeta.deleteMany({ anime_id })
            return res.send({ success: true, message: 'Removed.' })

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}