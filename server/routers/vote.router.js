const { Router } = require('express')
const route = Router()
const { votePost, votePut, voteDelete } = require('../controllers/vote.controller')
const { checkValidToken } = require('../middlewares/auth.middleware')

route.post('/vote-episode', checkValidToken, votePost)
route.put('/vote-episode', checkValidToken, votePut)
route.delete('/vote-episode', checkValidToken, voteDelete)

module.exports = route