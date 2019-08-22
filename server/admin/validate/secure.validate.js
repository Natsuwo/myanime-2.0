const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

module.exports = {
    async isUserLogin(req, res, next) {
        try {
            var token = req.headers["x-user-session"]
            if (!token) throw Error('User is not login.')
            var decodeToken = cookieParser.signedCookie(token, process.env.COOKIE_SECRET)
            var validate = jwt.verify(decodeToken, process.env.JWTSECRET)
            res.locals.user_id = validate.ID
            next()
        } catch (err) {
            return res.send({ success: false, error: err.message })
        }
    },
    async checkSecure(req, res, next) {
        try {
            var header_a = req.headers["x-myadmin"]
            var header_b = req.headers["accept-cookie"]
            if (!header_a || !header_b) {
                throw Error('Access denied.')
            }
            next();
        } catch (err) {
            return res.send({ success: false, error: err.message })
        }
    }
}