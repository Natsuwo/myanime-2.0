const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const cookieParser = require('cookie-parser')

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 1
    return jwt.sign(user, process.env.JWTSECRET, {
        expiresIn: ONE_WEEK
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
            res.cookie('USER_ACCESS_TOKEN', token, {
                signed: true,
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1)
            })
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
            var user = await User.findOne({ user_id, username })
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
    },
    async signOut(req, res) {
        try {
            res.clearCookie('USER_ACCESS_TOKEN')
            res.send({ success: true, message: 'You are signOut.' })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
}