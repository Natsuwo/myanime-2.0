const Term = require('../../models/Term')
const Anime = require('../../models/Anime')
const AnimeMeta = require('../../models/AnimeMeta')
const Episode = require('../../models/Episode')
const UserMeta = require('../../models/UserMeta')

module.exports = {
    async getAnimeChannel(req, res) {
        try {
            var { anime_id } = req.query
            var { user_id } = res.locals
            var usermeta = []
            if (user_id) {
                var usermeta = await UserMeta.find({ user_id, parent_id: anime_id }, { __v: 0, _id: 0 })
            }
            var anime = await Anime.findOne({ anime_id }, { __v: 0, _id: 0 })
            var animemeta = await AnimeMeta.find({ anime_id }, { __v: 0, _id: 0 })
            var query = Episode.find({ anime_id }, { __v: 0, _id: 0 })
            var mostViews = await query.sort({ views: -1 }).limit(12)
            var newUploads = await query.sort({ updated_at: -1 }).limit(12)
            var allEpisodes = await query.limit(12)
            var EngEpisodes = await query.find({ subtitle: 'English' }).limit(12)
            var CnEpisodes = await query.find({ subtitle: 'Chinese' }).limit(12)
            return res.send({
                success: true,
                episodes: {
                    all: allEpisodes,
                    most: mostViews,
                    new: newUploads,
                    eng: EngEpisodes,
                    cn: CnEpisodes
                },
                anime,
                animemeta,
                usermeta
            })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async getTerms(req, res) {
        try {
            var terms = await Term.find({}, { __v: 0, _id: 0 })
            res.send({ success: true, data: terms })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async loadmoreChannel(req, res) {
        try {
            var { anime_id, skip } = req.query
            var allEpisodes = await Episode.find({ anime_id }, { __v: 0, _id: 0 }).limit(12).skip(parseInt(skip))
            res.send({ success: true, data: allEpisodes })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}
