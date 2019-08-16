const Term = require('../../models/Term')
const Anime = require('../../models/Anime')
const AnimeR = require('../../models/AnimeR')
const Episode = require('../../models/Episode')
const UserMeta = require('../../models/UserMeta')

module.exports = {
    async getEpisodes(req, res) {
        try {
            // New
            var animes = []
            var newUpload = await Episode.find({}, { __v: 0, _id: 0 }).sort({ updated_at: -1 }).limit(12)
            for (var item of newUpload) {
                var anime_id = item.anime_id
                if (animes.length > 0 && animes.find(x => x.anime_id === anime_id)) {
                    continue;
                }
                var anime = await Anime.findOne({ anime_id }, { _id: 0 }).select('title anime_id')
                animes.push(anime)
            }
            // Recommended
            var recommended = await Episode.find({}, { __v: 0, _id: 0 }).sort({ likes: -1 }).limit(12)
            for (var item of recommended) {
                var anime_id = item.anime_id
                if (animes.length > 0 && animes.find(x => x.anime_id === anime_id)) {
                    continue;
                }
                var anime = await Anime.findOne({ anime_id }, { _id: 0 }).select('title anime_id')
                animes.push(anime)
            }
            // Random
            var random = await Episode.aggregate([{ $sample: { size: 12 } }])
            for (var item of random) {
                var anime_id = item.anime_id
                if (animes.length > 0 && animes.find(x => x.anime_id === anime_id)) {
                    continue;
                }
                var anime = await Anime.findOne({ anime_id }, { _id: 0 }).select('title anime_id')
                animes.push(anime)
            }
            // Top Trending
            var topTrending = await Episode.find({}, { __v: 0, _id: 0 }).sort({ views: -1 }).limit(12)
            for (var item of topTrending) {
                var anime_id = item.anime_id
                if (animes.length > 0 && animes.find(x => x.anime_id === anime_id)) {
                    continue;
                }
                var anime = await Anime.findOne({ anime_id }, { _id: 0 }).select('title anime_id')
                animes.push(anime)
            }
            // Current Season
            var currentSeason = []
            var currentAnime = await Anime.find({ season: 'Summer 2019' }, { _id: 0 }).limit(12).select('title anime_id')
            for (var item of currentAnime) {
                var anime_id = item.anime_id
                if (animes.length > 0 && animes.find(x => x.anime_id === anime_id)) {
                    continue;
                }
                var episode = await Episode.findOne({ anime_id }, { _id: 0 }).sort({ updated_at: -1 }).limit(12)
                currentSeason.push(episode)
                animes.push(item)
            }
            return res.send({
                success: true,
                episodes: {
                    recent: newUpload,
                    recoment: recommended,
                    random,
                    trending: topTrending,
                    current: currentSeason
                },
                animes
            })

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async getSingleEp(req, res) {
        try {
            var { episode_id } = req.query
            var { user_id } = res.locals
            var episode = await Episode.findOne({ episode_id }, { __v: 0, _id: 0 })
            episode.source = `https://www.googleapis.com/drive/v3/files/${episode.source}?alt=media&key=${process.env.GOOGLE_API_KEY}`
            var { anime_id, type, audio, subtitle, fansub } = episode
            var usermeta = []
            if (user_id) {
                usermeta = await UserMeta
                    .find({ user_id }, { __v: 0, _id: 0 })
                    .or([{ parent_id: episode_id }, { parent_id: anime_id }])
            }
            var anime = await Anime.findOne({ anime_id }, { _id: 0, __v: 0 })
            // Sidebar
            var total = await Episode.countDocuments({ anime_id, type, audio, subtitle, fansub })
            var playList = await Episode
                .find({ anime_id, type, audio, subtitle, fansub }, { _id: 0, __v: 0 })
                .sort({ number: -1 }).limit(24)
            var random = await Episode
                .aggregate([{ $sample: { size: 15 } }])
                .project({ _id: 0, __v: 0 })
            var animeRandom = []
            for (let item of random) {
                var anime_id = item.anime_id
                var animes = await Anime.findOne({ anime_id }, { _id: 0 }).select('title')
                animeRandom.push({ data: item, anime: animes })
            }

            if (req.rateLimit.limit >= req.rateLimit.current) {
                await Episode.updateOne({ episode_id }, { $inc: { views: 1 } }, { new: true })
            }
            return res.send({
                success: true,
                result: {
                    episode,
                    anime,
                    sidebar: {
                        total,
                        playList,
                        animeRandom
                    },
                    usermeta
                }
            })

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async loadMoreSidebar(req, res) {
        try {
            var { episode_id, skip } = req.query
            var episode = await Episode.findOne({ episode_id }, { __v: 0, _id: 0 })
            var { anime_id, type, audio, subtitle, fansub } = episode
            var playList = await Episode
                .find({ anime_id, type, audio, subtitle, fansub }, { _id: 0, __v: 0 })
                .sort({ number: -1 }).limit(24).skip(parseInt(skip))
            res.send({ success: true, data: playList })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}
