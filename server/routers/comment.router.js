const { Router } = require('express')
const route = Router()
const { checkSecure } = require('../validate/secure.validate')
// Controllers
const { getComment, postComment, editComment, replyComment,
    removeComment, attachHeart, unHeart } = require('../controllers/comment.controller')
// Middlewares
const { isUserLogin } = require('../middlewares/auth.middleware')
const { beforePost, beforeEdit, beforeReply, beforeDelete, beforeHeart, beforeUnHeart } = require('../middlewares/comment.middleware')

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

route.get('/comment', checkSecure, isUserLogin, getComment)
route.post('/comment', checkSecure, isUserLogin, limitAction, beforePost, postComment)
route.post('/reply', checkSecure, isUserLogin, limitAction, beforeReply, replyComment)
route.put('/comment', checkSecure, isUserLogin, limitAction, beforeEdit, editComment)
route.delete('/comment', checkSecure, isUserLogin, limitAction, beforeDelete, removeComment)
route.post('/comment-heart', checkSecure, isUserLogin, limitAction, beforeHeart, attachHeart)
route.delete('/comment-heart', checkSecure, isUserLogin, limitAction, beforeUnHeart, unHeart)

module.exports = route