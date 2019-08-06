const { Router } = require('express')
const route = Router()
const { checkValidToken } = require('../middlewares/auth.middleware')
const { getComment, postComment, editComment, replyComment, removeComment } = require('../controllers/comment.controller')

route.get('/comment', checkValidToken, getComment)
route.post('/comment', checkValidToken, postComment)
route.post('/reply', checkValidToken, replyComment)
route.put('/comment', checkValidToken, editComment)
route.delete('/comment', checkValidToken, removeComment)

module.exports = route