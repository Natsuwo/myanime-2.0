const User = require('../models/User')
const Anime = require('../models/Anime')
const AnimeMeta = require('../models/AnimeMeta')
const UserMeta = require('../models/UserMeta')
const Noti = require('../models/Noti')

module.exports = {
    async updateProfile(req, res) {
        try {
            var { avatar } = req.body
            var { user_id } = res.locals
            var { files } = res.locals
            if (files) {
                if (files['avatar']) {
                    avatar = files['avatar'] || '/default-avatar.png'
                }
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
            var follow = await UserMeta
                .find({
                    user_id, meta_key: "follow",
                    $or: [{ meta_value: "watching" },
                    { meta_value: "considering" }]
                },
                    { __v: 0, _id: 0 })
                .limit(7).sort({ _id: -1 })
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
    async getLists(req, res) {
        try {
            var { user_id } = res.locals
            var query = UserMeta.find({ user_id, meta_key: "follow" }, { __v: 0, _id: 0 })
            var all = await query.limit(12)
            var watching = await query.find({ meta_value: "watching" }).limit(12)
            var considering = await query.find({ meta_value: "considering" }).limit(12)
            var completed = await query.find({ meta_value: "completed" }).limit(12)
            var skipping = await query.find({ meta_value: "skipping" }).limit(12)


            var follow = watching.concat(considering, completed, skipping, all)
            var animes = []
            var metas = []
            for (var item of follow) {
                var anime_id = item.parent_id
                if (animes.length > 0 && animes.find(x => x.anime_id === anime_id)) {
                    continue;
                }
                var anime = await Anime.findOne({ anime_id }, { _id: 0 }).select('title thumbnail anime_id description')
                if (anime) {
                    var animemeta = await AnimeMeta.findOne({ meta_key: "genre", anime_id }, { __v: 0, _id: 0 }) || []
                    var meta = {}
                    animes.push(anime)
                    meta[anime_id] = animemeta.meta_value
                    metas.push(meta)
                }
            }
            res.send({ success: true, data: { animes, metas, follow: { watching, considering, completed, skipping, all } } })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async loadmoreLists(req, res) {
        try {
            var { user_id } = res.locals
            var { type, skip } = req.query
            if (type === 'all') {
                var results = await UserMeta
                    .find({ user_id, meta_key: "follow" }, { __v: 0, _id: 0 })
                    .skip(parseInt(skip)).limit(12)
            } else {
                var results = await UserMeta
                    .find({ user_id, meta_key: "follow", meta_value: type }, { __v: 0, _id: 0 })
                    .skip(parseInt(skip)).limit(12)
            }
            var animes = []
            var metas = []
            for (var item of results) {
                var anime_id = item.parent_id
                var anime = await Anime.findOne({ anime_id }, { _id: 0 }).select('title thumbnail anime_id description')
                if (anime) {
                    var animemeta = await AnimeMeta.findOne({ meta_key: "genre", anime_id }, { __v: 0, _id: 0 }) || []
                    var meta = {}
                    animes.push(anime)
                    meta[anime_id] = animemeta.meta_value
                    metas.push(meta)
                }
            }
            res.send({ success: true, data: { animes, metas, result: results } })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async getNoti(req, res) {
        try {
            var { user_id } = res.locals
            var noti = await Noti.find({ user_id }, { _id: 0, __v: 0 }).sort({ created_at: -1 })
            res.send({ success: true, results: noti })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async readNoti(req, res) {
        try {
            var { user_id } = res.locals
            var { episode_id } = req.body
            await Noti.updateOne({ episode_id, user_id }, { read: true })
            res.send({ success: true })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}