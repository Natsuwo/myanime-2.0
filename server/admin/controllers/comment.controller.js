const Comment = require('../../models/Comment')
const User = require('../../models/User')
module.exports = {
    async get(req, res) {
        try {
            var comments = await Comment.find({}, { __v: 0, _id: 0 })
            var users = []
            for (let comment of comments) {
                var user_id = comment.user_id
                if (users.length > 0 && users.find(x => x.user_id === user_id)) continue;
                var user = await User.findOne({ user_id }, { _id: 0 }).select('username user_id')
                users.push(user)
            }
            return res.send({ success: true, data: { comments, users } })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async removeComment(req, res) {
        try {
            var { comment_id, episode_id } = req.body
            if (!comment_id || !episode_id) throw Error('Comment not found.')
            var comment = await Comment.findOne({ comment_id, episode_id })
            if (!comment) throw Error('Comment not found.')
            await Comment.deleteOne({ comment_id, episode_id })
            await Comment.deleteMany({ parent_id: comment_id, episode_id })
            return res.send({ success: true, message: "Removed." })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}