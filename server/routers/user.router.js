const { Router } = require('express')
const route = Router()
const { updateProfile, getFollowAnime, getLists, loadmoreLists, getNoti, readNoti } = require('../controllers/user.controller')
const { updatePassword } = require('../middlewares/user.middleware')
const { checkSecure } = require('../validate/secure.validate')
const { isUserLogin } = require('../middlewares/auth.middleware')
const { uploadImage, tryLogin } = require('../middlewares/imgupload.middleware')

const multer = require('multer')
var path = require('path')
var upload = multer({
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits: {
        fileSize: 1024 * 1024
    }
})
var apicache = require('apicache')
var cache = apicache.middleware
apicache.options({
    appendKey: (req, res) => req.body.episode_id
})

route.put('/user/profile', checkSecure, isUserLogin, upload.any(), uploadImage, updatePassword, updateProfile)
route.put('/user/readnoti', cache("5 minutes"), checkSecure, isUserLogin, readNoti)
route.delete('/bot/discord-relogin', tryLogin)
route.get('/user/following', checkSecure, isUserLogin, getFollowAnime)
route.get('/user/noti', checkSecure, isUserLogin, getNoti)
route.get('/user/profile/follow', checkSecure, isUserLogin, getLists)
route.get('/user/profile/follow-loadmore', checkSecure, isUserLogin, loadmoreLists)
module.exports = route