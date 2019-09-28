const jwt = require('jsonwebtoken')
const User = require('../models/User')
const cookieParser = require('cookie-parser')

function jwtSignUser(user) {
    const ONE_MONTH = 60 * 60 * 24 * 60
    return jwt.sign(user, process.env.JWTSECRET, {
        expiresIn: ONE_MONTH
    })
}

module.exports = {
    async signUp(req, res) {
        try {
            var { username, email, password } = req.body
            var data = { username, email, password, rank: 0 }
            await User.create(data)
            res.send({ success: true, message: 'Your account has been successfully created.' })

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    // Login
    async SignIn(req, res) {
        try {
            var { user } = res.locals
            var userToken = {
                ID: user.user_id,
                NAME: user.username
            }

            token = jwtSignUser(userToken)
            res.send({ success: true, access: token, user, message: "You signed in." })

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    // Check USER_ACCESS_TOKEN
    async checkUserToken(req, res) {
        try {
            if (!req.headers["x-user-session"]) {
                return res.send({ success: false, error: 'Missing User Token.' })
            }
            var token = cookieParser.signedCookie(req.headers["x-user-session"], process.env.COOKIE_SECRET)
            var verify = jwt.verify(token, process.env.JWTSECRET)
            var user_id = verify.ID
            var username = verify.NAME
            var user = await User.findOne({ user_id, username }, { _id: 0, __v: 0, password: 0 })
            if (!user) throw Error('User not found.')
            if (Date.now() >= verify.exp * 1000) throw Error('Token is expired.')

            res.send({ success: true, user, token })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}