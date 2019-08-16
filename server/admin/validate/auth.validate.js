const User = require('../../models/User')
const md5 = require('md5')
module.exports = {
    async validateBeforeLogin(req, res, next) {
        try {
            var { email, password } = req.body

            var username = email.toLowerCase()
            var user = await User.findOne({ $or: [{ email }, { username }] })
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
            res.locals.user = user

            next()
        } catch (err) {
            return res.send({ success: false, error: err.message })
        }
    },
    // validate Sign up
    async validateSignup(req, res, next) {
        try {
            var {
                email,
                username,
                password,
                confirm_password } = req.body

            var checkUser = await User.findOne({ $or: [{ email }, { username }] })
            // Check user has exist
            if (checkUser) {
                res.send({ success: false, error: 'Username or Email already exist.' })
                return;
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
            if (confirm_password !== password) {
                return res.send({ success: false, error: 'Comfirm password not match.' })
            }


            var create_form = {
                email,
                username: username.toLowerCase(),
                password
            }
            var userCreate = await User.create(create_form)
            res.locals.userId = userCreate._id
            res.locals.avatar = `https://www.gravatar.com/avatar/${md5(email)}`
            next()

        } catch (err) {
            return res.send({ success: false, erorr: err.message })
        }
    }
}