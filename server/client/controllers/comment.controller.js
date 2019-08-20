const User = require('../../models/User')
const Comment = require('../../models/Comment')
const UserMeta = require('../../models/UserMeta')

module.exports = {
    async getComment(req, res) {
        try {
            var { episode_id } = req.query
            var comment = await Comment.find({ episode_id }, { __v: 0, _id: 0 }).sort({ created_at: -1 })
            var comments = []
            for (var item of comment) {
                var user_id = item.user_id
                var user = await User.findOne({ user_id }, { _id: 0 }).select('username avatar')
                item.set('user', user, { strict: false })
                item.set('edit', false, { strict: false })
                item.set('show', false, { strict: false })
                comments.push(item)
            }
            var total = await Comment.countDocuments({ episode_id })
            res.send({ success: true, comments, total })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async postComment(req, res) {
        var { episode_id, comment } = req.body
        var { user_id } = res.locals
        var response = await Comment.create({ user_id, episode_id, comment })
        var user_id = response.user_id
        var user = await User.findOne({ user_id }, { _id: 0 }).select('username')
        response.set('edit', false, { strict: false })
        response.set('show', false, { strict: false })
        response.set('user', user, { strict: false })
        return res.send({ success: true, result: response, message: "Your comment has been public." })
    },
    async editComment(req, res) {
        var { comment_id, comment, episode_id } = req.body
        await Comment.updateOne({ comment_id, episode_id }, { comment })
        return res.send({ success: true, status: 1 })
    },
    async replyComment(req, res) {
        var { episode_id, parent_id, comment } = req.body
        var { user_id } = res.locals
        var response = await Comment.create({ user_id, episode_id, parent_id, comment })
        var user_id = response.user_id
        var user = await User.findOne({ user_id }, { _id: 0 }).select('username')
        response.set('user', user, { strict: false })
        return res.send({ success: true, result: response, message: "Your comment has been public." })
    },
    async removeComment(req, res) {
        var { user_id } = res.locals
        var { comment_id, episode_id } = req.body
        await Comment.deleteOne({ user_id, comment_id, episode_id })
        await Comment.deleteMany({ parent_id: comment_id, episode_id })
        await UserMeta.updateOne(
            { user_id, meta_key: 'heart', parent_id: episode_id },
            { $pull: { meta_value: comment_id } })
        return res.send({ success: true, status: 3, message: "Your comment has been removed." })
    },
    async attachHeart(req, res) {
        try {
            var { episode_id, comment_id } = req.body
            var { user_id } = res.locals
            var meta_key = 'heart'
            var parent_id = episode_id
            var usermeta = await UserMeta.findOne({ user_id, meta_key, parent_id })
            if (!usermeta) {
                var meta_value = []
                meta_value.push(comment_id)
                usermeta = await UserMeta.create({ user_id, meta_key, meta_value, parent_id })
                await Comment.updateOne({ comment_id }, { $inc: { hearts: 1 } }, { new: true })
                return res.send({ success: true, usermeta, message: "You liked this comment." })
            }
            var isHeart = usermeta.meta_value.find(x => x === comment_id)
            if (isHeart) throw Error('You already liked.')
            var meta_value = comment_id
            usermeta = await UserMeta.updateOne({ user_id, meta_key, parent_id }, { $push: { meta_value } })
            await Comment.updateOne({ comment_id }, { $inc: { hearts: 1 } }, { new: true })
            return res.send({ success: true, message: "You liked this comment." })
        } catch (err) {
            return res.send({ success: false, error: err.message })
        }
    },
    async unHeart(req, res) {
        var { comment_id, episode_id } = req.body
        var { user_id, usermeta } = res.locals
        var meta_value = comment_id
        var meta_key = 'heart'
        var parent_id = episode_id

        var isHeart = usermeta.meta_value.find(x => x === comment_id)
        if (!isHeart) throw Error('You already unliked.')
        if (usermeta.meta_value.length > 1) {
            await UserMeta.updateOne({ user_id, meta_key, parent_id }, { $pull: { meta_value } })
            await Comment.updateOne({ comment_id }, { $inc: { hearts: -1 } }, { new: true })
            return res.send({ success: true, message: "You unliked this comment." })
        }

        await UserMeta.deleteOne({ user_id, meta_key, meta_value, parent_id })
        await Comment.updateOne({ comment_id }, { $inc: { hearts: -1 } }, { new: true })
        return res.send({ success: true, message: "You unliked this comment." })
    }
}

