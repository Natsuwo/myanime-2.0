const { Router } = require('express')
const route = Router()
const { beforeFollow, beforeUnFollow, beforeChangeType } = require('../middlewares/follow.middleware')
const { follow, unfollow, changeType } = require('../controllers/follow.controller')
const { isUserLogin } = require('../middlewares/auth.middleware')
const { checkSecure } = require('../validate/secure.validate')

const rateLimit = require("express-rate-limit");
const limitAction = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    keyGenerator: (req, res) => {
        rate = res.locals.user_id
        return rate
    },
    handler: async (req, res, next) => {
        return res.send({ success: false, error: 'You doing so fast. Try again after few minutes.' })
    }
});

route.post('/follow', checkSecure, isUserLogin, limitAction, beforeFollow, follow)
route.put('/follow', checkSecure, isUserLogin, beforeChangeType, changeType)
route.delete('/follow', checkSecure, isUserLogin, limitAction, beforeUnFollow, unfollow)

module.exports = route