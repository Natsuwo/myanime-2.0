const User = require('../models/User')
const Comment = require('../models/Comment')
const UserMeta = require('../models/UserMeta')

module.exports = {
    async getComment(req, res) {
        try {
            var episode_id = req.headers["x-episode-id"]
            // var { user_id } = res.locals
            var comments = await Comment.find({ episode_id }, { __v: 0, _id: 0 }).sort({ created_at: -1 })
            var total = await Comment.countDocuments({ episode_id })
            for (let item of comments) {
                var user_id = item.user_id
                var user = await User.findOne({ user_id }, { _id: 0 }).select('username')
                var parent_id = item.comment_id
                var isHeart = await UserMeta.findOne({ user_id, parent_id }).select('meta_value')
                if (!isHeart) {
                    isHeart = {
                        meta_value: false
                    }
                }
                item.set('edit', false, { strict: false })
                item.set('show', false, { strict: false })
                item.set('user', user, { strict: false })
                item.set('isHeart', isHeart.meta_value, { strict: false })
            }
            res.send({ success: true, comments, total })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async postComment(req, res) {
        var { user_id, episode_id, comment } = req.body
        var response = await Comment.create({ user_id, episode_id, comment })
        var user_id = response.user_id
        var user = await User.findOne({ user_id }, { _id: 0 }).select('username')
        response.__v = undefined
        response.set('edit', false, { strict: false })
        response.set('show', false, { strict: false })
        response.set('user', user, { strict: false })
        return res.send({ success: true, result: response })
    },
    async editComment(req, res) {
        var { comment_id, comment } = req.body
        await Comment.updateOne({ comment_id }, { comment })
        return res.send({ success: true, status: 1 })
    },
    async replyComment(req, res) {
        var { user_id, episode_id, parent_id, comment } = req.body
        var response = await Comment.create({ user_id, episode_id, parent_id, comment })
        var user_id = response.user_id
        var user = await User.findOne({ user_id }, { _id: 0 }).select('username')
        response.__v = undefined
        response.set('user', user, { strict: false })
        return res.send({ success: true, result: response })
    },
    async removeComment(req, res) {
        var { comment_id } = req.body
        await Comment.deleteOne({ comment_id })
        await Comment.deleteMany({ parent_id: comment_id })
        return res.send({ success: true, status: 3, message: "Your comment has been removed." })
    },
    async attachHeart(req, res) {
        var { comment_id, user_id, isHeart } = req.body
        var meta_key = 'heart'
        var meta_value = isHeart
        var parent_id = comment_id
        await UserMeta.create({ user_id, meta_key, meta_value, parent_id })
        await Comment.updateOne({ comment_id }, { $inc: { hearts: 1 } }, { new: true })
        return res.send({ success: true, message: "You liked this comment." })
    },
    async unHeart(req, res) {
        var { comment_id, user_id } = req.body
        var meta_key = 'heart'
        var parent_id = comment_id
        await UserMeta.deleteOne({ user_id, meta_key, parent_id })
        await Comment.updateOne({ comment_id }, { $inc: { hearts: -1 } }, { new: true })
        return res.send({ success: true, message: "You liked this comment." })
    }
}

