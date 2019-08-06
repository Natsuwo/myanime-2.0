const Anime = require('../models/Anime')
const Episode = require('../models/Episode')
const UserMeta = require('../models/UserMeta')
const EpisodeMeta = require('../models/EpisodeMeta')

module.exports = {
    async getEpisode(req, res) {
        try {
            var episode = await Episode.find({}, { __v: 0, _id: 0 }).sort({ updated_at: 1 })
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
                var vote = vote = { meta_value: null }
                if (user_id) {
                    var parent_id = episode_id
                    var meta_key = 'vote'
                    var getVote = await UserMeta.findOne({ user_id, meta_key, parent_id }, { __v: 0, _id: 0 })
                    if (getVote) {
                        vote = getVote
                    }
                }
                episode.set('user_vote', vote.meta_value, { strict: false })

                var anime = await Anime.findOne({ anime_id }, { _id: 0 }).select('title premiered thumbnail anime_id followers')
                episode.set('anime', anime, { strict: false })
                var userFollow = {
                    follow: false,
                    noti: false
                }
                if (user_id) {
                    var parent_id = anime.anime_id
                    var meta_key = 'follow'
                    var follow = await UserMeta.findOne({ user_id, meta_key, parent_id }, { __v: 0, _id: 0 })
                    if (follow) {
                        userFollow = {
                            follow: true,
                            noti: follow.meta_value
                        }
                    }
                }
                episode.set('user_follow', userFollow, { strict: false })
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
    }
}
