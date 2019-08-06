const UserMeta = require('../models/UserMeta')

module.exports = {
    async checkExist(req, res, next) {
        try {
            var { user_id, anime_id } = req.body
            var parent_id = anime_id
            var meta_key = 'follow'
            var follow = await UserMeta.findOne({ user_id, meta_key, parent_id })
            if (follow) {
                return res.send({ success: false, error: "You followed this anime." })
            }
            next()
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}

