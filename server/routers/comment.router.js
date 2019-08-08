const { Router } = require('express')
const route = Router()
const { checkValidToken } = require('../middlewares/auth.middleware')
const { getComment, postComment, editComment, replyComment, removeComment, attachHeart, unHeart } = require('../controllers/comment.controller')

route.get('/comment', checkValidToken, getComment)
route.post('/comment', checkValidToken, postComment)
route.post('/reply', checkValidToken, replyComment)
route.put('/comment', checkValidToken, editComment)
route.delete('/comment', checkValidToken, removeComment)
route.post('/comment-heart', checkValidToken, attachHeart)
route.delete('/comment-heart', checkValidToken, unHeart)

module.exports = route