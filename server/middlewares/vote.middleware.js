const UserMeta = require('../models/UserMeta')

module.exports = {
    async checkExist(req, res, next) {
        try {
            var { user_id, episode_id } = req.body
            var parent_id = episode_id
            var meta_key = 'vote'
            var vote = await UserMeta.findOne({ user_id, meta_key, parent_id })
            if (vote) {
                return res.send({ success: false, message: "You has voted." })
            }
            next()
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}

