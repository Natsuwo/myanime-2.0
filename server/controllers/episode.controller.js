const fs = require('fs')
const axios = require('axios')
const Anime = require('../models/Anime')
const Episode = require('../models/Episode')
const UserMeta = require('../models/UserMeta')

async function countView(episode_id) {
    var data = await fs.readFileSync('../newupload.json', { encoding: 'utf8' })
    var oldData = JSON.parse(data)
    var index = oldData.findIndex(x => x.episode_id === episode_id)
    if (index > -1) {
        oldData[index].views += 1
        await fs.writeFileSync('../newupload.json', JSON.stringify(oldData), { encoding: 'utf8' })
    }
}

async function getSource(drive_id) {
    var drDomain = process.env.DRDOMAIN
    var endpoint = drDomain + '/api/v2/hls-drive/get-data'
    var token = process.env.DRTOKEN
    var user_id = process.env.DRUSER
    var query = `?user_id=${user_id}&drive_id=${drive_id}&secret_token=${token}`
    var resp = await axios.get(endpoint + query)
    var data = resp.data
    if (!data.success) return false
    var id = data.results.id
    var link = drDomain + '/hls/' + id + '.m3u8'
    return link
}

module.exports = {
    async getEpisodes(req, res) {
        try {
            var animes = []
            var newUpload = await fs.readFileSync('../newupload.json', { encoding: 'utf8' })
            newUpload = JSON.parse(newUpload)
            for (var item of newUpload) {
                var anime_id = item.anime_id
                if (animes.length > 0 && animes.find(x => x.anime_id === anime_id)) {
                    continue;
                }
                var anime = await Anime.findOne({ anime_id }, { _id: 0 }).select('title anime_id')
                animes.push(anime)
            }
            // Recommended
            var recomAnime = []
            var recommended = await Anime.find({}, { _id: 0 }).sort({ followers: -1 }).limit(12).select('title anime_id thumbnail views')
            for (var item of recommended) {
                var anime_id = item.anime_id
                var count = await Episode.countDocuments({ anime_id })
                var episode = await Episode.findOne({ anime_id }, { _id: 0, source: 0 }).sort({ updated_at: -1 })
                if (!episode) continue;

                recomAnime.push(episode)
                episode.set('count', count, { strict: false })
                if (animes.length > 0 && animes.find(x => x.anime_id === anime_id)) {
                    var index = animes.findIndex(x => x.anime_id === anime_id)
                    animes.splice(index, 1)
                }
                animes.push(item)
            }
            // Random
            var randomAnime = []
            var totalAnime = await Anime.countDocuments()
            var randomNumber = Math.floor(Math.random() * totalAnime)
            var random = await Anime.find({}, { _id: 0 }).limit(12).skip(randomNumber).select('title anime_id thumbnail views')
            for (var item of random) {
                var anime_id = item.anime_id
                var count = await Episode.countDocuments({ anime_id })
                var episode = await Episode.findOne({ anime_id }, { _id: 0, source: 0 }).sort({ updated_at: -1 })
                if (!episode) continue;

                randomAnime.push(episode)
                episode.set('count', count, { strict: false })
                if (animes.length > 0 && animes.find(x => x.anime_id === anime_id)) {
                    var index = animes.findIndex(x => x.anime_id === anime_id)
                    animes.splice(index, 1)
                }
                animes.push(item)
            }
            // Top Trending
            var trendingAnime = []
            var trending = await Anime.find({}, { _id: 0 }).limit(12).sort({ views: -1 }).select('title anime_id thumbnail views')
            for (var item of trending) {
                var anime_id = item.anime_id
                var count = await Episode.countDocuments({ anime_id })
                var episode = await Episode.findOne({ anime_id }, { _id: 0, source: 0 }).sort({ updated_at: -1 })
                if (!episode) continue;

                trendingAnime.push(episode)
                episode.set('count', count, { strict: false })
                if (animes.length > 0 && animes.find(x => x.anime_id === anime_id)) {
                    var index = animes.findIndex(x => x.anime_id === anime_id)
                    animes.splice(index, 1)
                }
                animes.push(item)
            }
            // Current Season
            var Settings = fs.readFileSync('../settings.json', { encoding: 'utf8' })
            var settings = JSON.parse(Settings)
            var cur_season = settings.cur_season
            var currentSeason = []
            var currentAnime = await Anime.find({ season: cur_season }, { _id: 0 }).select('title anime_id thumbnail views')
            for (var item of currentAnime) {
                var anime_id = item.anime_id
                var count = await Episode.countDocuments({ anime_id })
                var episode = await Episode.findOne({ anime_id }, { _id: 0, source: 0 }).sort({ updated_at: -1 })
                if (!episode) continue;

                currentSeason.push(episode)
                episode.set('count', count, { strict: false })
                if (animes.length > 0 && animes.find(x => x.anime_id === anime_id)) {
                    var index = animes.findIndex(x => x.anime_id === anime_id)
                    animes.splice(index, 1)
                }
                animes.push(item)
            }
            var currentSeason = currentSeason.sort((a, b) => {
                return b.updated_at - a.updated_at
            }).slice(0, 12)

            return res.send({
                success: true,
                episodes: {
                    recent: newUpload,
                    recoment: recomAnime,
                    random: randomAnime,
                    trending: trendingAnime,
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
            var source = await getSource(episode.source)
            if (!source) {
                source = `https://www.googleapis.com/drive/v3/files/${episode.source}?alt=media&key=${process.env.GOOGLE_API_KEY}`
            }
            episode.set('source', source, { strict: false })
            var { anime_id, type, audio, subtitle, fansub } = episode
            var old_anime_id = anime_id
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
            var randomNumber = Math.floor(Math.random() * total)
            var randomAnime = await Anime.find({}, { _id: 0 }).limit(15).skip(randomNumber).select('title anime_id')
            var animeRandom = []
            for (let item of randomAnime) {
                var anime_id = item.anime_id
                var totalEp = await Episode.countDocuments({ anime_id })
                var randomEp = Math.floor(Math.random() * totalEp)
                var randEp = await Episode.findOne({ anime_id }, { _id: 0, source: 0 }).skip(randomEp)
                if (!randEp) continue;
                randEp.set('count', totalEp, { strict: false })
                animeRandom.push({ data: randEp, anime: item })
            }

            if (req.rateLimit.limit >= req.rateLimit.current) {
                await Episode.updateOne({ episode_id }, { $inc: { views: 1 } }, { new: true })
                await Anime.updateOne({ anime_id: old_anime_id }, { $inc: { views: 1 } }, { new: true })
                await countView(episode_id)
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
                .find({ anime_id, type, audio, subtitle, fansub }, { _id: 0, __v: 0, source: 0 })
                .sort({ number: -1 }).limit(24).skip(parseInt(skip))
            res.send({ success: true, data: playList })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}
