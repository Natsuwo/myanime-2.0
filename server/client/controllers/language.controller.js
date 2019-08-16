const Term = require('../../models/Term')

module.exports = {
    async getFlags(req, res) {
        try {
            var flags = await Term.find({ type: 'language' }, { _id: 0 }).select('key value')
            return res.send({ result: flags })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}
