const {Router} = require('express')
const router = Router()
// Hosts
const auth = require('./admin/routers/auth.router')
const comment = require('./admin/routers/comment.router')
const anime = require('./admin/routers/anime.router')
const episode = require('./admin/routers/episode.router')
const term = require('./admin/routers/term.router')
const dashboard = require('./admin/routers/dashboard.router')
const setting = require('./admin/routers/setting.router')
// Router Use
router.use(auth)
router.use(comment)
router.use(anime)
router.use(episode)
router.use(term)
router.use(dashboard)
router.use(setting)

module.exports = router