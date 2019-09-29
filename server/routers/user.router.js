const { Router } = require('express')
const route = Router()
const { updateProfile, getFollowAnime, getLists, loadmoreLists } = require('../controllers/user.controller')
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

route.put('/user/profile', checkSecure, isUserLogin, upload.any(), uploadImage, updatePassword, updateProfile)
route.delete('/bot/discord-relogin', tryLogin)
route.get('/user/following', checkSecure, isUserLogin, getFollowAnime)
route.get('/user/profile/follow', checkSecure, isUserLogin, getLists)
route.get('/user/profile/follow-loadmore', checkSecure, isUserLogin, loadmoreLists)
module.exports = route