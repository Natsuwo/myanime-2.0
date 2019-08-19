const User = require('../../models/User')
const Anime = require('../../models/Anime')
const AnimeMeta = require('../../models/AnimeMeta')
const UserMeta = require('../../models/UserMeta')
const md5 = require('md5')
module.exports = {
    async updateProfile(req, res) {
        try {
            var { avatar } = req.body
            var { user_id } = res.locals
            if (req.file) {
                avatar = `/library/upload/profile/user/${md5(user_id)}`
            }
            await User.updateOne({ user_id }, { avatar })
            res.send({ success: true, message: "Success.", avatar })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async getFollowAnime(req, res) {
        try {
            var { user_id } = res.locals
            var follow = await UserMeta.find({ user_id, meta_key: "follow" }, { __v: 0, _id: 0 }).limit(7)
            var animes = []
            for (var item of follow) {
                var anime_id = item.parent_id
                var anime = await Anime.findOne({ anime_id }, { _id: 0 }).select('title thumbnail anime_id')
                if (anime) animes.push(anime)
            }
            res.send({ success: true, data: animes })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async getFollowProfile(req, res) {
        try {
            var { user_id } = res.locals
            var follow = await UserMeta.find({ user_id, meta_key: "follow" }, { __v: 0, _id: 0 }).limit(12)
            var animes = []
            var metas = []
            for (var item of follow) {
                var anime_id = item.parent_id
                var anime = await Anime.findOne({ anime_id }, { _id: 0 }).select('title thumbnail anime_id description')
                if (anime) {
                    var animemeta = await AnimeMeta.findOne({ meta_key: "genre", anime_id }, { __v: 0, _id: 0 })
                    if (animemeta) {
                        var meta = {}
                        animes.push(anime)
                        meta[anime_id] = animemeta.meta_value
                        metas.push(meta)
                    }
                }
            }
            res.send({ success: true, data: { animes, metas } })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}