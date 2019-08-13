const Term = require('../models/Term')
const Anime = require('../models/Anime')
const AnimeR = require('../models/AnimeR')
const AnimeMeta = require('../models/AnimeMeta')
const Episode = require('../models/Episode')
const UserMeta = require('../models/UserMeta')

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
            var animeR = await AnimeR.find({ anime_id }, { __v: 0, _id: 0 })
            var allEpisodes = await Episode.find({ anime_id })
            var mostViews = await allEpisodes.sort((a, b) => {
                return b.views - a.views
            }).slice(0, 13)
            var newUploads = await allEpisodes.sort((a, b) => {
                return b.updated_at - a.updated_at
            }).slice(0, 13)

            var terms = []
            for (let item of animeR) {
                var meta_id = item.meta_id
                var term = await Term.findOne({ term_id: meta_id }, { __v: 0, _id: 0 })
                terms.push(term)
            }
            return res.send({
                success: true,
                episodes: {
                    all: allEpisodes,
                    most: mostViews,
                    new: newUploads
                },
                anime,
                animemeta,
                terms,
                usermeta
            })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}
