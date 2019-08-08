const UserMeta = require('../models/UserMeta')
const Episode = require('../models/Episode')

module.exports = {
    async votePost(req, res) {
        var { user_id, isLike, episode_id } = req.body
        var meta_key = 'vote'
        var meta_value = isLike
        var parent_id = episode_id
        var response = await UserMeta.create({ user_id, meta_key, meta_value, parent_id })
        if (isLike) {
            await Episode.updateOne({ episode_id }, { $inc: { likes: 1 } }, { new: true })
            return res.send({ success: true, result: response })
        }
        await Episode.updateOne({ episode_id }, { $inc: { dislikes: 1 } }, { new: true })
        return res.send({ success: true, result: response })
    },
    async votePut(req, res) {
        try {
            var { user_id, isLike, episode_id } = req.body
            var meta_key = 'vote'
            var meta_value = isLike
            var parent_id = episode_id
            await UserMeta.updateOne({ user_id, parent_id, meta_key }, { meta_value })
            var likes = isLike ? 1 : -1
            var dislikes = !isLike ? 1 : -1
            await Episode.updateOne({ episode_id }, { $inc: { likes, dislikes } }, { new: true })
            return res.send({ success: true, status: 1 })
        } catch (err) {
            return res.send({ success: false, error: err.message })
        }
    },
    async voteDelete(req, res) {
        try {
            var { user_id, episode_id, isLike } = req.body
            var meta_key = 'vote'
            var parent_id = episode_id
            await UserMeta.deleteOne({ user_id, meta_key, parent_id })
            var likes = isLike ? -1 : 0
            var dislikes = !isLike ? -1 : 0
            await Episode.updateOne({ episode_id }, { $inc: { likes, dislikes } }, { new: true })
            return res.send({ success: true, status: 2 })
        } catch (err) {
            return res.send({ success: false, error: err.message })
        }
    }
}

