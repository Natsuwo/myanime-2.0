const { Router } = require('express')
const route = Router()
const { votePost, votePut, voteDelete } = require('../controllers/vote.controller')
const { beforeLike, beforeDelete, beforeChange } = require('../middlewares/vote.middleware')
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

route.post('/vote-episode', checkSecure, isUserLogin, limitAction, beforeLike, votePost)
route.put('/vote-episode', checkSecure, isUserLogin, limitAction, beforeChange, votePut)
route.delete('/vote-episode', checkSecure, isUserLogin, limitAction, beforeDelete, voteDelete)

module.exports = route