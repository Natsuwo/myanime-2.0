const mongoose = require('mongoose')

const episodeSchema = new mongoose.Schema({
    anime_id: String,
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


const Episode = mongoose.model('Episode', episodeSchema, 'episode')

module.exports = Episode