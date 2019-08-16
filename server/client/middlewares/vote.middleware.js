const UserMeta = require('../../models/UserMeta')
const Episode = require('../../models/Episode')
module.exports = {
    async beforeLike(req, res, next) {
        try {
            var { episode_id } = req.body
            var { user_id } = res.locals
            if (!episode_id || !user_id) throw Error('Empty value.')
            var parent_id = episode_id
            var meta_key = 'vote'
            var vote = await UserMeta.findOne({ user_id, meta_key, parent_id })
            if (vote) throw Error('You already voted.')
            var episode = await Episode.findOne({ episode_id })
            if (!episode) throw Error('Something wrong.')
            next()
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async beforeChange(req, res, next) {
        try {
            var { episode_id } = req.body
            var { user_id } = res.locals
            if (!episode_id || !user_id) throw Error('Empty value.')
            var parent_id = episode_id
            var meta_key = 'vote'
            var vote = await UserMeta.findOne({ user_id, meta_key, parent_id })
            var episode = await Episode.findOne({ episode_id })
            if (!episode || !vote) throw Error('Something wrong.')
            next()
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async beforeDelete(req, res, next) {
        try {
            var { episode_id } = req.body
            var { user_id } = res.locals
            if (!episode_id || !user_id) throw Error('Empty value.')
            var parent_id = episode_id
            var meta_key = 'vote'
            var vote = await UserMeta.findOne({ user_id, meta_key, parent_id })
            if (!vote) throw Error('You already unliked or disliked.')
            var episode = await Episode.findOne({ episode_id })
            if (!episode) throw Error('Something wrong.')
            next()
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}

