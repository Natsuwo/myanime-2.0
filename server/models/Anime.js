const mongoose = require('mongoose')

const animeSchema = new mongoose.Schema({
    anime_id: String,
    title: String,
    description: String,
    rating: String,
    type: String,
    status: String,
    premiered: String,
    thumbnail: String,
    followers: {
        type: Number,
        default: 0
    },
    created_at: Number,
    updated_at: Number

})

const Anime = mongoose.model('Anime', animeSchema, 'anime')

module.exports = Anime