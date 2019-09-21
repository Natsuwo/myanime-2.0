const mongoose = require('mongoose'),
    Counter = require('./Counter')

const animemetaSchema = new mongoose.Schema({
    meta_id: Number,
    anime_id: Number,
    meta_key: String,
    meta_value: mongoose.Schema.Types.Mixed

})

animemetaSchema.pre('save', async function (next) {
    var anime = this
    var counter = await Counter.findOneAndUpdate({ key: "animemeta" }, { $inc: { value: 1 } }, { new: true })
    anime.meta_id = counter.value
    next()
})


const AnimeMeta = mongoose.model('AnimeMeta', animemetaSchema, 'animemeta')

module.exports = AnimeMeta