const { Router } = require('express')
const route = Router()
const { beforeFollow, beforeUnFollow, beforeNoti, beforeUnNoti } = require('../middlewares/follow.middleware')
const { follow, unfollow, getNoti, unNoti } = require('../controllers/follow.controller')
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
route.delete('/follow', checkSecure, isUserLogin, limitAction, beforeUnFollow, unfollow)
route.put('/get-noti', checkSecure, isUserLogin, limitAction, beforeUnFollow, beforeNoti, getNoti)
route.put('/un-noti', checkSecure, isUserLogin, limitAction, beforeUnFollow, beforeUnNoti, unNoti)

module.exports = route