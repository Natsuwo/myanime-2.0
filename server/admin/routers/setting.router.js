const { Router } = require('express')
const route = Router()
const { getSetting, updateSetting, updateProfile } = require('../controllers/setting.controller')
const { changePassword, changePin } = require('../middlewares/setting.middleware')
const { checkSecure, isUserLogin } = require('../validate/secure.validate')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../library/upload/profile/admin/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage })

route.put('/setting/profile', checkSecure, isUserLogin, upload.single('avatar'), changePassword, changePin, updateProfile)
route.get('/setting/get', checkSecure, isUserLogin, getSetting)
route.put('/setting/update', checkSecure, isUserLogin, updateSetting)

module.exports = route