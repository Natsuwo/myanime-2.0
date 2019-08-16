const UserMeta = require('../../models/UserMeta')
const Anime = require('../../models/Anime')

module.exports = {
    async follow(req, res) {
        var { anime_id } = req.body
        var { user_id } = res.locals
        var meta_key = 'follow'
        var meta_value = false
        var parent_id = anime_id
        var result = await UserMeta.create({ user_id, meta_key, meta_value, parent_id })
        await Anime.updateOne({ anime_id }, { $inc: { followers: 1 } }, { new: true })
        return res.send({ success: true, status: 0, result, message: "You followed this anime." })

    },
    async getNoti(req, res) {
        var { isNoti, anime_id } = req.body
        var { user_id } = res.locals
        var meta_key = 'follow'
        var meta_value = isNoti
        var parent_id = anime_id
        await UserMeta.updateOne({ user_id, meta_key, parent_id }, { meta_value })
        return res.send({ success: true, status: 0, message: "We will send notifications when new episode uploaded." })

    },
    async unNoti(req, res) {
        var { isNoti, anime_id } = req.body
        var { user_id } = res.locals
        var meta_key = 'follow'
        var meta_value = isNoti
        var parent_id = anime_id
        await UserMeta.updateOne({ user_id, meta_key, parent_id }, { meta_value })
        return res.send({ success: true, status: 0, message: "You are turn off notifications." })

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
    }
}

