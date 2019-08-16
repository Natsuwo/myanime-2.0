const mongoose = require('mongoose')

const usermetaSchema = new mongoose.Schema({
    user_id: Number,
    parent_id: mongoose.Schema.Types.Mixed,
    meta_key: mongoose.Schema.Types.Mixed,
    meta_value: mongoose.Schema.Types.Mixed
})

const UserMeta = mongoose.model('UserMeta', usermetaSchema, 'usermeta')

module.exports = UserMeta