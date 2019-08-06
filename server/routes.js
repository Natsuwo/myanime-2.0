const {Router} = require('express')
const router = Router()
// Hosts
const episode = require('./routers/episode.router')
const auth = require('./routers/auth.router')
const vote = require('./routers/vote.router')
const follow = require('./routers/follow.router')
const comment = require('./routers/comment.router')
// Router Use
router.use(episode)
router.use(auth)
router.use(vote)
router.use(follow)
router.use(comment)

module.exports = router