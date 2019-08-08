const Term = require('../models/Term')
const Anime = require('../models/Anime')
const Episode = require('../models/Episode')
const UserMeta = require('../models/UserMeta')
const EpisodeMeta = require('../models/EpisodeMeta')

module.exports = {
    async getEpisode(req, res) {
        try {
            var episode = await Episode.find({}, { __v: 0, _id: 0 }).sort({ updated_at: -1 })
            function loopData(value) {
                return new Promise((resolve) => {
                    resolve(value)
                });
            }

            async function LoopAction() {
                var promises = []
                for (let item of episode) {
                    var episode_id = item.episode_id
                    var anime_id = item.anime_id
                    var anime = await Anime.findOne({ anime_id }, { _id: 0 }).select('title anime_id')
                    item.set('anime', anime, { strict: false })
                    var episodemeta = await EpisodeMeta.find({ episode_id }, { _id: 0 }).select('meta_key meta_value')
                    for (let meta of episodemeta) {
                        item.set(meta.meta_key, meta.meta_value, { strict: false })
                    }
                    promises.push(loopData(item))
                }

                return Promise.all(promises)
            }

            LoopAction().then((data) => {
                return res.send({ success: true, data })
            })


        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async getSingleEp(req, res) {
        try {
            var { episode_id } = req.body
            var { user_id } = res.locals
            var episode = await Episode.findOne({ episode_id }, { __v: 0, _id: 0 })
            episode.source = `https://www.googleapis.com/drive/v3/files/${episode.source}?alt=media&key=${process.env.GOOGLE_API_KEY}`
            var anime_id = episode.anime_id
            var episode_id = episode.episode_id

            async function LoopAction() {
                if (user_id) {
                    var usermeta = await UserMeta
                        .find({ user_id }, { __v: 0, _id: 0 })
                        .or([{ parent_id: episode_id }, { parent_id: anime_id }])
                }
                episode.set('usermeta', usermeta || [], { strict: false })

                var anime = await Anime.findOne({ anime_id }, { _id: 0 }).select('title premiered thumbnail anime_id followers')
                episode.set('anime', anime, { strict: false })
                var episodemeta = await EpisodeMeta.find({ episode_id }, { _id: 0 }).select('meta_key meta_value')
                for (let meta of episodemeta) {
                    episode.set(meta.meta_key, meta.meta_value, { strict: false })
                }
                return episode
            }

            LoopAction().then((data) => {
                return res.send({ success: true, data })
            })


        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async getSideBar(req, res) {
        try {
            var { episode_id } = req.query
            // var { user_id } = res.locals
            var episode = await Episode.findOne({ episode_id }).select('anime_id')
            var anime_id = episode.anime_id
            var episodemeta = await EpisodeMeta
                .find({ episode_id }, { _id: 0 })
                .or([{ meta_key: 'subtitle' }, { meta_key: 'fansub' }])
                .select('meta_key meta_value')
            var lang = episodemeta.find(x => x.meta_key === 'subtitle')
            var fansub = episodemeta.find(x => x.meta_key === 'fansub')
            var flags = await Term.find({ type: 'language' }).select('key value')
            var episodes = await Episode
                .find({ anime_id }, { _id: 0 })
                .select('episode_id views title number updated_at')
                .sort({ number: -1 })
            var random = await Episode
                .aggregate([{ $sample: { size: 15 } }])
                .project('episode_id views title number updated_at anime_id')

            function loopData(value) {
                return new Promise((resolve) => {
                    resolve(value)
                });
            }
            // Random
            async function loopRandomEp() {
                var promises = []
                for (let item of random) {
                    var episode_id = item.episode_id
                    var anime_id = item.anime_id
                    var anime = await Anime.findOne({ anime_id }, { _id: 0 }).select('title anime_id')
                    var meta = await EpisodeMeta.find({ episode_id }, { _id: 0 }).select('meta_key meta_value')
                    promises.push(loopData({ data: item, anime, meta }))
                }

                return Promise.all(promises)
            }
            // Recent Ep
            async function loopRecentEp() {
                var promises = []
                for (let item of episodes) {
                    var episode_id = item.episode_id
                    var meta = await EpisodeMeta
                        .find({ episode_id }, { _id: 0 })
                        .or([{ meta_key: 'subtitle' }, { meta_key: 'fansub' }])
                        .select('meta_key meta_value')
                    var langx = meta.find(x => x.meta_key === 'subtitle')
                    var fansubx = meta.find(x => x.meta_key === 'fansub')
                    if (langx.meta_value !== lang.meta_value || fansubx.meta_value !== fansub.meta_value) {
                        continue;
                    }
                    promises.push(loopData(item))
                }

                return Promise.all(promises)
            }

            var rencent = await loopRecentEp()
            var randomEp = await loopRandomEp()
            return res.send({ success: true, data: { randomEp, rencent, meta: episodemeta, flags } })

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async getUserMeta(req, res) {
        try {
            var { episode_id, anime_id } = req.query
            var { user_id } = res.locals
            var usermeta = await UserMeta
                .find({ user_id }, { __v: 0, _id: 0 })
                .or([{ parent_id: episode_id }, { parent_id: anime_id }])
            return res.send({ success: true, result: usermeta })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}
