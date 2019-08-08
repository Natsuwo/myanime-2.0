const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = {
    async checkValidToken(req, res, next) {
        try {
            if (!req.headers["x-user-session"]) {
                return next()
            }
            var token = req.headers["x-user-session"]
            var verify = jwt.verify(token, process.env.JWTSECRET)
            var user_id = verify.ID
            var username = verify.NAME
            var user = await User.findOne({ user_id, username })
            if (!user) {
                return res.send({ success: false, error: 'Not found.' })
            }
            if (Date.now() >= verify.exp * 1000) {
                return res.send({ success: false, error: 'Session is expired.' })
            }
            next()
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}