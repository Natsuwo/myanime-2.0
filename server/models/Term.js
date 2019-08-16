const mongoose = require('mongoose'),
    Counter = require('./Counter')
    
const termSchema = new mongoose.Schema({
    term_id: Number,
    type: String,
    key: String,
    value: String,
    description: String,
})

termSchema.pre('save', async function (next) {
    var term = this
    term.create_at = Date.now()
    var counter = await Counter.findOneAndUpdate({ key: "term" }, { $inc: { value: 1 } }, { new: true })
    term.term_id = counter.value
    next()
})

const Term = mongoose.model('Term', termSchema, 'term')
module.exports = Term