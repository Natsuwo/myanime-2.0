const mongoose = require('mongoose')

const episodemetaSchema = new mongoose.Schema({
    episode_id: String,
    meta_id: Number,
    meta_key: String,
    meta_value: mongoose.Schema.Types.Mixed

})

const EpisodeMeta = mongoose.model('EpisodeMeta', episodemetaSchema, 'episodemeta')

module.exports = EpisodeMeta