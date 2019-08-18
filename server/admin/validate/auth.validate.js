const jwt = require('jsonwebtoken')
const UserAdmin = require('../../models/UserAdmin')
const cookieParser = require('cookie-parser')

module.exports = {
    async isUserLogin(req, res, next) {
        try {
            var token = req.headers["x-user-session"]
            if (!token) {
                return next()
            }
            var decodeToken = cookieParser.signedCookie(token, process.env.COOKIE_SECRET)
            var validate = jwt.verify(decodeToken, process.env.JWTSECRET)
            res.locals.user_id = validate.ID
            next()
        } catch (err) {
            return res.send({ success: false, error: err.message })
        }
    },
    async checkUserToken(req, res) {
        try {
            if (!req.headers["x-user-session"]) {
                return res.send({ success: false, error: 'Missing User Token.' })
            }
            var token = cookieParser.signedCookie(req.headers["x-user-session"], process.env.COOKIE_SECRET)
            var verify = jwt.verify(token, process.env.JWTSECRET)
            var user_id = verify.ID
            var username = verify.NAME
            var user = await UserAdmin.findOne({ user_id, username })
            if (!user) {
                return res.send({ success: false, error: 'User not found.' })
            }
            if (Date.now() >= verify.exp * 1000) {
                return res.send({ success: false, error: 'Token is expired.' })
            }
            res.send({ success: true, user_id: verify.ID, user_name: verify.NAME, token })

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}