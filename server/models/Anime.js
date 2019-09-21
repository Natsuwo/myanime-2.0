const mongoose = require('mongoose'),
    Counter = require('./Counter')

const animeSchema = new mongoose.Schema({
    anime_id: Number,
    title: String,
    description: String,
    rating: String,
    type: String,
    status: String,
    premiered: String,
    season: String,
    studios: String,
    thumbnail: String,
    cover: String,
    views: Number,
    followers: {
        type: Number,
        default: 0
    },
    created_at: Number,
    updated_at: Number

})

animeSchema.pre('save', async function (next) {
    var anime = this
    anime.created_at = Date.now()
    anime.updated_at = Date.now()
    var counter = await Counter.findOneAndUpdate({ key: "anime" }, { $inc: { value: 1 } }, { new: true })
    anime.anime_id = counter.value
    next()
})

animeSchema.pre('updateOne', function (next) {
    var update = this.getUpdate()
    update.$set = update.$set || {};
    update.$set.updated_at = Date.now();
    next()
})

const Anime = mongoose.model('Anime', animeSchema, 'anime')

module.exports = Anime