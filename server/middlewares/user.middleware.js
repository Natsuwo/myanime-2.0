const UserMeta = require('../models/UserMeta')

module.exports = {
    async getUserMeta(req, res, next) {
        try {
            var { episode_id, anime_id } = req.query
            var { user_id } = res.locals
            if (!user_id) {
                return next()
            }
            var userVote = await UserMeta.findOne({ user_id, meta_key: "vote", parent_id: episode_id }, { __v: 0, _id: 0 }) || []
            var userFollow = await UserMeta.findOne({ user_id, meta_key: "follow", parent_id: anime_id }, { __v: 0, _id: 0 }) || []
            var userHeart = await UserMeta.findOne({ user_id, meta_key: "heart", parent_id: episode_id }, { __v: 0, _id: 0 }) || []
            var usermeta = { userVote, userFollow, userHeart }
            res.locals.usermeta = usermeta
            next()
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}
