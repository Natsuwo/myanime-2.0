const Term = require('../../models/Term')

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}
module.exports = {
    async checkMiddleware(req, res, next) {
        try {
            var { key, type } = req.body
            if (!key) {
                return res.send({ success: false, error: 'Missing name.' })
            }

            var regex = new RegExp(escapeRegex(key), 'gi')
            var termFound = await Term.findOne({ key: regex, type })
            if (!termFound) {
                return next()
            }
            return res.send({ success: false, error: `This ${type} already exist.` })

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}