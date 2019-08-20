const User = require('../../models/User')
const Anime = require('../../models/Anime')
const UserMeta = require('../../models/UserMeta')

module.exports = {
    async beforeFollow(req, res, next) {
        try {
            var { anime_id } = req.body
            var { user_id } = res.locals
            if (!anime_id || !user_id) throw Error('Empty value.')
            var parent_id = anime_id
            var meta_key = 'follow'
            var follow = await UserMeta.findOne({ user_id, meta_key, parent_id })
            if (follow) throw Error('Added success, check in your wall.')
            var anime = await Anime.findOne({ anime_id })
            var user = await User.findOne({ user_id })
            if (!user || !anime) throw Error('Missing value.')
            next()
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async beforeUnFollow(req, res, next) {
        try {
            var { anime_id } = req.body
            var { user_id } = res.locals
            if (!anime_id || !user_id) throw Error('Empty value.')
            var parent_id = anime_id
            var meta_key = 'follow'
            var follow = await UserMeta.findOne({ user_id, meta_key, parent_id })
            if (!follow) throw Error('You are removed this anime in your list.')
            var anime = await Anime.findOne({ anime_id })
            var user = await User.findOne({ user_id })
            if (!user || !anime) throw Error('Missing value.')
            next()
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async beforeChangeType(req, res, next) {
        try {
            var { anime_id, type } = req.body
            var { user_id } = res.locals
            if (!anime_id || !user_id || !type) throw Error('Empty value.')
            var parent_id = anime_id
            var meta_key = 'follow'
            var follow = await UserMeta.findOne({ user_id, meta_key, parent_id })
            if (!follow) throw Error('Not found.')
            var anime = await Anime.findOne({ anime_id })
            var user = await User.findOne({ user_id })
            if (!user || !anime) throw Error('Missing value.')
            next()
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}

