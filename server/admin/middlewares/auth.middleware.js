const jwt = require('jsonwebtoken')
const User = require('../../models/User')

module.exports = {
    async checkUser(req, res, next) {

        try {
            var { userToken } = req.body
            var verify = jwt.verify(userToken, process.env.JWTSECRET)
            if (Date.now() >= verify.exp * 1000) {
                res.send({ success: false, error: 'Token is expired.' })
                return;
            }

            var userId = verify.ID
            var user = await User.findOne({ _id: userId })
            if (!user) {
                res.send({ success: false, error: 'Not found user in database' })
                return;
            }
            var usermeta = await UserMeta.findOne({ userId })
            if (!usermeta) {
                res.send({ success: false, error: 'Not found usermeta in database' })
                return;
            }
            if (usermeta.role.rank === 1 && usermeta.premium === true) {
                var date = Date.now()
                if (date > usermeta.expired) {
                    await UserMeta.updateOne({ userId }, { premium: false, 'role.rank': 0, 'role.rankname': 'Member', downloadAllowed: 2 })
                    await User.updateOne({ _id: userId }, { options: {} })
                    res.send({ success: false, error: 'Premium expired.' })
                    return;
                }
            }

            res.locals.userId = userId
            res.locals.role = usermeta.role
            res.locals.avatar = user.settings.avatar
            res.locals.expired = usermeta.expired || NaN
            next()
        } catch (err) {
            res.send({ success: false, error: err.message })
        }

    }
}