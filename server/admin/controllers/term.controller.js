const Term = require('../../models/Term')
const AnimeR = require('../../models/AnimeR')
module.exports = {
    async get(req, res) {
        try {
            var terms = await Term.find({}, { _id: 0, __v: 0 })
            return res.send({ success: true, data: terms })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async post(req, res) {
        try {
            var { key, value, type, description } = req.body
            if (req.file) {
                value = `/library/upload/image/${req.file.originalname}`
            }
            var termCreate = await Term.create({ type, key, value, description })
            return res.send({ success: true, message: 'Added', data: termCreate })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async update(req, res) {
        try {
            var { value, data } = req.body
            var { type, term_id, key, description } = JSON.parse(data)
            if (req.file) {
                value = `/library/upload/image/${req.file.originalname}`
            }
            await Term.updateOne({ term_id, type }, { key, value, description })
            var data = await Term.findOne({ term_id, type }, { __v: 0, _id: 0 })
            return res.send({ success: true, message: 'Edited.', data })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async deleteTerm(req, res) {
        try {
            var { term_id, type } = req.body
            var meta_id = term_id
            await Term.deleteOne({ term_id, type })
            await AnimeR.deleteMany({ meta_id })
            res.send({ success: true, message: 'Deleted.' })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}