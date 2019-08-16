const Anime = require('../../models/Anime')
const Episode = require('../../models/Episode')

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

module.exports = {
    async search(req, res) {
        try {
            var search = req.query.q
            var regex = new RegExp(escapeRegex(search), 'gi')
            animes = await Anime
                .find({ $or: [{ title: regex }, { status: regex }, { season: regex }] }, { _id: 0 })
                .select('anime_id title followers description thumbnail')
                .limit(50)
            var results = []
            var episodeCount = []
            for (var item of animes) {
                var anime_id = item.anime_id
                var count = await Episode.countDocuments({ anime_id })
                var episode = await Episode.findOne({ anime_id })
                if (episode) {
                    results.push(episode)
                    episodeCount.push(count)
                }
            }
            res.send({ success: true, results, animes, counts: episodeCount })

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}