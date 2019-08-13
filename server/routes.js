const { Router } = require('express')
const router = Router()
// Hosts
const episode = require('./routers/episode.router')
const auth = require('./routers/auth.router')
const vote = require('./routers/vote.router')
const follow = require('./routers/follow.router')
const comment = require('./routers/comment.router')
const anime = require('./routers/anime.router')
const user = require('./routers/user.router')
const language = require('./routers/language.router')
const secure = require('./routers/secure.router')
// Router Use
router.use(episode)
router.use(auth)
router.use(vote)
router.use(follow)
router.use(comment)
router.use(anime)
router.use(user)
router.use(language)
router.use(secure)

module.exports = router