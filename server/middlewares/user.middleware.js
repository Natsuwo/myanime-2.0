const UserMeta = require('../models/UserMeta')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const SALT_FACTOR = 12;
module.exports = {
    async updatePassword(req, res, next) {
        try {
            var { user_id, cur_pass, new_pass } = req.body
            if (!cur_pass || !new_pass) return next()
            var user = await User.findOne({ user_id })
            var validPass = await user.comparePassword(cur_pass)
            if (!validPass) throw Error('Wrong current password.')
            var salt = await bcrypt.genSalt(SALT_FACTOR)
            var hashPassword = await bcrypt.hash(new_pass, salt)
            await User.updateOne({ user_id }, { password: hashPassword })
            return next()
        } catch (err) {
            return res.send({ success: false, error: err.message })
        }
    },
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
