const mongoose = require('mongoose')
    
const termSchema = new mongoose.Schema({
    term_id: Number,
    type: String,
    key: String,
    value: String,
    description: String,
})

const Term = mongoose.model('Term', termSchema, 'term')
module.exports = Term