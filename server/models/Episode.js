const mongoose = require('mongoose'),
    uniqid = require('uniqid')

const episodeSchema = new mongoose.Schema({
    anime_id: Number,
    episode_id: String,
    title: String,
    number: Number,
    description: String,
    source: String,
    type: String,
    audio: String,
    subtitle: String,
    fansub: String,
    thumbnail: String,
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    created_at: Number,
    updated_at: Number

})

episodeSchema.pre('save', async function (next) {
    var episode = this
    episode.created_at = Date.now()
    episode.updated_at = Date.now()
    episode.episode_id = uniqid()
    next()
})

const Episode = mongoose.model('Episode', episodeSchema, 'episode')

module.exports = Episode