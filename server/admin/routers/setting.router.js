const { Router } = require('express')
const route = Router()
const { getSetting, updateSetting, profile, updateProfile } = require('../controllers/setting.controller')
const { changePassword, changePin } = require('../middlewares/setting.middleware')
const { isUserLogin } = require('../validate/auth.validate')
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

route.get('/setting/profile', isUserLogin, profile)
route.put('/setting/profile', isUserLogin, upload.single('avatar'), changePassword, changePin, isUserLogin, updateProfile)
route.get('/setting/get', getSetting)
route.put('/setting/update', updateSetting)

module.exports = route