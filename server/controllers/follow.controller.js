const UserMeta = require('../models/UserMeta')
const Anime = require('../models/Anime')

module.exports = {
    async follow(req, res) {
        var { anime_id } = req.body
        var { user_id } = res.locals
        var meta_key = 'follow'
        var meta_value = 'watching'
        var parent_id = anime_id
        var anime = await Anime.findOne({ anime_id }, { _id: 0 }).select('title thumbnail anime_id')
        var result = await UserMeta.create({ user_id, meta_key, meta_value, parent_id })
        await Anime.updateOne({ anime_id }, { $inc: { followers: 1 } }, { new: true })
        return res.send({ success: true, status: 0, result, anime, message: "You followed this anime." })

    },
    async unfollow(req, res) {
        try {
            var { anime_id } = req.body
            var { user_id } = res.locals
            var meta_key = 'follow'
            var parent_id = anime_id
            await UserMeta.deleteOne({ user_id, parent_id, meta_key })
            await Anime.updateOne({ anime_id }, { $inc: { followers: -1 } }, { new: true })
            return res.send({ success: true, status: 1, message: "You unfollowed this anime." })
        } catch (err) {
            return res.send({ success: false, error: err.message })
        }
    },
    async changeType(req, res) {
        try {
            var { anime_id, type } = req.body
            var { user_id } = res.locals
            var meta_key = 'follow'
            var meta_value = type
            var parent_id = anime_id
            await UserMeta.updateOne({ user_id, parent_id, meta_key }, { meta_value })
            return res.send({ success: true, message: "Success." })
        } catch (err) {
            return res.send({ success: false, error: err.message })
        }
    }
}

