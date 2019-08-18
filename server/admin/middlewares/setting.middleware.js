const UserAdmin = require('../../models/UserAdmin')
const bcrypt = require('bcrypt')
const SALT_FACTOR = 12;

module.exports = {
    async changePassword(req, res, next) {
        try {
            var { form } = req.body
            var { cr_pass, new_pass, re_pass } = JSON.parse(form)
            var { user_id } = res.locals
            if (!cr_pass || !new_pass || !re_pass) return next()
            var user = await UserAdmin.findOne({ user_id })
            if (!user) throw Error('User not found.')
            var isPasswordValid = await user.comparePassword(cr_pass)
            if (!isPasswordValid) throw Error('Wrong current password.')
            if (new_pass != re_pass) throw Error('Password not match.')

            var salt = await bcrypt.genSalt(SALT_FACTOR)
            var hashPassword = await bcrypt.hash(new_pass, salt)
            await UserAdmin.updateOne({ user_id }, { password: hashPassword })
            res.locals.user = user
            next()
        } catch (err) {
            return res.send({ success: false, error: err.message })
        }
    },
    async changePin(req, res, next) {
        try {
            var { form } = req.body
            var { cr_pin, new_pin, re_pin } = JSON.parse(form)
            if (!cr_pin || !new_pin || !re_pin) return next()
            var { user_id } = res.locals
            var user = await UserAdmin.findOne({ user_id })
            if (!cr_pin || !new_pin || !re_pin) return next()
            if (cr_pin != user.pin) throw Error('Wrong current pin.')
            if (new_pin != re_pin) throw Error('Pin no match.')
            await UserAdmin.updateOne({ user_id }, { pin: new_pin })
            next()
        } catch (err) {
            return res.send({ success: false, error: err.message })
        }
    }
}