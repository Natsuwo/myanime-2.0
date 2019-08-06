const User = require('../models/User')
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

module.exports = {
    async validateSignIn(req, res, next) {
        try {
            var { email, password } = req.body

            var regex = new RegExp(escapeRegex(email), 'gi')
            var user = await User.findOne({ $or: [{ email }, { username: regex }] })

            if (!user) {
                return res.send({
                    success: false,
                    error: 'Username or email doesn\'t exist.'
                })
            }

            var isPasswordValid = await user.comparePassword(password)
            if (!isPasswordValid) {
                return res.send({
                    success: false,
                    error: 'Wrong password!'
                })
            }
            res.locals.user = {
                username: user.username,
                user_id: user.user_id
            }
            next()

        } catch (err) {
            return res.send({ success: false, error: err.message })
        }
    },
    // validate Sign up
    async validateSignup(req, res, next) {
        try {
            var { email, username, password, password_confirm } = req.body

            var regex = new RegExp(escapeRegex(username), 'gi')
            var checkUser = await User.findOne({ $or: [{ email }, { username: regex }] })
            // Check user has exist
            if (checkUser) {
                return res.send({ success: false, error: 'Username or Email already exist.' })
            }
            // Check password match
            var lowercase = /[a-z]/.test(password)
            var number = /\d/.test(password)
            var uppercase = /[A-Z]/.test(password)
            if (password.length <= 8) {
                return res.send({ success: false, error: 'Password must be greater than 8 characters.' })
            }
            if (!lowercase) {
                return res.send({ success: false, error: 'Password must be have a lowercase.' })
            }
            if (!number) {
                return res.send({ success: false, error: 'Password must be have a number.' })
            }
            if (!uppercase) {
                return res.send({ success: false, error: 'Password must be have a uppercase.' })
            }
            if (password_confirm !== password) {
                return res.send({ success: false, error: 'Comfirm password not match.' })
            }

            next()

        } catch (err) {
            return res.send({ success: false, error: err.message })
        }
    }
}