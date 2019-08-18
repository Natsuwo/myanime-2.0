const jwt = require('jsonwebtoken')
const UserAdmin = require('../../models/UserAdmin')

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 1
    return jwt.sign(user, process.env.JWTSECRET, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async signUp(req, res) {
        try {
            var { username, email, password, pin, role } = req.body
            await UserAdmin.create({ username, email, password, pin, role })
            res.send({ success: true, message: 'You got this.' })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    // Login
    async signIn(req, res) {
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
    }

}