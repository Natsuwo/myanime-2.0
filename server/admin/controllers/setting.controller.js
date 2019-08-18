const fs = require('fs');
const UserAdmin = require('../../models/UserAdmin')

module.exports = {
    async profile(req, res) {
        try {
            var { user_id } = res.locals
            var user = await UserAdmin.findOne({ user_id }, { __v: 0, _id: 0, password: 0, pin: 0 })
            res.send({ success: true, data: user })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async updateProfile(req, res) {
        try {
            var { avatar } = req.body
            var { user_id } = res.locals
            if (req.file) {
                avatar = `/library/upload/profile/admin/${req.file.originalname}`
            }
            await UserAdmin.updateOne({ user_id }, { avatar })
            res.send({ success: true, message: "You got this." })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async getSetting(req, res) {
        try {
            var setting = fs.readFileSync('./items/settings.json', { encoding: 'utf8' })
            res.send({ success: true, data: JSON.parse(setting) })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async updateSetting(req, res) {
        try {
            fs.writeFileSync('./items/settings.json', JSON.stringify(req.body), { encoding: 'utf8' });
            res.send({ success: true, message: 'You got this.' })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}