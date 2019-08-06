const { Router } = require('express')
const route = Router()
const { checkExist } = require('../middlewares/follow.middleware')
const { checkValidToken } = require('../middlewares/auth.middleware')
const { follow, unfollow, getNoti, unNoti } = require('../controllers/follow.controller')

route.post('/follow', checkValidToken, checkExist, follow)
route.delete('/follow', checkValidToken, unfollow)
route.put('/get-noti', checkValidToken, getNoti)
route.put('/un-noti', checkValidToken, unNoti)

module.exports = route