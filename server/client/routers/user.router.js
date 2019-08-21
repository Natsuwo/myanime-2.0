const { Router } = require('express')
const route = Router()
const { updateProfile, getFollowAnime, getLists, loadmoreLists } = require('../controllers/user.controller')
const { updatePassword } = require('../middlewares/user.middleware')
const { checkSecure } = require('../validate/secure.validate')
const { isUserLogin } = require('../middlewares/auth.middleware')

const multer = require('multer')
const md5 = require('md5')
var path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../library/upload/profile/user/')
    },
    filename: function (req, file, cb) {
        cb(null, md5(parseInt(req.body.user_id)))
    }
})

var upload = multer({
    storage,
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

route.put('/user/profile', checkSecure, isUserLogin, upload.single('avatar'), updatePassword, updateProfile)
route.get('/user/following', checkSecure, isUserLogin, getFollowAnime)
route.get('/user/profile/follow', checkSecure, isUserLogin, getLists)
route.get('/user/profile/follow-loadmore', checkSecure, isUserLogin, loadmoreLists)
module.exports = route