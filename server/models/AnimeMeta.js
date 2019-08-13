const mongoose = require('mongoose')

const animemetaSchema = new mongoose.Schema({
    meta_id: Number,
    anime_id: String,
    meta_key: String,
    meta_value: mongoose.Schema.Types.Mixed

})

const AnimeMeta = mongoose.model('AnimeMeta', animemetaSchema, 'animemeta')

module.exports = AnimeMeta