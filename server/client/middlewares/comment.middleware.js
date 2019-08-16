const User = require('../../models/User')
const Episode = require('../../models/Episode')
const Comment = require('../../models/Comment')
const UserMeta = require('../../models/UserMeta')
module.exports = {
    async beforePost(req, res, next) {
        try {
            var { episode_id, comment } = req.body
            var { user_id } = res.locals
            if (!user_id || !episode_id || !comment) throw Error('Empty value.')
            var user = await User.findOne({ user_id })
            var episode = await Episode.findOne({ episode_id })
            if (!user || !episode) throw Error('Missing value.')
            return next()
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async beforeEdit(req, res, next) {
        try {
            var { episode_id, comment_id, comment } = req.body
            var { user_id } = res.locals
            if (!user_id || !comment || !comment_id) throw Error('Empty value.')
            var user = await User.findOne({ user_id })
            var comment = await Comment.findOne({ comment_id, episode_id })
            if (!user || !comment) throw Error('Missing value.')
            return next()
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async beforeReply(req, res, next) {
        try {
            var { episode_id, parent_id, comment } = req.body
            var { user_id } = res.locals
            if (!user_id || !episode_id || !parent_id || !comment) throw Error('Empty value.')
            var user = await User.findOne({ user_id })
            var episode = await Episode.findOne({ episode_id })
            var comment = await Comment.findOne({ comment_id: parent_id, episode_id })
            if (!user || !comment || !episode) throw Error('Missing value.')
            return next()
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async beforeDelete(req, res, next) {
        try {
            var { comment_id, episode_id } = req.body
            var { user_id } = res.locals
            if (!user_id) throw Error('Empty value.')
            var user = await User.findOne({ user_id })
            var comment = await Comment.findOne({ comment_id, episode_id })
            if (!user || !comment) throw Error('Missing value.')
            if (user_id !== comment.user_id) throw Error('Something wrong.')
            return next()
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async beforeHeart(req, res, next) {
        try {
            var { episode_id, comment_id } = req.body
            var { user_id } = res.locals
            if (!user_id || !episode_id || !comment_id) throw Error('Empty value.')
            var user = await User.findOne({ user_id })
            var episode = await Episode.findOne({ episode_id })
            var comment = await Comment.findOne({ comment_id, episode_id })
            if (!user || !comment || !episode) throw Error('Missing value.')
            return next()
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async beforeUnHeart(req, res, next) {
        try {
            var { episode_id, comment_id } = req.body
            var { user_id } = res.locals
            if (!user_id || !episode_id || !comment_id) throw Error('Empty value.')
            var user = await User.findOne({ user_id })
            var episode = await Episode.findOne({ episode_id })
            var comment = await Comment.findOne({ comment_id, episode_id })
            if (!user || !comment || !episode) throw Error('Missing value.')
            var meta_value = comment_id
            var meta_key = 'heart'
            var parent_id = episode_id
            var usermeta = await UserMeta.findOne({ user_id, meta_key, meta_value, parent_id })
            if(!usermeta) throw Error('Something wrong.')
            res.locals.usermeta = usermeta
            return next()
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}