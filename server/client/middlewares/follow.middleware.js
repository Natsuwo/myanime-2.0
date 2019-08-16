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
            if (follow) throw Error('You are followed this anime.')
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
            if (!follow) throw Error('You are unFollowed this anime.')
            var anime = await Anime.findOne({ anime_id })
            var user = await User.findOne({ user_id })
            if (!user || !anime) throw Error('Missing value.')
            next()
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async beforeNoti(req, res, next) {
        try {
            var { isNoti } = req.body
            if (isNoti !== true) throw Error('You are already turn on notification.')
            next()
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async beforeUnNoti(req, res, next) {
        try {
            var { isNoti } = req.body
            if (isNoti !== false) throw Error('You are already turn off notification.')
            next()
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}

