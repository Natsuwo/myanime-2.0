const UserAdmin = require('../../models/UserAdmin')

module.exports = {
    async beforeSignIn(req, res, next) {
        try {
            var { email, password, pin } = req.body
            if (!email || !password || !pin) throw Error('Do no empty fields.')
            var username = email
            var user = await UserAdmin.findOne({ $or: [{ email }, { username }] })
            if (!user) throw Error('Something wrong, please check it and try again.')

            var isPasswordValid = await user.comparePassword(password)
            if (!isPasswordValid || user.pin != pin) throw Error('Something wrong, please check it and try again.')
            res.locals.user = user
            next()
        } catch (err) {
            return res.send({ success: false, error: err.message })
        }
    },
    // validate Sign up
    async beforeSignUp(req, res, next) {
        try {
            var { username, email } = req.body
            var checkUser = await UserAdmin.findOne({ $or: [{ email }, { username }] })
            if (checkUser) throw Error('User already exist.')
            next()
        } catch (err) {
            return res.send({ success: false, error: err.message })
        }
    }
}