const User = require('../models/User')

module.exports = {
    async validateSignIn(req, res, next) {
        try {
            var { email, password } = req.body
            if (!email || !password) {
                throw Error('Do not empty fields.')
            }
            var username = email
            var user = await User.findOne({ $or: [{ email }, { username }] }, { _id: 0, __v: 0 })

            if (!user) throw Error('Something wrong, please check again.')
            var isPasswordValid = await user.comparePassword(password)
            if (!isPasswordValid) throw Error('Wrong password.')
            user.password = undefined
            res.locals.user = user
            next()

        } catch (err) {
            return res.send({ success: false, error: err.message })
        }
    },
    // validate Sign up
    async validateSignup(req, res, next) {
        try {
            var { email, username, password, password_confirm } = req.body
            if (!email || !username || !password || !password_confirm) {
                throw Error('Do not empty fields.')
            }
            var checkUser = await User.findOne({ $or: [{ email }, { username }] })
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